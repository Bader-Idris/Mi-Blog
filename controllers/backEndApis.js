const { google } = require('googleapis');//, youtube_v3 2nd param

// const path from "path";
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const signUpController = async (req, res) => {
  // const { username, password } = req.body;

  // try {
  //   // Generate salt and hash the password
  //   const saltRounds = 12;
  //   const hashedPassword = await bcrypt.hash(password, saltRounds);
  //   // Save the hashed password to your database or perform other necessary operations

  //   // Create a JWT token
  //   const token = jwt.sign({ username }, 'secret-key', { expiresIn: '1h' });
  //   // Set the token as a cookie
  //   res.cookie('token', token, { httpOnly: true });

  //   res.json({
  //     msg: 'Sign up successful',
  //     token,
  //   });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: 'Internal server error' });
  // }

  /* mongo's properties
  name
  lastName
  email
  password
  location
 */

  const { fName, lName, email, password } = req.body;
  if (!fName || !lName || !email || !password) return res.status(400).send('Please provide all the required fields');
  res.json({
    first_name: fName,
    last_name: lName,
    email: email,
    password: password,
  });
};
const logInController = async (req, res) => {
  const { email, password, remember_me = false } = req.body;
  if (!email || !password) return res
      .status(400)
      .send(
        "Please provide all the required fields"
      );
  res.json({
    email: email,
    password: password,
    KeepLogged: remember_me,
  });
};


const YOUTUBE_API_V3 = 'AIzaSyDPDrhysLWuG3DL-509OfgSr_6yDLeOOPY';// a random video I chose
const youtube = google.youtube({
  version: "v3",
  auth: YOUTUBE_API_V3,
});

const getYouTubeVideo = async (req, res) => {
  const { youtube } = google;
  const youtubeClient = youtube({
    version: "v3",
    auth: YOUTUBE_API_V3,
  });
  const videoId = 'Z434ZmDkxzU'; // Extract the video ID from the YouTube URL
  try {
    const response = await youtubeClient.videos.list({
      id: videoId,
      part: 'snippet',
    });
    const video = response.data.items[0];
    // Construct the video URL
    const videoUrl = `https://www.youtube.com/embed/${video.id}`;
    // Create an object with the necessary data
    const responseData = {
      videoTitle: video.snippet.title,
      videoUrl: videoUrl,
    };
    // Send the response as JSON
    res.json(responseData);
  } catch (error) {
    console.error('Error retrieving video details:', error);
    res.status(500).send('Error retrieving video details');
  }
};


module.exports = {
  signUpController,
  logInController,
  getYouTubeVideo,
};