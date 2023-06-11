const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const { AppError } = require("../utils/errors");

const airplane = new AirplaneRepository();

// create airplane
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

// get ariplanes
async function airplaneGetAll() {
    try {
        const response = await airplane.getAll();
        return response;
    } catch (error) {
        throw new AppError("Error while Fetching Airplanes", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// get one airplane based on id
async function airplaneGet(id) {
    try {
        const response = await airplane.getOne(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("Airplane you requested is not found", error.statusCode);
        }
        throw new AppError("Error while fetching Airplane", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// update airplane
async function airplaneUpdate(id, data) {
    try {
        if(Object.keys(data).length === 0) {
            throw new AppError("Specify the data correctly", StatusCodes.BAD_REQUEST);
        }
        const response = await airplane.update(id, data);
        return response;
    } catch (error) {
        console.log(error)
        if(error.statusCode == StatusCodes.BAD_REQUEST) {
            throw error;
        }
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("Airplane you requested to update is not found", error.statusCode);
        }
        throw new AppError("Error while Updating Airplane", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// delete airplane
async function airplaneDelete(id) {
    try {
        const response = await airplane.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("Airplane you requested to delete is not found", error.statusCode);
        }
    }
}

module.exports = {
    airplaneCreate,
    airplaneGet,
    airplaneUpdate,
    airplaneGetAll,
    airplaneDelete
};
