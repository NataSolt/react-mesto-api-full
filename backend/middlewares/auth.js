const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new Unauthorized(`Необходима авторизация 1 ${authorization}`);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new Unauthorized(`Необходима авторизация 2 ${token}`);
  }

  req.user = payload;
  next();
};
