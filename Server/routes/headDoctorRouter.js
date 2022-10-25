const express = require('express');
const headDoctorController = require('../controllers/headDoctorController');
const { verifyToken } = require('../helpers/jwtFunctions');
const headDoctorRouter = express.Router();

headDoctorRouter.patch(
  '/hospital',
  verifyToken,
  headDoctorController.updateHospital
);
headDoctorRouter.patch(
  '/department',
  verifyToken,
  headDoctorController.setHeadOfDepartment
);
headDoctorRouter.get(
  '/hospital',
  verifyToken,
  headDoctorController.getHospitalInfo
);
headDoctorRouter.get(
  '/specialties',
  verifyToken,
  headDoctorController.getSpecialtiesInfo
);
headDoctorRouter.get(
  '/departments',
  verifyToken,
  headDoctorController.getDepartments
);
headDoctorRouter.get(
  '/departments/viewChange',
  verifyToken,
  headDoctorController.viewChangeDepartments
);
headDoctorRouter.get(
  '/departments/aggregate',
  verifyToken,
  headDoctorController.aggregateDepartments
);
headDoctorRouter.get(
  '/headsofdepartmentsNames',
  verifyToken,
  headDoctorController.getHeadsOfDepartmentsNames
);
headDoctorRouter.get(
  '/headsofdepartmentsInfo',
  verifyToken,
  headDoctorController.getHeadsOfDepartmentsInfo
);
headDoctorRouter.get(
  '/headsofdepartmentsInfo/viewChange',
  verifyToken,
  headDoctorController.viewChangeHeadsOfDepartmentsInfo
);
headDoctorRouter.get(
  '/headsofdepartmentsInfo/aggregate',
  verifyToken,
  headDoctorController.aggregateHeadsOfDepartmentsInfo
);
headDoctorRouter.post(
  '/headofdepartment',
  verifyToken,
  headDoctorController.addHeadOfDepartment
);
headDoctorRouter.post(
  '/specialty',
  verifyToken,
  headDoctorController.addSpecialty
);
headDoctorRouter.delete(
  '/headofdepartment/:id',
  verifyToken,
  headDoctorController.deleteHeadOfDepartment
);
headDoctorRouter.delete(
  '/department/:id',
  verifyToken,
  headDoctorController.deleteDepartment
);
headDoctorRouter.get('/:id', verifyToken, headDoctorController.getInfo);
headDoctorRouter.patch('/:id', verifyToken, headDoctorController.update);

module.exports = headDoctorRouter;
