const { generateAccessToken } = require('../helpers/jwtFunctions');
const { Client } = require('pg');

exports.loginUser = async (req, res) => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    const queryCommand = `SELECT Doctor.id, Role.name as roleName
    FROM Doctor 
    JOIN Role ON Role.id = Doctor.roleId
    WHERE login = $1 and password = $2
    UNION SELECT HeadDoctor.id, Role.name as roleName 
    FROM HeadDoctor 
    JOIN Role ON Role.id = HeadDoctor.roleId
    WHERE login = $1 and password = $2
    UNION SELECT HeadOfDepartment.id, Role.name  as roleName
    FROM HeadOfDepartment 
    JOIN Role ON Role.id = HeadOfDepartment.roleId
    WHERE login = $1 and password = $2
    UNION SELECT Patient.id, Role.name  as roleName
    FROM Patient
    JOIN Role ON Role.id = Patient.roleId
    WHERE login = $1 and password = $2`;
    const queryParams = [req.body.login, req.body.password];
    const result = await client.query(queryCommand, queryParams);
    const expirationTime = 3600 * 1000;
    const token = generateAccessToken(req.body, expirationTime);
    await client.end();
    res.status(200).json({ user: result.rows[0], token, expirationTime });
  } catch (err) {
    console.log(err)
    res.status(500).send();
  }
};
