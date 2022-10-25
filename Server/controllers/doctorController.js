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
    const queryCommand = `SELECT * FROM doctor WHERE login = $1 and password = $2`;
    const queryParams = [req.userData.login, req.userData.password];
    const result = await client.query(queryCommand, queryParams);
    await client.end();
    res.status(200).send(result.rows[0]);
  } catch (error) {
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
    let queryCommand = `UPDATE doctor
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
    queryCommand = `GRANT Doctor to ${req.body.login};`;
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
exports.addPatient = async (req, res) => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    let queryCommand = `INSERT INTO patient(
      roleId, name, surname, patronymic, address, telephone,
      birthdate, jobname, jobaddress, gender, passportnumber,
      login, password, doctorid)
      VALUES (5, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`;
    let queryParams = [
      req.body.name,
      req.body.surname,
      req.body.patronymic,
      req.body.address,
      req.body.telephone,
      req.body.birthdate,
      req.body.jobname,
      req.body.jobaddress,
      req.body.gender,
      req.body.passportnumber,
      req.body.login,
      req.body.password,
      req.body.doctorId,
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
    queryCommand = `GRANT Patient to ${req.body.login};`;
    await client.query(queryCommand);
    await client.end();
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.addTreatment = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    let queryCommand = `INSERT INTO treatment(meds, note) VALUES ($1, $2)
    RETURNING id;`;
    let queryParams = [req.body.meds, req.body.note];
    const treatmentId = await client.query(queryCommand, queryParams);
    queryCommand = `INSERT INTO historyofillnesses(
    patientid, treatmentid, arrivaldate, diagnosis, doctorid)
    VALUES ($1, $2, CURRENT_DATE, $3, $4);`;
    queryParams = [
      req.body.patientId,
      treatmentId.rows[0].id,
      req.body.diagnosis,
      req.body.doctorId,
    ];
    await client.query(queryCommand, queryParams);
    await client.end();
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getPatientsInfo = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    const queryCommand = `SELECT * FROM Patient WHERE doctorid=${req.params.id}`;
    const result = await client.query(queryCommand);
    await client.end();
    res.status(200).send(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.viewChangePatients = async (req, res) => {
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
    birthdate, jobname, jobaddress, gender, passportnumber
    FROM Patient
    WHERE ${
      req.query.filter === 'birthdate'
        ? req.query.filter + '::varchar(19)'
        : req.query.filter
    } ~ '${req.query.value}' and doctorid=${req.params.id}
    ORDER BY ${req.query.sort} ${req.query.sortdirection}`;
    const result = await client.query(queryCommand);
    await client.end();
    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.aggregatePatients = async (req, res) => {
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
    FROM Patient
    WHERE ${
      req.query.filter === 'birthdate'
        ? req.query.filter + '::varchar(19)'
        : req.query.filter
    } ~ '${req.query.value}' and doctorid=${req.params.id}`;
    const result = await client.query(queryCommand);
    await client.end();
    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.updatePatientTreatmentStatus = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    let queryCommand = `SELECT id FROM historyofillnesses
    WHERE patientid=$1 and doctorid=$2
    ORDER BY id DESC
    LIMIT 1`;
    let queryParams = [
      parseInt(req.query.patientId),
      parseInt(req.query.doctorId),
    ];
    const historyofillnessesId = await client.query(queryCommand, queryParams);
    queryCommand = `UPDATE historyofillnesses
      SET treatmentsuccess=$2, departuredate=CURRENT_DATE
      WHERE id=$1;`;
    queryParams = [
      parseInt(historyofillnessesId.rows[0].id),
      req.body.treatmentSuccess,
    ];
    await client.query(queryCommand, queryParams);
    queryCommand = `UPDATE patient
    SET doctorid=null
    WHERE id=$1;`;
    queryParams = [parseInt(req.query.patientId)];
    await client.query(queryCommand, queryParams);
    await client.end();
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getHistoryOfIllnessesParams = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    let queryCommand = `SELECT arrivaldate, departuredate, diagnosis, treatmentsuccess FROM HistoryOfIllnesses`;
    const historyOfIllnessesParams = await client.query(queryCommand);
    queryCommand = `SELECT name, surname, patronymic FROM Doctor`;
    const doctorParams = await client.query(queryCommand);
    queryCommand = `SELECT meds, note FROM Treatment`;
    const treatmentParams = await client.query(queryCommand);
    await client.end();
    res.status(200).send({
      ...historyOfIllnessesParams.rows[0],
      ...doctorParams.rows[0],
      ...treatmentParams.rows[0],
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getHistoryOfIllnesses = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    let orderBy;
    if (
      ['arrivaldate', 'departuredate', 'diagnosis'].includes(req.query.sort)
    ) {
      orderBy = `HistoryOfIllnesses.${req.query.sort}`;
    } else if (['name', 'surname', 'patronymic'].includes(req.query.sort)) {
      orderBy = `Doctor.${req.query.sort}`;
    } else if (['meds', 'note'].includes(req.query.sort)) {
      orderBy = `Treatment.${req.query.sort}`;
    } else if (req.query.sort === 'treatmentSuccess') {
      orderBy = '(HistoryOfIllnesses.treatmentsuccess is true)';
    } else if (req.query.sort === 'treatmentFailure') {
      orderBy = '(HistoryOfIllnesses.treatmentsuccess is false)';
    } else {
      orderBy = `HistoryOfIllnesses.departuredate`;
    }
    await client.connect();
    const queryCommand = `SELECT HistoryOfIllnesses.arrivaldate, HistoryOfIllnesses.departuredate,
    HistoryOfIllnesses.diagnosis, HistoryOfIllnesses.treatmentsuccess, Doctor.name as doctorname,
    Doctor.surname as doctorsurname, Doctor.patronymic as doctorpatronymic, Treatment.meds, Treatment.note
    FROM HistoryOfIllnesses
    JOIN Doctor ON Doctor.id=HistoryOfIllnesses.doctorid
    JOIN Treatment ON Treatment.id=HistoryOfIllnesses.treatmentid
    WHERE patientid=${req.params.patientId}
    ORDER BY ${orderBy} ${req.query.sortdirection}`;
    const result = await client.query(queryCommand);
    await client.end();
    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.aggregateHistoryOfIllnesses = async (req, res) => {
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
    FROM HistoryOfIllnesses
    JOIN Doctor ON Doctor.id=HistoryOfIllnesses.doctorid
    JOIN Treatment ON Treatment.id=HistoryOfIllnesses.treatmentid
    WHERE patientid=$1`;
    const queryParams = [req.params.id];
    const result = await client.query(queryCommand, queryParams);
    await client.end();
    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
