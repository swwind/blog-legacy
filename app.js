#!/usr/bin/node

const fs = require('fs');
const https = require('https');

const express = require('express');
const vhost = require('vhost');

const options = {
  cert: fs.readFileSync('cert.crt'),
  key: fs.readFileSync('cert.key'),
}

const { cors } = require('./backend/utils');

const blog = require('./backend/blog');
const home = require('./backend/home');
const gallery = require('./backend/gallery');
const rss = require('./backend/rss');

if (process.argv[2] === 'local') {
  https.createServer(options, blog).listen(3000);
  https.createServer(options, home).listen(4000);
  https.createServer(options, gallery).listen(5000);
  https.createServer(options, rss).listen(5001);
  console.log('blog    --> https://localhost:3000');
  console.log('home    --> https://localhost:4000');
  console.log('gallery --> https://localhost:5000');
  console.log('rss     --> https://localhost:5001');
} else {
  const app = express();
  app.use(cors);
  app.use(vhost('blog.swwind.me', blog));
  app.use(vhost('swwind.me', home));
  app.use(vhost('gallery.swwind.me', gallery));
  app.use(vhost('rss.swwind.me', rss));
  https.createServer(options, app).listen(443);
  console.log('have a nice day!');
}
