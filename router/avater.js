const express = require("express");
const router = express.Router();

const avaterController = require("../controller/avaterController");
const authController = require("../controller/authController");

router.post(
  "/",
  authController.protected,
  avaterController.avaterPhotos,
  avaterController.resizeAvaterPhotos,
  avaterController.addAvater
);
router.get("/", avaterController.getAvater);

module.exports = router;
