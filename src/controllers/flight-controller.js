const { StatusCodes } = require("http-status-codes");
const {FlightService} = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/**
 * POST : /airports
 * req-body
 */

async function createFlight(req, res) {
    // TODO: compare arrival time and departure time 
    try {
        const flight = await FlightService.flightCreate({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,  
            arrivalAirportId: req.body.arrivalAirportId,
            price: req.body.price,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            boardingGate: req.body.boardingGate, 
            totalSeats: req.body.totalSeats
        });
        SuccessResponse.data = flight;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

// GET: /ariports
async function getAllFlights(req, res) {
    try {
        const query = req.query;
        const response = await FlightService.getAllFlights(query);
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function flightGetAll(_req, res) {
    try {
        const flights = await FlightService.flightGetAll();
        SuccessResponse.data = flights;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res  
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    flightGetAll
}