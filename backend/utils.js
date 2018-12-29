'use strict';

// decode base64
const atob = (str) => {
  return Buffer.from(str + '='.repeat((3 - str.length % 3) % 3), 'base64').toString();
}

const decode = (key) => (req, res, next) => {
  if ('string' === typeof req.params[key]) {
    req.params[key] = atob(req.params[key]);
  }
  if ('string' === typeof req.query[key]) {
    req.query[key] = req.query[key].split(',').map(atob);
  }
  next();
}

module.exports = {
  decode,
}
