'use strict';

const fs = require('fs');
const multer = require('multer');
const express = require('express');
const bodyParser = require('body-parser');

const upload = multer();

const {
  createComment,
  getComment,
  rssComment,
  getComments,
  delComment,
} = require('./comment');

const {
  count,
  query,
} = require('./count');

const log = require('./log');

const { decode, resolve404 } = require('../utils');

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

module.exports = blog;

