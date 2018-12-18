'use strict';

const store = require('../data-store.js');
const counter = store('count');

const _query = (url) => {
  return { url, data: counter.get(url) || 0 };
}

const _count = (url) => {
  if (!counter.get(url)) {
    counter.set(url, 1);
  } else {
    counter.set(url, counter.get(url) + 1);
  }
  return _query(url);
}

const count = (req, res) => {
  res.header('Content-Type', 'application/json');
  if (!req.params.url) {
    res.status(403).json({ message: 'forbidden' });
  } else {
    res.status(200).json(_count(req.params.url));
  }
}
const query = (req, res) => {
  res.header('Content-Type', 'application/json');
  if (!req.params.url) {
    res.status(403).json({ message: 'forbidden' });
  } else {
    res.status(200).json(_query(req.params.url));
  }
}

module.exports = {
  count,
  query,
}
