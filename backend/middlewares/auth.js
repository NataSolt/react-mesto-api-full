const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new Unauthorized(`Необходима авторизация 1 ${authorization}`);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret');
  } catch (err) {
    throw new Unauthorized(`Необходима авторизация 2 ${token}`);
  }

  req.user = payload;
  next();
};
