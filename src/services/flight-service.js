const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const { AppError } = require("../utils/errors");
const { Op } = require("sequelize");

const flight = new FlightRepository();

// create flight
async function flightCreate(data) {
  try {
    const response = await flight.create(data);
    return response;
  } catch (error) {
    let explanation = [];
    if (error.name === "SequelizeValidationError") {
      Array.from(error.errors).forEach((err) => {
        explanation.push(err?.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      ["error while creating flight", error.parent],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// get all flights 
async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter = [];
  let endingTripTime = " 23:59:00";
  // trips=DEL-HSR
  if (query.trips) {
    let [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId; 
    // TODO: check if they are not same
  }

  // price
  if (query.price) {
    let [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice == undefined ? 20000 : maxPrice],
    };
  }

  // travellers
  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }

  // date
  if (query.tripDate) {
    customFilter.departureTime = {
      [Op.between]: [query.tripDate, query.tripDate + endingTripTime],
    };
  }

  //sort
  if(query.sort) {
    // query --> departureTime_ASC,price_ASC
    const params =  query.sort.split(",")
    console.log(params)
    const sortFilters = params.map(item => item.split("_"));
    sortFilter = sortFilters;
  }

  try {
    console.log(customFilter);
    console.log(sortFilter)
    const response = await flight.getAllFlights(customFilter, sortFilter);
    return response;
  } catch (error) {
    let explanation = [];
    if (error.name === "SequelizeValidationError") {
      Array.from(error.errors).forEach((err) => {
        explanation.push(err?.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    console.log(error)
    throw new AppError(
      ["error while getting flight", error.parent],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
} 

// get flight
async function getFlight(id) {
  try {
      const response = await flight.getOne(id);
      return response;
  } catch (error) {
      if(error.statusCode == StatusCodes.NOT_FOUND) {
          throw new AppError("Flight you requested is not found", error.statusCode);
      }
      throw new AppError("Error while fetching Flight", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateSeats(data) {
  try {
    const response = await flight.updateRemainingSeats(data.flightId, data.seats, data.dec);
    return response;
  } catch (error) {
    throw new AppError("Can not update data of the flight", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {  
  flightCreate,
  getAllFlights,
  getFlight,
  updateSeats
};
