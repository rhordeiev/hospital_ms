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
    const queryCommand = `SELECT * FROM headdoctor WHERE login = $1 and password = $2`;
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
    let queryCommand = `UPDATE headdoctor
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
    queryCommand = `GRANT HeadDoctor to ${req.body.login};`;
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

exports.updateHospital = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    const queryCommand = `UPDATE hospital 
    SET name=$1, location=$2 
    WHERE id=1;`;
    const queryParams = [req.body.name, req.body.location];
    await client.query(queryCommand, queryParams);
    await client.end();
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.setHeadOfDepartment = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    const queryCommand = `UPDATE department 
    SET headofdepartmentid=$2 
    WHERE specialtyid=$1;`;
    const queryParams = [req.body.specialtyid, req.body.headofdepartmentid];
    await client.query(queryCommand, queryParams);
    await client.end();
    res.status(204).send();
  } catch (error) {
    //console.log(error);
    res.status(500).send(error);
  }
};

exports.getHospitalInfo = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    const queryCommand = `SELECT name, location FROM Hospital WHERE id=1;`;
    const result = await client.query(queryCommand);
    await client.end();
    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.addHeadOfDepartment = async (req, res) => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    let queryCommand = `INSERT INTO headofdepartment(
      name, roleid, surname, patronymic, address, telephone,
      birthdate, workingtime, workingdays, gender, passportnumber, salary, login, password)
      VALUES ($1, 2, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`;
    let queryParams = [
      req.body.name,
      req.body.surname,
      req.body.patronymic,
      req.body.address,
      req.body.telephone,
      req.body.birthdate,
      req.body.workingtime,
      req.body.workingdays,
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
    queryCommand = `GRANT HeadOfDepartment to ${req.body.login};`;
    await client.query(queryCommand);
    await client.end();
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.addSpecialty = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    const insertSpecialtyQueryCommand = `INSERT INTO specialty(name) VALUES ($1) RETURNING id`;
    const insertSpecialtyQueryParams = [req.body.name];
    const id = (
      await client.query(
        insertSpecialtyQueryCommand,
        insertSpecialtyQueryParams
      )
    ).rows[0].id;
    const insertDepartmentQueryCommand = `INSERT INTO department(
      specialtyid, headofdepartmentid)
      VALUES ($1, null);`;
    const insertDepartmentQueryParams = [id];
    await client.query(
      insertDepartmentQueryCommand,
      insertDepartmentQueryParams
    );
    await client.end();
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getSpecialtiesInfo = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    const queryCommand = `SELECT id, name FROM Specialty`;
    const result = await client.query(queryCommand);
    await client.end();
    res.status(200).send(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getHeadsOfDepartmentsNames = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    const queryCommand = `SELECT id, name, surname, patronymic FROM HeadOfDepartment`;
    const result = await client.query(queryCommand);
    await client.end();
    res.status(200).send(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getHeadsOfDepartmentsInfo = async (req, res) => {
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
    birthdate, workingtime, workingdays, gender, passportnumber, salary
    FROM HeadOfDepartment`;
    const result = await client.query(queryCommand);
    await client.end();
    res.status(200).send(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.viewChangeHeadsOfDepartmentsInfo = async (req, res) => {
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
    birthdate, workingtime, workingdays, gender, passportnumber, salary
    FROM HeadOfDepartment
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
exports.aggregateHeadsOfDepartmentsInfo = async (req, res) => {
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
    FROM HeadOfDepartment
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
exports.deleteHeadOfDepartment = async (req, res) => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    let queryCommand = `DELETE FROM headofdepartment WHERE id=$1 RETURNING login;`;
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
exports.getDepartments = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    const queryCommand = `SELECT Department.id AS id, Specialty.name AS specialtyname,
    HeadOfDepartment.name || ' ' || HeadOfDepartment.surname || ' ' || HeadOfDepartment.patronymic
    AS headofdepartmentname
    from Department
    JOIN Specialty ON Specialty.id = Department.specialtyId
    LEFT JOIN HeadOfDepartment ON HeadOfDepartment.id = Department.headOfDepartmentId`;
    const result = await client.query(queryCommand);
    await client.end();
    res.status(200).send(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.viewChangeDepartments = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    const queryCommand = `SELECT Department.id AS id, Specialty.name AS specialtyname,
    HeadOfDepartment.surname || ' ' || HeadOfDepartment.name || ' ' || HeadOfDepartment.patronymic
    AS headofdepartmentname
    FROM Department
    JOIN Specialty ON Specialty.id = Department.specialtyId
    LEFT JOIN HeadOfDepartment ON HeadOfDepartment.id = Department.headOfDepartmentId
    WHERE ${
      req.query.filter === 'specialtyname'
        ? `Specialty.name ~ '${req.query.value}' ORDER BY Specialty.name ${req.query.sortdirection}`
        : `HeadOfDepartment.surname ~ '${req.query.value}' or HeadOfDepartment.name ~ '${req.query.value}'
        or HeadOfDepartment.patronymic ~ '${req.query.value}'
        ORDER BY HeadOfDepartment.surname ${req.query.sortdirection},
        HeadOfDepartment.name ${req.query.sortdirection}, HeadOfDepartment.patronymic ${req.query.sortdirection}`
    }`;
    const result = await client.query(queryCommand);
    await client.end();
    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.aggregateDepartments = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    const queryCommand = `SELECT COUNT(*) AS count FROM Department
    JOIN Specialty ON Specialty.id = Department.specialtyId
    LEFT JOIN HeadOfDepartment ON HeadOfDepartment.id = Department.headOfDepartmentId
    WHERE ${
      req.query.filter === 'specialtyname'
        ? `Specialty.name ~ '${req.query.value}'`
        : `HeadOfDepartment.surname ~ '${req.query.value}' or HeadOfDepartment.name ~ '${req.query.value}'
        or HeadOfDepartment.patronymic ~ '${req.query.value}'`
    }`;
    const result = await client.query(queryCommand);
    await client.end();
    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.deleteDepartment = async (req, res) => {
  const client = new Client({
    user: req.userData.login,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: req.userData.password,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    let queryCommand = `SELECT specialtyid FROM Department WHERE id=$1`;
    let queryParams = [req.params.id];
    const result = await client.query(queryCommand, queryParams);
    queryCommand = `DELETE FROM Specialty WHERE id=$1;`;
    queryParams = [result.rows[0].specialtyid];
    await client.query(queryCommand, queryParams);
    await client.end();
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
