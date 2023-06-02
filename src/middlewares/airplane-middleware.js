const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors");


const validCreateResponse = function(req, res, next) {
    if(!req.body.modelNumber) {
        ErrorResponse.message = "Error while creating the airplane";
        ErrorResponse.error = new AppError(["Model field couldn't be empty"], StatusCodes.BAD_REQUEST);
        return res
                .status(ErrorResponse.error.statusCode)
                .json(ErrorResponse)
    }

    next();
} 

module.exports = {validCreateResponse};
