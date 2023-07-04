const express = require("express");
const { FlightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middlewares");
const router = express.Router();

// post : city/
router.post("/",
                FlightMiddleware.validCreateResponse,
                FlightController.createFlight);       

module.exports = router;