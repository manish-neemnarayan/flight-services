const express = require("express");
const { AirplaneController } = require("../../controllers");
const { AirplaneMiddleware } = require("../../middlewares");
const router = express.Router();

router.post('/',
            AirplaneMiddleware.validCreateResponse,
            AirplaneController.createAirplane);

router.get('/',
            AirplaneController.getAirplanes);

module.exports = router;