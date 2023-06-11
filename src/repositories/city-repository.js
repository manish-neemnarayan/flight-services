const {city} = require("../models");
const CrudRepository = require("./crud-repository");

class CityRpository extends CrudRepository {
    constructor() {
        super(city);
    }
}

module.exports = CityRpository;