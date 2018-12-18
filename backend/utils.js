'use strict';

const decode = (key) => (req, res, next) => {
  if ('string' === typeof req.params[key]) {
    req.params[key] = Buffer.from(req.params[key] +
      '='.repeat((3 - req.params[key].length % 3) % 3), 'base64').toString();
  }
  next();
}

module.exports = {
  decode,
}
