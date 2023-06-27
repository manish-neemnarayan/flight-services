const { StatusCodes } = require("http-status-codes");
const {AirportService} = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors");

/**
 * POST : /airports
 * req-body
 */

async function createAirport(req, res) {
    try {
        const airport = await AirportService.airportCreate({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });
        SuccessResponse.data = airport;
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

/**
 * Get: /airports
 */

async function getAirports(_req, res) {
    try {
        const airports = await AirportService.airportGetAll();
        SuccessResponse.data = airports;

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

/**
 * Get One: /airports/:id
 */
async function getOneAirport(req, res) {
    try {
        const airport = await AirportService.airportGet(req.params.id);
        SuccessResponse.data = airport;
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

/**
 * Patch: /airports/:id
 */
async function updateAirport(req, res) {
    try {
        const airport_id = req.params.id;

        const updatedAirport = await AirportService.airportUpdate(airport_id, req.body);
        SuccessResponse.data = updatedAirport;
        return res  
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

/**
 * Delete: /airports/:id
 */

// TODO:Add the Mltiple Delete functionality

async function deleteAirport(req, res) {
    try {
        const airplane_id = req.params.id;
        const deleteAirport = await AirportService.airportDelete(airplane_id);
        SuccessResponse.data = deleteAirport;
        return res  
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

module.exports = {
    createAirport,
    getAirports,
    getOneAirport,
    updateAirport,
    deleteAirport
}