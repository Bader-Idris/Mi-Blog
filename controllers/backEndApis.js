const { google } = require('googleapis');//, youtube_v3 2nd param

const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpController = async (req, res) => {


  const { fName, lName, email, password } = req.body;
  if (!fName || !lName || !email || !password) return res.status(400).send('Please provide all the required fields');
  res.json({
    first_name: fName,
    last_name: lName,
    email: email,
    password: password,
  });
/* mongo's properties
  name
  lastName
  email
  password
  location
 */

  /*
  {
    "fName": "bader",
    "lName": "idris",
    "email": "www.bader.com9@gmail.com",
    "password": "ilovehanade"
  }
  */

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