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

const api = express();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
// 统计阅读量
api.get('/count', decode('url'), count);
// 只获取阅读量
api.get('/query', decode('url'), query);
// 评论
api.post('/comment', upload.any(), createComment);
// 获取评论
api.get('/getcomment', decode('url'), getComment);
api.get('/getcomments', getComments);
api.get('/delcomment', delComment);
// 订阅评论
api.get('/comments.xml', rssComment);

// Static site
const blog = express();
// 日志
blog.use(log);
blog.use(api);
blog.use(express.static('public'));
blog.use(resolve404(fs.readFileSync('public/404.html')));

module.exports = { api, blog };
