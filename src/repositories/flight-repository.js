const { Sequelize } = require("sequelize");
const {Flight, Airplane, Airport, city} = require("../models");
const CrudRepository = require("./crud-repository");

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {
        console.log(filter);
        const response = await Flight.findAll({
            // include: { all: true, nested: true },
            include: [
                {
                    model: Airplane,
                    as: 'airplane',
                    required: true
                },

                {
                    model: Airport,
                    as: 'departureAirport',
                    required: true,
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code")),
                        // col1 is just an arbitrary name used to identify the custom condition above
                    },
                    include: {
                        model: city,
                        required: true
                    }
                },

                {
                    model: Airport,
                    as: 'arrivalAirport',
                    required: true,
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code")),
                        // col1 is just an arbitrary name used to identify the custom condition above
                    },
                    include: {
                        model: city,
                        required: true
                    }
                }
            ],
            where: filter,
            order: sort,
            
        });

        return response;
    }
}

module.exports = FlightRepository;