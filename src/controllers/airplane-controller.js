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
        const airplanes = await AirplaneService.airplaneGet();
        SuccessResponse.data = airplanes;

        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res  
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    createAirplane,
    getAirplanes
}