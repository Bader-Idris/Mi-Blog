const  path = require("path");
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const { createClient } = require("redis");
const RedisStore = require("connect-redis").default;
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
  MONGO_DB_NAME,
  REDIS_URL,
  REDIS_PORT,
  REDIS_USER,
  REDIS_PASSWORD,
  SESSION_SECRET,
} = require("./config/config");

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

let redisClient = createClient({
  url: `redis://${REDIS_USER}:${REDIS_PASSWORD}@${REDIS_URL}:${REDIS_PORT}`
  // , logErrors: true, // is it deprecated? book says highly recommended
});
redisClient.connect().catch(console.error)
// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});
app.use(cookieParser(SESSION_SECRET));

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      // resave: false,
      // saveUninitialized: false,
        secure: false, //http allowed🔴, if true => https only ✔️
        httpOnly: true,//js browser won't be able to access it, which is good for preventing XSS
        maxAge: 1800000,// 📏 to ms
      }
  })
);

const colorScheme = require('./middleware/colorScheme')
app.use("/", colorScheme, frontAPIs);
app.use("/api/v1", backEndApis);

// app.use(errorHandlerMiddleware);

app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, './views/404.html'));
});

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin`;
// docker exec -it my-blog-mongo mongo -u Bader -p myPassword --authenticationDatabase admin
// show dbs
// use <database_name>
// show collections
// db.<collection_name>
// db.<collection_name>.find()
// db.<collection_name>.find({ field: "value" })
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


/* plans
  sql articles ✅
  mongo
  - create users database()
1. `users` collection:
  - `_id`: Unique identifier for each user.
  - `username`: User's username.
  - `email`: User's email address.
  - `password`: User's hashed password.
  - `createdAt`: Timestamp indicating when the user account was created.
  - `updatedAt`: Timestamp indicating the last update to the user account.

2. `profiles` collection:
  - `_id`: Unique identifier for each profile.
  - `userId`: Foreign key referencing the corresponding user.
  - `name`: User's full name.
  - `avatar`: URL or file path to the user's profile picture.
  - `bio`: User's biography or description.
  - `location`: User's location information.
  - `website`: User's personal website or portfolio URL.

3. `roles` collection:
  - `_id`: Unique identifier for each role.
  - `name`: Role name or label (e.g., "admin", "editor", "user").
  - `permissions`: Array of permissions associated with the role.

4. `sessions` collection:
  - `_id`: Unique identifier for each session.
  - `userId`: Foreign key referencing the corresponding user.
  - `token`: Session token for authentication.
  - `createdAt`: Timestamp indicating when the session was created.
  - `expiresAt`: Timestamp indicating when the session expires.

5. `activities` collection:
  - `_id`: Unique identifier for each activity.
  - `userId`: Foreign key referencing the corresponding user.
  - `type`: Type of activity (e.g., "login", "update", "password change").
  - `timestamp`: Timestamp indicating when the activity occurred.

6. `notifications` collection:
  - `_id`: Unique identifier for each notification.
  - `userId`: Foreign key referencing the corresponding user.
  - `message`: Content of the notification.
  - `isRead`: Boolean flag indicating whether the notification has been read.
  - `createdAt`: Timestamp indicating when the notification was created.
*/