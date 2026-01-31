const express = require ('express');
const router = express.Router();

const {addVehicle , assignDriver} = require('../controllers/fleet.controllers');
const {rateLimiter} = require ('../middlewares');

router.post ('/add', rateLimiter,addVehicle);
router.patch ('/assign-driver/:vehicleId', assignDriver);

module.exports = router;