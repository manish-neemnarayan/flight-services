const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const { AppError } = require("../utils/errors");

const airport = new AirportRepository();

// create airport
async function airportCreate(data) {
    try {
        const response = await airport.create(data);
        return response
    } catch (error) {
        let explanation = [];
        if(error.name === 'SequelizeValidationError') {
            Array.from(error.errors).forEach(err => {
                explanation.push(err?.message);
            }); 
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        console.log(error)
        throw new AppError("error while creating Airport", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

// get airports
async function airportGetAll() {
    try {
        const response = await airport.getAll();
        return response;
    } catch (error) {
        throw new AppError("Error while Fetching Airports", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// get one airport based on id
async function airportGet(id) {
    try {
        const response = await airport.getOne(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("Airport you requested is not found", error.statusCode);
        }
        throw new AppError("Error while fetching Airport", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// update airport
async function airportUpdate(id, data) {
    try {
        if(Object.keys(data).length === 0) {
            throw new AppError("Specify the data correctly", StatusCodes.BAD_REQUEST);
        }
        const response = await airport.update(id, data);
        return response;
    } catch (error) {
        console.log(error)
        if(error.statusCode == StatusCodes.BAD_REQUEST) {
            throw error;
        }
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("Airport you requested to update is not found", error.statusCode);
        }
        throw new AppError("Error while Updating Airport", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// delete airport
async function airportDelete(id) {
    try {
        const response = await airport.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("Airport you requested to delete is not found", error.statusCode);
        }
    }
}

module.exports = {
    airportCreate,
    airportGet,
    airportGetAll,
    airportUpdate,
    airportDelete
};
