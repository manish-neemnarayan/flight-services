const express = require("express");
const { FlightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middlewares");
const router = express.Router();

// post : city/
router.post("/",
                FlightMiddleware.validCreateResponse,
                FlightController.createFlight);       

router.get("/", FlightController.getAllFlights);
router.get("/getty", FlightController.flightGetAll);
module.exports = router;