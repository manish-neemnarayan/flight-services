const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");


const validCreateResponse = function(req, res, next) {
    if(!req.body.modelNumber) {
        ErrorResponse.message = "error while creating the airplane";
        ErrorResponse.error = {explanation: "send the data in the correct format"};
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }

    next();
} 

module.exports = {validCreateResponse};
