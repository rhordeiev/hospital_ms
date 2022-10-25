const express = require('express');
const patientController = require('../controllers/patientController');
const { verifyToken } = require('../helpers/jwtFunctions');
const patientRouter = express.Router();

patientRouter.get(
  '/treatment/:patientId',
  verifyToken,
  patientController.getPatientsCurrentTreatment
);
patientRouter.get('/:id', verifyToken, patientController.getInfo);
patientRouter.patch('/:id', verifyToken, patientController.update);
patientRouter.delete(
  '/patient/:id',
  verifyToken,
  patientController.deletePatient
);

module.exports = patientRouter;
