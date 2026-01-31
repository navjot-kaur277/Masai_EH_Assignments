const express = require ('express');
const router = express.Router();

const {signUp } = require ('../controllers/fleet.controllers');

router.post('/signup', signUp);

module.exports = router;