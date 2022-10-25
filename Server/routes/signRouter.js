const express = require('express');
const signController = require('../controllers/signController');
const signRouter = express.Router();
signRouter.post('/loginUser', signController.loginUser);

module.exports = signRouter;
