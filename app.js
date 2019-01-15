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

const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
const resolve404 = (message) => (req, res, next) => {
  res.status(404).end(message);
}

const { log } = require('./backend/log');
const { decode } = require('./backend/utils.js');
const { count, query } = require('./backend/count');
const { createComment, getComment, rssComment, getComments, delComment } = require('./backend/comment');
const { viewDir, viewRoot, randomWallpaper } = require('./backend/gallery');

const blog = express();
blog.use(bodyParser.json());         // to support JSON-encoded bodies
blog.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// 日志
blog.use(log);
// 统计阅读量
blog.get('/count', decode('url'), count);
// 只获取阅读量
blog.get('/query', decode('url'), query);
// 评论
blog.post('/comment', upload.any(), createComment);
// 获取评论
blog.get('/getcomment', decode('url'), getComment);
blog.get('/getcomments', getComments);
blog.get('/delcomment', delComment);
// 订阅评论
blog.get('/comments.xml', rssComment);
// Static site
blog.use(express.static('public'));
blog.use(resolve404(fs.readFileSync('public/404.html')));

const home = express();
home.use(express.static('homepage'));
home.use(resolve404(fs.readFileSync('public/404.html')));

const gallery = express();
gallery.use(express.static('gallery'));
gallery.use('/random.jpg', randomWallpaper)
gallery.use('/:dirname', viewDir);
gallery.use('/', viewRoot);
gallery.use(resolve404('404 NOT FOUND'));

const app = express();
app.use(cors);
if (process.argv[2] === 'local') {
  https.createServer(options, blog).listen(3000);
  https.createServer(options, home).listen(4000);
  https.createServer(options, gallery).listen(5000);
  console.log('blog    opening on https://localhost:3000');
  console.log('home    opening on https://localhost:4000');
  console.log('gallery opening on https://localhost:5000');
} else {
  app.use(vhost('blog.swwind.me', blog));
  app.use(vhost('swwind.me', home));
  app.use(vhost('gallery.swwind.me', gallery));
  app.use((req, res) => {
    res.redirect('https://swwind.me');
  });
  https.createServer(options, app).listen(443);
  console.log('have a nice day!');
}
