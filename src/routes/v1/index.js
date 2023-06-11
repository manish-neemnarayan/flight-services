const express = require("express");
const { infoController } = require("../../controllers");
const airplaneRoutes = require("./airplane-routes");
const cityRoutes = require("./city-routes");
const  router = express.Router();

router.use("/airplanes", airplaneRoutes);
router.use("/city", cityRoutes);
router.get("/info", infoController.info);

module.exports = router;