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
    const queryCommand = `SELECT * FROM patient WHERE login = $1 and password = $2`;
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
    let queryCommand = `UPDATE patient
    SET name=$2, surname=$3, patronymic=$4, address=$5, telephone=$6,
    birthdate=$7, gender=$8, passportnumber=$9, jobname=$10, jobaddress=$11,
    login=$12, password=$13
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
      req.body.jobname,
      req.body.jobaddress,
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
    queryCommand = `GRANT Patient to ${req.body.login};`;
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

exports.getPatientsCurrentTreatment = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    const queryCommand = `SELECT HistoryOfIllnesses.diagnosis, Treatment.meds, Treatment.note
    FROM HistoryOfIllnesses
    JOIN Treatment ON Treatment.id=HistoryOfIllnesses.treatmentid
    WHERE patientid=${req.params.patientId}
    ORDER BY HistoryOfIllnesses.id DESC
    LIMIT 1`;
    const result = await client.query(queryCommand);
    await client.end();
    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.deletePatient = async (req, res) => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    let queryCommand = `DELETE FROM Patient WHERE id=$1 RETURNING login;`;
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
