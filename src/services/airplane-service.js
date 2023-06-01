const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const { AppError } = require("../utils/errors");

const airplane = new AirplaneRepository();

async function airplaneCreate(data) {
    try {
        console.log("entered in service after controller")
        const response = await airplane.create(data);
        return response
    } catch (error) {
        if(error.name === 'TypeError') {
            throw new AppError("error while creating air", StatusCodes.INTERNAL_SERVER_ERROR)
        }
        // throw error;
    }
}

module.exports = {airplaneCreate};
