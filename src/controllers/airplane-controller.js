const { StatusCodes } = require("http-status-codes");
const {AirplaneService} = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors");

/**
 * POST : /airplanes
 * req-body {modelNumber: 'airbus34', capacity: 300}
 */

async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.airplaneCreate({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data = airplane;
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
 * Get: /airplanes
 */

async function getAirplanes(_req, res) {
    try {
        const airplanes = await AirplaneService.airplaneGetAll();
        SuccessResponse.data = airplanes;

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
 * Get One: /airplanes/:id
 */
async function getOneAirplane(req, res) {
    try {
        const airplane = await AirplaneService.airplaneGet(req.params.id);
        SuccessResponse.data = airplane;
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
 * Patch: /airplanes/:id
 */
async function updateAirplane(req, res) {
    try {
        const airplane_id = req.query.id;
        const updatedAirplane = await AirplaneService.airplaneUpdate(airplane_id, req.body);

        return res  
                .status(StatusCodes.OK)
                .json(updatedAirplane)
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    updateAirplane,
    getOneAirplane
}