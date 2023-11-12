const  path = require("path");
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
// const figlet = require("figlet");// for ascii art
const express = require("express");
const app = express();
const { connectDB } = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

const authRouter = require("./routes/auth");
// const jobsRouter = require("./routes/jobs");
const backEndApis = require("./routes/backEndApis");
const  frontAPIs = require("./routes/front-routers");
// error handler
const errorHandlerMiddleware = require('./middleware/error-handler');


const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  // REDIS_URL, REDIS_PORT, REDIS_USER, REDIS_PASSWORD, SESSION_SECRET,

} = require("./config/config");

app.use(
  helmet({//this helmet stops any new api, keep an eye on it when adding new ones
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        // Add other CSP directives as needed [Content Security Policy ]
        scriptSrc: ["'self'", "http://bun:3000"],
        frameSrc: ["'self'", "https://www.youtube.com"],
        styleSrcElem: ["'self'", "https://fonts.googleapis.com"],
      },
    },
  })
);

app.enable("trust proxy");
app.use(cors());
app.disable("x-powered-by");
app.use(xss());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

app.use("/", frontAPIs);
app.use("/api/v1", backEndApis);

app.use(errorHandlerMiddleware);

app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, './views/404.html'));
});

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?
authSource=admin`;

const connectWithRetry = async () => {
  try {
    await connectDB(mongoURL);
    console.log("successfully connected to DB");
  } catch (e) {
    console.log(e);
    setTimeout(connectWithRetry, 5000);
  }
};
connectWithRetry();

const port = process.env.PORT || 3000;
app.listen(port, () => 
  console.log( `Listening on port ${port}...` )
);
// check object define property, in js which is similar to ts annotations