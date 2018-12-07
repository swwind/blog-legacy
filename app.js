#!/bin/bash

const fs = require('fs');
const https = require('https');

const Store = require('./data-store.js');
const count = Store('count');
const comments = Store('comment');

const countInc = (url) => {
  if (!count.get(url)) {
    count.set(url, 1);
  } else {
    count.set(url, count.get(url) + 1);
  }
  return { url, data: count.get(url) };
}

const getRandomId = () => {
  let res = '';
  for (let i = 0; i < 16; ++ i) {
    res += Math.floor(Math.random() * 16).toString(16);
  }
  return res;
}

// { rid, ua, id, link, nick, title, content, mail, createTime }
const createComment = (url, nick, mail, link, content, rid, ua) => {
  // check mail
  if (!/[\w-\.]+@([\w-]+\.)+[a-z]{2,3}/.test(mail)) {
    mail = '';
  }
  // check link
  if (!/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/.test(link)) {
    link = '';
  }
  if (!nick) {
    nick = 'tourist';
  }

  const createTime = new Date().toISOString();
  const title = '';
  const id = getRandomId();
  const obj = { rid, ua, id, link, nick, title, content, mail, createTime };
  if (!comments.get(url)) {
    comments.set(url, [obj]);
  } else {
    comments.set(url, comments.get(url).concat(obj));
  }
  return obj;
}

const getComments = (url) => {
  return comments.get(url) || [];
}

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const app = express();

app.use(bodyParser.json());         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://blog.swwind.me');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const options = {
  cert: fs.readFileSync('cert.crt'),
  key: fs.readFileSync('cert.key')
}

// 统计阅读量
app.get('/count', (req, res) => {
  res.header('Content-Type', 'application/json');
  if (!req.query.url) {
    res.end(JSON.stringify(count.get()));
  } else {
    res.end(JSON.stringify(countInc(req.query.url)));
  }
});

app.post('/comment', upload.any(), (req, res) => {
  res.header('Content-Type', 'application/json');
  const url     = req.body.url     || '';
  const nick    = req.body.nick    || '';
  const mail    = req.body.mail    || '';
  const link    = req.body.link    || '';
  const content = req.body.content || '';
  const rid     = req.body.rid     || '';
  const ua      = req.get('User-Agent');
  if (!content || !url) {
    res.status(451).json({ message: 'forbidden' });
  } else {
    res.status(200).json(createComment(url, nick, mail, link, content, rid, ua));
  }
});

app.get('/getcomment', upload.any(), (req, res) => {
  res.header('Content-Type', 'application/json');
  if (!req.query.url) {
    res.status(451).json({ message: 'forbidden' });
  } else {
    res.status(200).json(getComments(req.query.url));
  }
});

app.use(express.static('public'));

https.createServer(options, app).listen(4000);

console.log('listening...');
