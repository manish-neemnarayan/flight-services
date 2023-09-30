const { StatusCodes } = require("http-status-codes");
const {FlightService} = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/**
 * POST : /flight
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

// GET: /flight/:id
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

async function getFlight(req, res) {
    try {
        const flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.data = flight;
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


async function updateSeats(req, res) {
    try {
        const response = await FlightService.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats,
            dec: req.body.dec
        });
        SuccessResponse.data = response;
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
    getFlight,
    updateSeats
}