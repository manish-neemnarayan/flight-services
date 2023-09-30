const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors");


const validCreateResponse = function(req, res, next) {
    if(!req.body.flightNumber) {
        ErrorResponse.message = "Error while creating the flight";
        ErrorResponse.error = new AppError(["flightNumber field couldn't be empty"], StatusCodes.BAD_REQUEST);
        return res
                .status(ErrorResponse.error.statusCode)
                .json(ErrorResponse)
    }

    if(!req.body.airplaneId) {
        ErrorResponse.message = "Error while creating the flight";
        ErrorResponse.error = new AppError(["airplaneId field couldn't be empty"], StatusCodes.BAD_REQUEST);
        return res
                .status(ErrorResponse.error.statusCode)
                .json(ErrorResponse)
    }

    if(!req.body.departureAirportId) {
        ErrorResponse.message = "Error while creating the flight";
        ErrorResponse.error = new AppError(["departureAirportId field couldn't be empty"], StatusCodes.BAD_REQUEST);
        return res
                .status(ErrorResponse.error.statusCode)
                .json(ErrorResponse)
    }

    if(!req.body.arrivalAirportId) {
        ErrorResponse.message = "Error while creating the flight";
        ErrorResponse.error = new AppError(["arrivalAirportId field couldn't be empty"], StatusCodes.BAD_REQUEST);
        return res
                .status(ErrorResponse.error.statusCode)
                .json(ErrorResponse)
    }

    if(!req.body.price) {
        ErrorResponse.message = "Error while creating the flight";
        ErrorResponse.error = new AppError(["price field couldn't be empty"], StatusCodes.BAD_REQUEST);
        return res
                .status(ErrorResponse.error.statusCode)
                .json(ErrorResponse)
    }

    if(!req.body.departureTime) {
        ErrorResponse.message = "Error while creating the flight";
        ErrorResponse.error = new AppError(["departureTime field couldn't be empty"], StatusCodes.BAD_REQUEST);
        return res
                .status(ErrorResponse.error.statusCode)
                .json(ErrorResponse)
    }

    if(!req.body.boardingGate) {
        ErrorResponse.message = "Error while creating the flight";
        ErrorResponse.error = new AppError(["arrivalAirportId field couldn't be empty"], StatusCodes.BAD_REQUEST);
        return res
                .status(ErrorResponse.error.statusCode)
                .json(ErrorResponse)
    }

    if(!req.body.totalSeats) {
        ErrorResponse.message = "Error while creating the flight";
        ErrorResponse.error = new AppError(["arrivalAirportId field couldn't be empty"], StatusCodes.BAD_REQUEST);
        return res
                .status(ErrorResponse.error.statusCode)
                .json(ErrorResponse)
    }
    next();
} 

function validateUpdateSeatsRequest(req, res, next) {
    if(!req.body.seats) {
        ErrorResponse.message = "Error while creating the flight";
        ErrorResponse.error = new AppError(["Seats not found in the incoming request in the correct format"], StatusCodes.BAD_REQUEST);
        return res
                .status(ErrorResponse.error.statusCode)
                .json(ErrorResponse)
    }

    next();
}

module.exports = {validCreateResponse, validateUpdateSeatsRequest};
