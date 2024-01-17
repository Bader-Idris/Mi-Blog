const { request } = require('express');
const { google } = require('googleapis');//, youtube_v3 2nd param

// jwt and bcrypt are in models/mongo/user
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

const {
  SENDGRID_API_KEY,
  MAIL_USER,
  MAIL_PASS
} = require("../config/config");
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

const sendEmailEthereal = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    // host: 'smtp.sendgrid.net', from the book, of web-dev with node ...
    port: 587,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: '"Coding Addict" <codingaddict@gmail.com>',
    to: 'www.bader.com9@gmail.com',
    subject: 'Hello',
    html: '<h2>Sending Emails with Node.js</h2>',
  });

  res.json(info);
};

const sendEmail = async (req, res) => {
  sgMail.setApiKey(SENDGRID_API_KEY);
  const msg = {
    to: 'www.bader.com9@gmail.com, baidsforbusiness@gmail.com', // Change to your recipient
    from: 'www.bader.com9@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  const info = await sgMail.send(msg);
  res.json(info);
};

/*
! When sending email to multiple recipients, you must be careful to
! observe the limits of your MSA. SendGrid, for example, recommends
! limiting the number of recipients (SendGrid recommends no more
! than a thousand in one email).
*/

// -------------------------------------------------------------
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
  sendEmail
};