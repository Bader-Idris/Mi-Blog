const express = require("express");
const router = express.Router();
const {
  signUpController,
  logInController,
  getYouTubeVideo,
  sendEmail
} = require("../controllers/backEndApis");
const {
  articlesDB,
} = require("../controllers/articlesDB");

// important one
const { register, login, updateUser } = require('../controllers/auth');
router.route("/signup").post(register ,signUpController);
router.route("/login").post(login, logInController);

router.route("/query").get(articlesDB);
router.route("/sendEmail").get(sendEmail);
router.route("/video").get(getYouTubeVideo);
module.exports = router;