'use strict';

const express = require('express');

const app = express();
app.use(require('./valine'));

module.exports = app;
