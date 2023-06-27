const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors");


const validCreateResponse = function(req, res, next) {
    if(!req.body.name) {
        ErrorResponse.message = "Error while creating the airport";
        ErrorResponse.error = new AppError(["Name field couldn't be empty"], StatusCodes.BAD_REQUEST);
        return res
                .status(ErrorResponse.error.statusCode)
                .json(ErrorResponse)
    }

    if(!req.body.code) {
        ErrorResponse.message = "Error while creating the airport";
        ErrorResponse.error = new AppError(["Code field couldn't be empty"], StatusCodes.BAD_REQUEST);
        return res
                .status(ErrorResponse.error.statusCode)
                .json(ErrorResponse)
    }

    if(!req.body.address) {
        ErrorResponse.message = "Error while creating the airport";
        ErrorResponse.error = new AppError(["address field couldn't be empty"], StatusCodes.BAD_REQUEST);
        return res
                .status(ErrorResponse.error.statusCode)
                .json(ErrorResponse)
    }

    if(!req.body.cityId) {
        ErrorResponse.message = "Error while creating the airport";
        ErrorResponse.error = new AppError(["cityId field couldn't be empty"], StatusCodes.BAD_REQUEST);
        return res
                .status(ErrorResponse.error.statusCode)
                .json(ErrorResponse)
    }

    next();
} 

module.exports = {validCreateResponse};
