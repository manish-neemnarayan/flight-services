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
        console.log("entered in 2")
        const airplane = await AirplaneService.airplaneCreate({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        console.log("after airplaneCreate")
        SuccessResponse.data = airplane;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        console.log("entered in erro")
        // ErrorResponse.message = error.message;
        ErrorResponse.error = error;
        console.log(ErrorResponse);
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
        // if(error.name === 'TypeError') {
        //     throw new AppError("error while creating airplane 3", StatusCodes.INTERNAL_SERVER_ERROR)
        // }
        // throw error;
    }
}

module.exports = {
    createAirplane
}