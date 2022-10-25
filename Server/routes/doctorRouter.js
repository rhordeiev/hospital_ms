const express = require('express');
const doctorController = require('../controllers/doctorController');
const { verifyToken } = require('../helpers/jwtFunctions');
const doctorRouter = express.Router();

doctorRouter.get(
  '/patients/:id/viewChange',
  verifyToken,
  doctorController.viewChangePatients
);
doctorRouter.get(
  '/patients/:id/aggregate',
  verifyToken,
  doctorController.aggregatePatients
);
doctorRouter.get(
  '/historyOfIllnesses/:id/aggregate',
  verifyToken,
  doctorController.aggregateHistoryOfIllnesses
);
doctorRouter.get(
  '/patients/:id',
  verifyToken,
  doctorController.getPatientsInfo
);
doctorRouter.get(
  '/historyOfIllnesses',
  verifyToken,
  doctorController.getHistoryOfIllnessesParams
);
doctorRouter.get(
  '/historyOfIllnesses/:patientId',
  verifyToken,
  doctorController.getHistoryOfIllnesses
);
doctorRouter.post('/patient', verifyToken, doctorController.addPatient);
doctorRouter.post('/treatment', verifyToken, doctorController.addTreatment);
doctorRouter.patch(
  '/patient',
  verifyToken,
  doctorController.updatePatientTreatmentStatus
);
doctorRouter.get('/:id', verifyToken, doctorController.getInfo);
doctorRouter.patch('/:id', verifyToken, doctorController.update);

module.exports = doctorRouter;
