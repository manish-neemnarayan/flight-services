const express = require("express");
const { AirportController } = require("../../controllers");
const { AirportMiddleware } = require("../../middlewares");
const router = express.Router();

router.post('/',
            AirportMiddleware.validCreateResponse,
            AirportController.createAirport);

router.get('/',
            AirportController.getAirports);
        
router.get('/:id',
            AirportController.getOneAirport);

router.patch('/:id',
            AirportController.updateAirport);

router.delete('/:id',
            AirportController.deleteAirport);          

module.exports = router;