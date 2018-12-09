'use strict';

const store = require('../data-store.js');
const counter = store('count');

const _count = (url) => {
  if (!counter.get(url)) {
    counter.set(url, 1);
  } else {
    counter.set(url, counter.get(url) + 1);
  }
  return { url, data: counter.get(url) };
}

const count = (req, res) => {
  res.header('Content-Type', 'application/json');
  if (!req.query.url) {
    res.status(403).json({ message: 'forbidden' });
  } else {
    res.status(200).json(_count(req.query.url));
  }
}

module.exports = {
	count,
}
