const  path = require("path");
const  asyncErrors = require("express-async-errors");
const  cors = require("cors");
const  helmet = require("helmet");
const  xss = require("xss-clean");
const  figlet = require("figlet");// for ascii art
const  express = require("express");
const app = express();
// const  { google } = require('googleapis');//, youtube_v3 2nd param
const  { connectDB } = require("./db/connect");
// const  authenticateUser = require("../middleware/authentication");


// const authRouter = require("./routes/auth");
// const jobsRouter = require("./routes/jobs");
const backEndApis = require("./routes/backEndApis");
const  frontAPIs = require("./routes/front-routers");
// error handler
const   notFoundMiddleware = require('./middleware/not-found');
const   errorHandlerMiddleware = require('./middleware/error-handler');


const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  // REDIS_URL,
  // REDIS_PORT,
  // REDIS_USER,
  // REDIS_PASSWORD,
  // SESSION_SECRET,

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

// const YOUTUBE_API_V3 = 'AIzaSyDPDrhysLWuG3DL-509OfgSr_6yDLeOOPY';
// const youtube = google.youtube({
//   version: "v3",
//   auth: YOUTUBE_API_V3,
// });

app.use("/", frontAPIs);
app.use("/api/", backEndApis);

// from 6.5 John
// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/jobs', authenticateUser, jobsRouter);

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
// });

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// const videoRoute = async (req, res) => {
//   const { youtube } = google;
//   const youtubeClient = youtube({
//     version: "v3",
//     auth: YOUTUBE_API_V3,
//   });

//   const videoId = 'Z434ZmDkxzU'; // Extract the video ID from the YouTube URL
//   try {
//     const response = await youtubeClient.videos.list({
//       id: videoId,
//       part: 'snippet',
//     });
//     const video = response.data.items[0];
//     // Construct the video URL
//     const videoUrl = `https://www.youtube.com/embed/${video.id}`;

//     // Create an object with the necessary data
//     const responseData = {
//       videoTitle: video.snippet.title,
//       videoUrl: videoUrl,
//     };

//     // Send the response as JSON
//     res.json(responseData);
//   } catch (error) {
//     console.error('Error retrieving video details:', error);
//     res.status(500).send('Error retrieving video details');
//   }
// };
// app.use('/api/video', videoRoute);
// app.get('/video', );


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