const express = require("express");
const router = express.Router();

const searchingController = require("../controller/searchingController");
const authController = require("../controller/authController");

router.post(
  "/",
  authController.protected,
  searchingController.searchingPhotos,
  searchingController.resizeSearchingPhotos,
  searchingController.addSearching
);
router.get("/", searchingController.getSearch);

module.exports = router;
