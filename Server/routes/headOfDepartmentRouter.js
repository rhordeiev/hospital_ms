const express = require('express');
const headOfDepartmentController = require('../controllers/headOfDepartmentController');
const { verifyToken } = require('../helpers/jwtFunctions');
const headOfDepartmentRouter = express.Router();

headOfDepartmentRouter.get(
  '/department/:id',
  verifyToken,
  headOfDepartmentController.getDepartmentInfo
);
headOfDepartmentRouter.get(
  '/doctors',
  verifyToken,
  headOfDepartmentController.getDoctorsInfo
);
headOfDepartmentRouter.get(
  '/doctors/viewChange',
  verifyToken,
  headOfDepartmentController.viewChangeDoctorsInfo
);
headOfDepartmentRouter.get(
  '/doctors/aggregate',
  verifyToken,
  headOfDepartmentController.aggregateDoctorsInfo
);
headOfDepartmentRouter.post(
  '/doctor',
  verifyToken,
  headOfDepartmentController.addDoctor
);
headOfDepartmentRouter.delete(
  '/doctor/:id',
  verifyToken,
  headOfDepartmentController.deleteDoctor
);
headOfDepartmentRouter.get(
  '/:id',
  verifyToken,
  headOfDepartmentController.getInfo
);
headOfDepartmentRouter.patch(
  '/:id',
  verifyToken,
  headOfDepartmentController.update
);

module.exports = headOfDepartmentRouter;
