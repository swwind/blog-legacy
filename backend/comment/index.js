#!/bin/bash

const fs = require('fs');
const md5 = require('md5');
const store = require('../data-store.js');
const comments = store('comment');

const getRandomId = () => {
  let res = '';
  for (let i = 0; i < 16; ++ i) {
    res += Math.floor(Math.random() * 16).toString(16);
  }
  return res;
}

const cloneObject = (obj) => {
  return Object.assign(Object.create(null), obj);
}

const encodeComment = (comment) => {
  return Object.assign(cloneObject(comment), {
    mail: md5(comment.mail)
  });
}

const rss_data = ((fake_data) => {
  const rss_data = [];
  for (const key in fake_data) {
    fake_data[key].forEach(item => {
      rss_data.push(Object.assign(item, { url: key }));
    });
  }
  rss_data.sort((a, b) => {
    return (+new Date(a.createTime)) - (+new Date(b.createTime));
  });
  return rss_data.slice(-20);
})(comments.get());

const updateRssData = (obj) => {
  rss_data.push(obj);
  if (rss_data.length > 20) {
    rss_data.shift();
  }
}

// { rid, ua, id, link, nick, title, content, mail, createTime }
const _createComment = (url, nick, mail, link, content, rid, ua) => {
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
  updateRssData(Object.assign(obj, { url }));
  return encodeComment(obj);
}

const _getComment = (url) => {
  return (comments.get(url) || []).map(encodeComment);
}

// 评论
const createComment = (req, res) => {
  res.header('Content-Type', 'application/json');
  const url     = req.body.url     || '';
  const nick    = req.body.nick    || '';
  const mail    = req.body.mail    || '';
  const link    = req.body.link    || '';
  const content = req.body.content || '';
  const rid     = req.body.rid     || '';
  const ua      = req.get('User-Agent');
  if (!content || !url) {
    res.status(403).json({ message: 'forbidden' });
  } else {
    res.status(200).json(_createComment(url, nick, mail, link, content, rid, ua));
  }
};

// 获取评论
const getComment = (req, res) => {
  res.header('Content-Type', 'application/json');
  if (!req.params.url) {
    res.status(403).json({ message: 'forbidden' });
  } else {
    res.status(200).json(_getComment(req.params.url));
  }
};

const ejs = require('ejs');
const comments_template = fs.readFileSync('./backend/comment/template.xml', 'utf-8');
const template = ejs.compile(comments_template);

// 订阅评论
const rssComment = (req, res) => {
  res.header('Content-Type', 'application/xml');
  const data = Array.from(rss_data).reverse();
  res.status(200).end(template({ data }));
};

module.exports = {
  createComment,
  getComment,
  rssComment,
}
