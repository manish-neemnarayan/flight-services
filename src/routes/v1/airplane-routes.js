const express = require("express");
const { AirplaneController } = require("../../controllers");
const { AirplaneMiddleware } = require("../../middlewares");
const router = express.Router();

router.post('/',
            AirplaneMiddleware.validCreateResponse,
            AirplaneController.createAirplane);

router.get('/',
            AirplaneController.getAirplanes);
        
router.get('/:id',
            AirplaneController.getOneAirplane);

router.patch('/:id',
              AirplaneController.updateAirplane);

router.delete('/:id',
              AirplaneController.deleteAirplane);          

module.exports = router;