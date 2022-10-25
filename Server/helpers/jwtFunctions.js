const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.generateAccessToken = (loginData, expirationTime) => {
  return jwt.sign(
    { login: loginData.login, password: loginData.password },
    process.env.TOKEN_SECRET,
    {
      expiresIn: expirationTime,
    }
  );
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return false /*res.sendStatus(401)*/;
  try {
    const userData = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userData = userData;
  } catch (error) {
    console.log(error);
    req.userData = false;
  }
  next();
  // if (err) return res.sendStatus(403);
};
