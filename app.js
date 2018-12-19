#!/usr/bin/node

const fs = require('fs');
const https = require('https');

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const vhost = require('vhost');

const options = {
  cert: fs.readFileSync('cert.crt'),
  key: fs.readFileSync('cert.key')
}

const cors = (domain) => (req, res, next) => {
  res.header('Access-Control-Allow-Origin', domain);
  next();
}

const { log } = require('./backend/log');
const { decode } = require('./backend/utils.js');
const { count, query } = require('./backend/count');
const { createComment, getComment, rssComment } = require('./backend/comment');

const blog = express();
blog.use(cors('*'));
blog.use(bodyParser.json());         // to support JSON-encoded bodies
blog.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// 日志
blog.use(log);
// 统计阅读量 (+1)
blog.get('/count/:url', decode('url'), count);
// 只获取阅读量 (+0)
blog.get('/query/:url', decode('url'), query);
// 评论
blog.post('/comment', upload.any(), createComment);
// 获取评论
blog.get('/getcomment/:url', decode('url'), getComment);
// 订阅评论
blog.get('/comments.xml', rssComment);
// Static site
blog.use(express.static('public'));

const home = express();
home.use(express.static('homepage'));

const cdn = express();
cdn.use(express.static('cdn'));

const app = express();
if (process.argv[2] === 'local') {
  https.createServer(options, blog).listen(3000);
  https.createServer(options, home).listen(4000);
  console.log('blog opening on https://localhost:3000');
  console.log('home opening on https://localhost:4000');
} else {
  app.use(vhost('blog.swwind.me', blog));
  app.use(vhost('swwind.me', home));
  app.use(vhost('cdn.swwind.me', cdn));
  app.use((req, res) => {
    res.redirect('https://swwind.me');
  });
  https.createServer(options, app).listen(443);
  console.log('have a nice day!');
}
