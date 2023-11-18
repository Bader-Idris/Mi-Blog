const express = require("express");
const router = express.Router();
const {
  mainPage,
  registerPage,
} = require("../controllers/front-routers");

router.route("/").get(mainPage);
router.route("/register").get(registerPage);
router.route("/video").get(mainPage);

module.exports = router;