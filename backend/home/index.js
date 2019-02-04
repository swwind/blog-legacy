'use strict';

const fs = require('fs');
const express = require('express');

const { resolve404 } = require('../utils');

const home = express();
home.use(express.static('homepage'));
home.use(resolve404(fs.readFileSync('public/404.html')));

module.exports = home;
