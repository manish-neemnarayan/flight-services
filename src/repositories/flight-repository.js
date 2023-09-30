// const { Sequelize } = require("sequelize");
const {Flight, Airplane, Airport, city} = require("../models");
const CrudRepository = require("./crud-repository");
const db = require("../models");
const { addRowLockOnFlights } = require("./queries");

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

    async updateRemainingSeats(flightId, seats, dec = "1") {
        console.log("before making db custom query!")
        await db.sequelize.query(`SELECT * FROM Flights WHERE Flights.id = ${flightId} FOR UPDATE`);
        console.log("after making db custom query!")
        const flight = await Flight.findByPk(flightId);
        if(parseInt(dec)) {
            await flight.decrement('totalSeats', { by: seats });
        } else {
            await flight.increment('totalSeats', { by: seats });
        } 

        flight.save();
        return await Flight.findByPk(flightId);
    }
}

module.exports = FlightRepository;