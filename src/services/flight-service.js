const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const { AppError } = require("../utils/errors");

const flight = new FlightRepository();

// create airplane
async function flightCreate(data) {
    try {
        const response = await flight.create(data);
        return response;
    } catch (error) {
        let explanation = [];
        if(error.name === 'SequelizeValidationError') {
            Array.from(error.errors).forEach(err => {
                explanation.push(err?.message);
            }); 
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError("error while creating flight", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


module.exports = {
    flightCreate,
};
