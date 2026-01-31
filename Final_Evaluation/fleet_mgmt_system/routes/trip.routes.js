const express = require ('express');
const router = express.Router();

const {createTrip , endTrip} = require ('../controllers/fleet.controllers');

router.post('/create', createTrip);

router.patch('/end/:tripId', endTrip);

