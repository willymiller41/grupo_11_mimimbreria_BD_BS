const express = require("express");
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get("/", mainController.index);
router.get("/nuestraHistoria", mainController.nuestraHistoria);
router.get("/tuHuellaDeCarbono", mainController.tuHuellaDeCarbono);
router.get("/videoArtesanos", mainController.videoArtesanos);

module.exports = router;