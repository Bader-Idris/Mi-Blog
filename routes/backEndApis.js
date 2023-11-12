const express = require("express");
const router = express.Router();
const {
  signUpController,
  logInController,
  getYouTubeVideo,
} = require("../controllers/backEndApis");
const {
  articlesDB,
} = require("../controllers/articlesDB");

router.route("/signup").post(signUpController);
router.route("/login").post(logInController);

router.route("/query").get(articlesDB);
router.route("/video").get(getYouTubeVideo);


// from 6.5 John
// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/jobs', authenticateUser, jobsRouter);


// router.post('/register', apiLimiter, register);
// router.post('/login', apiLimiter, login);
module.exports = router;