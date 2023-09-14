const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const { AppError } = require("../utils/errors");
const { Op } = require("sequelize");

const flight = new FlightRepository();

// create airplane
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

//get all airplane
async function flightGetAll() {
  try {
    const response = await flight.getAll();
    return response;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Error while Fetching flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// get airplane
async function getAllFlights(query) {
  let customFilter = {};
  let endingTripTime = "23:59:00";
  // trips=
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

  try {
    console.log(customFilter);
    const response = await flight.getAllFlights(customFilter);
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
      ["error while getting flight", error.parent],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  flightCreate,
  getAllFlights,
  flightGetAll,
};
