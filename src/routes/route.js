const express = require("express");
const router = express.Router();

const { createUsers, login } = require("../controllers/userControllers");
const { uploadVideo, getVideos } = require("../controllers/videoController");

//---------User Api's----------//
router.post("/register", createUsers);
router.post("/login", login)

//---------User Api's----------//
router.post("/upload", uploadVideo);

router.get("/getVideos", getVideos)



module.exports = router