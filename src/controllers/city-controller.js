const { StatusCodes } = require("http-status-codes");
const {CityService} = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors");

/**
 * Post : /city
 */

async function cityCreate(req, res) {
    try {
        const city = await CityService.cityCreate(req.body);

        SuccessResponse.data = city;
        return res  
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * Get: /city/
 */

async function cityGetAll(_req, res) {
    try {
        const cities = await CityService.cityGetAll();
        SuccessResponse.data = cities;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res  
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


/**
 * Get One: /city/:id
 */
async function cityGet(req, res) {
    try {
        const city = await CityService.cityGet(req.params.id);
        SuccessResponse.data = city;
        return res  
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res  
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


/**
 * Patch: /city/:id
 */
async function cityUpdate(req, res) {
    try {
        const city_id = req.params.id;

        const updatedCity = await CityService.cityUpdate(city_id, req.body);
        SuccessResponse.data = updatedCity;
        return res  
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

/**
 * Delete: /airplanes/:id
 */

// TODO:Add the Mltiple Delete functionality

async function cityDelete(req, res) {
    try {
        const city_id = req.params.id;
        const deleteCity = await CityService.cityDelete(city_id);
        SuccessResponse.data = deleteCity;
        return res  
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}


module.exports = {
    cityCreate,
    cityDelete,
    cityGet,
    cityGetAll,
    cityUpdate
}