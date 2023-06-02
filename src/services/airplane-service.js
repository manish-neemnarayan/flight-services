const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const { AppError } = require("../utils/errors");

const airplane = new AirplaneRepository();

async function airplaneCreate(data) {
    try {
        const response = await airplane.create(data);
        return response
    } catch (error) {
        let explanation = [];
        if(error.name === 'SequelizeValidationError') {
            Array.from(error.errors).forEach(err => {
                explanation.push(err?.message);
            }); 
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError("error while creating air", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {airplaneCreate};
