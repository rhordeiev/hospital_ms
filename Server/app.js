const express = require('express');
const cors = require('cors');

const signRouter = require('./routes/signRouter');
const headDoctorRouter = require('./routes/headDoctorRouter');
const headOfDepartmentRouter = require('./routes/headOfDepartmentRouter');
const doctorRouter = require('./routes/doctorRouter');
const patientRouter = require('./routes/patientRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/sign', signRouter);
app.use('/headdoctor', headDoctorRouter);
app.use('/headofdepartment', headOfDepartmentRouter);
app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);

app.listen(3000);
