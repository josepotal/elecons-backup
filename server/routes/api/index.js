const express = require('express');
const router = express.Router();

const passport = require(__base + 'config/passport');

const getAll = require('./handlers/getAll');
const getUser = require('./handlers/getUser');
const updateUser = require('./handlers/updateUser');
const maxPower = require('./handlers/maxPower');
const getData = require('./handlers/getData');

//add the line below to make the api path private
//router.use( passport.authenticate('jwt', { session: false }) )

router.get('/users', getAll);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.put('/users/:id/maxPower', maxPower);
router.get('/users/:id/data', getData);


module.exports = router;
