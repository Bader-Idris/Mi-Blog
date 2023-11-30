const path = require("path");

const mainPage =  (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
}
const registerPage = (req, res) => {
  // res.sendFile(path.join(__dirname, '../views/login.html'));
  res.sendFile(path.join(__dirname, '../views/registerAndLogin.html'));
}
const videoPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/video.html'));
}
const blogPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/blog.html'));
}

module.exports = {
  mainPage,
  registerPage,
  videoPage,
  blogPage,
};