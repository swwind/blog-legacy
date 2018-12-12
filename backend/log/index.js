'use strict';

const fs = require('fs');
const path = require('path');

const SAVE_DIR = './data/logs';
const generateFileName = () => {
  const today = new Date();
  const filename = [today.getFullYear(), today.getMonth(), today.getDate()].join('-');
  for (let i = 1; true; ++ i) {
    const logname = path.resolve(SAVE_DIR, filename + '-' + i + '.log');
    if (!fs.existsSync(logname)) {
      fs.writeFileSync(logname, '');
      return logname;
    }
  }
}

const mkdirs = (dirname) => {
  if (!fs.existsSync(dirname)) {
    mkdirs(path.dirname(dirname));
    fs.mkdirSync(dirname);
  }
}
mkdirs(SAVE_DIR);

let FILE_NAME = generateFileName();

const _log = (str) => {
  fs.appendFile(FILE_NAME, '[' + new Date().toTimeString().slice(0, 8) + '] ' + str + '\n', () => {});
}

const flushLogFile = () => {
  FILE_NAME = generateFileName();
  setTimeout(flushLogFile, 1000 * 60 * 60 * 24);
}
setTimeout(flushLogFile, 86400000 - (new Date().getTime() + 28800000) % 86400000 + 60000);

const log = (req, res, next) => {
  const ip = req.ip;
  const method = req.method;
  const url = req.originalUrl;
  const ua = req.get('User-Agent');
  if (!/\.(?:png|jpg|ttf|css|js|svg|ico)$/.test(url)) {
    _log([ip, method, url, ua].join(' '));
  }
  next();
}

module.exports = { log }
