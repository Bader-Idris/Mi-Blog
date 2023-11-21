const  path = require("path");
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const redis = require("redis");
const RedisStore = require("connect-redis").default
const express = require("express");
const app = express();
const { connectDB } = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

const authRouter = require("./routes/auth");

const backEndApis = require("./routes/backEndApis");
const  frontAPIs = require("./routes/front-routers");
// error handler
const errorHandlerMiddleware = require('./middleware/error-handler');

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  REDIS_USER,
  REDIS_PASSWORD,
  SESSION_SECRET,
} = require("./config/config");

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
})

app.use(helmet({//this helmet stops any new api, keep an eye on it when adding new ones
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      // Add other CSP directives as needed [Content Security Policy]
      scriptSrc: ["'self'", "http://bun:3000", "'unsafe-inline'"],
      frameSrc: ["'self'", "https://www.youtube.com"],
      styleSrcElem: ["'self'", "https://fonts.googleapis.com"],
    },
  },
}));

app.enable("trust proxy");
app.use(cors());
// app.use(cors({
//   origin: 'http://testing.com',
//   optionsSuccessStatus: 200,
// }));
app.disable("x-powered-by");
app.use(xss());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));
app.use(cookieParser());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
/*
app.use(session({
  store: new RedisStore({
    client: redisClient
  }),
  secret: SESSION_SECRET,
  cookie: {
    // to learn more about those cookie properties, check express-session library, view options
    secure: false, //http allowed🔴, if true => https only ✔️
    resave: false,
    saveUninitialized: false,
    httpOnly: true,//js browser won't be able to access it, which is good for preventing XSS
    maxAge: 1800000,// in millisecond
  }
}))
*/

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

// why does this happen when internet connection fails,
//  my local nginx stops and it sends a 504 Gateway Time-out
// they spoke in the console about this during development:
// https://web.dev/custom-metrics/#server-timing-api
// and it also sends 499 some times!



/* 
To recognize the user's system mode and implement it in a way that caters to various devices (Android, macOS, Apple OS, Windows), you can follow these steps:
1. **User-Agent Detection**: Retrieve the user-agent string from the HTTP request headers. This string contains information about the user's device and operating system.
2. **Parsing User-Agent**: Parse the user-agent string to extract relevant information such as the device type, operating system, and browser.
3. **Mapping to System Mode**: Create a mapping or lookup table that associates the extracted device and operating system information with the corresponding system mode (light or dark). For example, you can map macOS and iOS devices to the dark mode by default.
4. **Default Mode**: Set a default system mode (light or dark) that will be used if the user-agent string cannot be parsed or if the mapping does not have a specific entry for the detected device and operating system.
5. **User Preference Override**: Allow users to override the detected system mode by providing a preference setting in their user profile or through a toggle switch in the user interface.
6. **Database Integration**: If you want to store and retrieve user preferences, you can connect your implementation to a database like MongoDB or PostgreSQL. Store the user preferences (including the system mode) in the database and retrieve them when needed.
7. **Dynamic CSS Generation**: Based on the detected system mode or user preference, dynamically generate the appropriate CSS stylesheets or apply CSS classes to switch between light and dark modes. You can use CSS variables to define color schemes and easily switch between them.
8. **Device-Specific Considerations**: Consider any device-specific nuances or limitations when implementing the system mode. For example, some older browsers or devices may not support certain CSS features required for seamless mode switching.
By implementing these steps, you can recognize the user's system mode and provide a consistent experience across different devices. Storing user preferences in a database allows for persistence and retrieval of preferences even when users switch between devices.
Remember to handle user privacy concerns and ensure that you comply with data protection regulations when storing and using user preferences in your database.
*/