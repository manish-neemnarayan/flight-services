const express = require("express");
const { CityController } = require("../../controllers");
const { CityMiddleware } = require("../../middlewares");
const router = express.Router();

// post : city/
router.post("/",
                CityMiddleware.validCreateResponse,
                CityController.cityCreate);
router.get('/',
            CityController.cityGetAll);
            
router.get('/:id',
            CityController.cityGet);

router.patch('/:id',
                CityMiddleware.validCreateResponse,
                CityController.cityUpdate);

router.delete('/:id',
                CityController.cityDelete);          

module.exports = router;