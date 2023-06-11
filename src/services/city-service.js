const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const { AppError } = require("../utils/errors");
const city = new CityRepository();

// post city
async function cityCreate(data) {
    try {
        const response = await city.create(data);
        return response;
    } catch (error) {
        console.log(error)
        let explanation = [];
        if(error.name === 'SequelizeUniqueConstraintError') {
            Array.from(error.errors).forEach(err => {
                explanation.push(err?.message);
            }); 
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError("Error while creating city", StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

// get all
async function cityGetAll() {
    try {
        const response = await city.getAll();
        return response;
    } catch (error) {
        console.log(error)
        throw new AppError("Error while Fetching Cities", StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

// get one city based on id
async function cityGet(id) {
    try {
        const response = await city.getOne(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("City you requested is not found", error.statusCode);
        }
        throw new AppError("Error while fetching City", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// update airplane
async function cityUpdate(id, data) {
    try {
        const response = await city.update(id, data);
        return response;
    } catch (error) {
        console.log(error)
        if(error.statusCode == StatusCodes.BAD_REQUEST) {
            throw error;
        }
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("City you requested to update is not found", error.statusCode);
        }
        throw new AppError("Error while Updating City", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// delete airplane
async function cityDelete(id) {
    try {
        const response = await city.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("City you requested to delete is not found", error.statusCode);
        }
    }
}


module.exports = {
    cityCreate,
    cityDelete,
    cityGet,
    cityGetAll,
    cityUpdate
}
