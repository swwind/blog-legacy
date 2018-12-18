#!/usr/bin/node

const fs = require('fs');
const https = require('https');

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const app = express();

app.use(bodyParser.json());         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const options = {
  cert: fs.readFileSync('cert.crt'),
  key: fs.readFileSync('cert.key')
}

const { log } = require('./backend/log');
const { decode } = require('./backend/utils.js');
const { count, query } = require('./backend/count');
const { createComment, getComment, rssComment } = require('./backend/comment');

// 日志
app.use(log);
// 统计阅读量 (+1)
app.get('/count/:url', decode('url'), count);
// 只获取阅读量 (+0)
app.get('/query/:url', decode('url'), query);
// 评论
app.post('/comment', upload.any(), createComment);
// 获取评论
app.get('/getcomment/:url', decode('url'), getComment);
// 订阅评论
app.get('/comments.xml', rssComment);

app.use(express.static('public'));
https.createServer(options, app).listen(443);

console.log('listening...');
