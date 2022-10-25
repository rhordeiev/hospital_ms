const { Client } = require('pg');
const { generateAccessToken } = require('../helpers/jwtFunctions');

exports.getInfo = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    let queryCommand = `SELECT * FROM headofdepartment WHERE login = $1 and password = $2`;
    let queryParams = [req.userData.login, req.userData.password];
    const headOfDepartment = await client.query(queryCommand, queryParams);
    queryCommand = `SELECT Department.id FROM Department
    JOIN HeadOfDepartment ON HeadOfDepartment.id = Department.headofdepartmentid
    WHERE HeadOfDepartment.id = $1`;
    queryParams = [headOfDepartment.rows[0].id];
    const departmentId = await client.query(queryCommand, queryParams);
    await client.end();
    res.status(200).send({
      ...headOfDepartment.rows[0],
      departmentId: departmentId.rows[0].id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.update = async (req, res) => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    let queryCommand = `UPDATE headofdepartment
    SET name=$2, surname=$3, patronymic=$4, address=$5, telephone=$6,
    birthdate=$7, gender=$8, passportnumber=$9, login=$10, password=$11
    WHERE id=$1;`;
    let queryParams = [
      req.params.id,
      req.body.name,
      req.body.surname,
      req.body.patronymic,
      req.body.address,
      req.body.telephone,
      req.body.birthdate,
      req.body.gender,
      req.body.passportnumber,
      req.body.login,
      req.body.password,
    ];
    await client.query(queryCommand, queryParams);
    queryCommand = `DROP ROLE ${req.body.oldLogin}`;
    await client.query(queryCommand);
    queryCommand = `CREATE ROLE ${req.body.login} WITH
    LOGIN
    NOSUPERUSER
    NOCREATEDB
    NOCREATEROLE
    INHERIT
    NOREPLICATION
    CONNECTION LIMIT -1
    PASSWORD '${req.body.password}';`;
    await client.query(queryCommand);
    queryCommand = `GRANT HeadOfDepartment to ${req.body.login};`;
    await client.query(queryCommand);
    await client.end();
    const expirationTime = 3600 * 1000;
    const token = generateAccessToken(req.body, expirationTime);
    res.status(200).json({ token, expirationTime });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getDepartmentInfo = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    const departmentInfo = {};
    await client.connect();
    let queryCommand = `SELECT Specialty.name as specialtyName FROM Department
    JOIN Specialty ON Department.specialtyid = Specialty.id
    WHERE Department.id=${req.params.id};`;
    departmentInfo.specialtyName = (
      await client.query(queryCommand)
    ).rows[0].specialtyname;

    queryCommand = `SELECT COUNT(*)::integer as doctorCount FROM Department
    JOIN Doctor ON Department.id = Doctor.departmentid
    WHERE Department.id=${req.params.id};`;
    departmentInfo.doctorCount = (
      await client.query(queryCommand)
    ).rows[0].doctorcount;

    queryCommand = `SELECT COUNT(*)::integer as patientCount FROM Department
    JOIN Doctor ON Department.id = Doctor.departmentid
    JOIN Patient ON Doctor.id = Patient.doctorid
    WHERE Department.id=${req.params.id};`;
    departmentInfo.patientCount = (
      await client.query(queryCommand)
    ).rows[0].patientcount;

    queryCommand = `SELECT COUNT(*)::integer as curedCount FROM Department
    JOIN Doctor ON Department.id = Doctor.departmentid
    JOIN HistoryOfIllnesses ON Doctor.id = HistoryOfIllnesses.doctorid
    WHERE Department.id=${req.params.id} and HistoryOfIllnesses.treatmentSuccess=true;`;
    departmentInfo.curedCount = (
      await client.query(queryCommand)
    ).rows[0].curedcount;

    queryCommand = `SELECT AVG(EXTRACT(year FROM AGE(CURRENT_DATE, Doctor.birthdate)))::integer as avgDoctorAge
    FROM Department
    JOIN Doctor ON Department.id = Doctor.departmentid
    WHERE Department.id=${req.params.id};`;
    departmentInfo.avgDoctorAge = (
      await client.query(queryCommand)
    ).rows[0].avgdoctorage;

    queryCommand = `SELECT MIN(EXTRACT(year FROM AGE(CURRENT_DATE, Doctor.birthdate)))::integer as minDoctorAge
    FROM Department
    JOIN Doctor ON Department.id = Doctor.departmentid
    WHERE Department.id=${req.params.id};`;
    departmentInfo.minDoctorAge = (
      await client.query(queryCommand)
    ).rows[0].mindoctorage;

    queryCommand = `SELECT MAX(EXTRACT(year FROM AGE(CURRENT_DATE, Doctor.birthdate)))::integer as maxDoctorAge
    FROM Department
    JOIN Doctor ON Department.id = Doctor.departmentid
    WHERE Department.id=${req.params.id};`;
    departmentInfo.maxDoctorAge = (
      await client.query(queryCommand)
    ).rows[0].maxdoctorage;

    queryCommand = `SELECT AVG(EXTRACT(year FROM AGE(CURRENT_DATE, Patient.birthdate)))::integer as avgPatientAge
    FROM Department
    JOIN Doctor ON Department.id = Doctor.departmentid
    JOIN Patient ON Doctor.id = Patient.doctorid
    WHERE Department.id=${req.params.id};`;
    departmentInfo.avgPatientAge = (
      await client.query(queryCommand)
    ).rows[0].avgpatientage;

    queryCommand = `SELECT MIN(EXTRACT(year FROM AGE(CURRENT_DATE, Patient.birthdate)))::integer as minPatientAge
    FROM Department
    JOIN Doctor ON Department.id = Doctor.departmentid
    JOIN Patient ON Doctor.id = Patient.doctorid
    WHERE Department.id=${req.params.id};`;
    departmentInfo.minPatientAge = (
      await client.query(queryCommand)
    ).rows[0].minpatientage;

    queryCommand = `SELECT MAX(EXTRACT(year FROM AGE(CURRENT_DATE, Patient.birthdate)))::integer as maxPatientAge
    FROM Department
    JOIN Doctor ON Department.id = Doctor.departmentid
    JOIN Patient ON Doctor.id = Patient.doctorid
    WHERE Department.id=${req.params.id};`;
    departmentInfo.maxPatientAge = (
      await client.query(queryCommand)
    ).rows[0].maxpatientage;

    await client.end();
    res.status(200).send(departmentInfo);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.addDoctor = async (req, res) => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    let queryCommand = `SELECT specialtyid FROM Department
    WHERE id=$1`;
    let queryParams = [req.body.departmentId];
    const specialtyId = await client.query(queryCommand, queryParams);
    queryCommand = `INSERT INTO Doctor(
      departmentid, roleid, name, surname, patronymic, address, telephone,
      birthdate, specialization, workingtime, workingdays, cabinet, gender, passportnumber, salary, login, password)
      VALUES ($1, 3, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);`;
    queryParams = [
      req.body.departmentId,
      req.body.name,
      req.body.surname,
      req.body.patronymic,
      req.body.address,
      req.body.telephone,
      req.body.birthdate,
      specialtyId.rows[0].specialtyid,
      req.body.workingtime,
      req.body.workingdays,
      req.body.cabinet,
      req.body.gender,
      req.body.passportnumber,
      req.body.salary,
      req.body.login,
      req.body.password,
    ];
    await client.query(queryCommand, queryParams);
    queryCommand = `CREATE ROLE ${req.body.login} WITH
    LOGIN
    NOSUPERUSER
    NOCREATEDB
    NOCREATEROLE
    INHERIT
    NOREPLICATION
    CONNECTION LIMIT -1
    PASSWORD '${req.body.password}';`;
    await client.query(queryCommand);
    queryCommand = `GRANT Doctor to ${req.body.login};`;
    await client.query(queryCommand);
    await client.end();
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getDoctorsInfo = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    const queryCommand = `SELECT id, name, surname, patronymic, address, telephone,
    birthdate, workingtime, workingdays, cabinet, gender, passportnumber, salary
    FROM Doctor`;
    const result = await client.query(queryCommand);
    await client.end();
    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.viewChangeDoctorsInfo = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    const queryCommand = `SELECT id, name, surname, patronymic, address, telephone,
    birthdate, workingtime, workingdays, cabinet, gender, passportnumber, salary
    FROM Doctor
    WHERE ${
      req.query.filter === 'salary' || 'birthdate'
        ? req.query.filter + '::varchar(19)'
        : req.query.filter
    } ~ '${req.query.value}'
    ORDER BY ${req.query.sort} ${req.query.sortdirection}`;
    const result = await client.query(queryCommand);
    await client.end();
    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.aggregateDoctorsInfo = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    const queryCommand = `SELECT COUNT(*) as count
    FROM Doctor
    WHERE ${
      req.query.filter === 'salary' || 'birthdate'
        ? req.query.filter + '::varchar(19)'
        : req.query.filter
    } ~ '${req.query.value}'`;
    const result = await client.query(queryCommand);
    await client.end();
    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.deleteDoctor = async (req, res) => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    let queryCommand = `DELETE FROM Doctor WHERE id=$1 RETURNING login;`;
    const queryParams = [req.params.id];
    const result = await client.query(queryCommand, queryParams);
    queryCommand = `DROP ROLE ${result.rows[0].login}`;
    await client.query(queryCommand);
    await client.end();
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
