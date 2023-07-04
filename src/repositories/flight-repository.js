const {Flight} = require("../models");
const CrudRepository = require("./crud-repository");

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }
}

module.exports = FlightRepository;