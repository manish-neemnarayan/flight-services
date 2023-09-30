const express = require("express");
const { FlightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middlewares");
const router = express.Router();

// post : http://localhost:4000/api/v1/flight/
router.post("/",
                FlightMiddleware.validCreateResponse,
                FlightController.createFlight);       

// get : http://localhost:4000/api/v1/flight/?price=100-10000
router.get("/", FlightController.getAllFlights);

// get : http://localhost:4000/api/v1/flight/:id
router.get("/:id", FlightController.getFlight);

// patch : http://localhost:4000/api/v1/flight/:id/seats
router.patch("/:id/seats",
            FlightMiddleware.validateUpdateSeatsRequest,
            FlightController.updateSeats
)
module.exports = router; 