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
  return encodeComment(obj);
}

const _getComment = (url) => {
  return (comments.get(url) || []).map(encodeComment);
}
const _getComments = (url) => {
  const all = comments.get();
  const res = [];
  for (const key in all) {
    for (const cmt of all[key]) {
      res.push(cmt);
    }
  }
  return res.sort((a, b) => {
    return (+new Date(b.createTime)) - (+new Date(a.createTime));
  }).map(encodeComment);
}
const _delComment = (id) => {
  const all = comments.get();
  let ok = false;
  for (const key in all) {
    const res = all[key].filter((a) => a.id !== id);
    if (res.length !== all[key].length) {
      comments.set(key, res);
      ok = true;
    }
  }
  return ok;
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
  if (!req.query.url) {
    res.status(403).json({ message: 'forbidden' });
  } else {
    res.status(200).json(req.query.url.map(_getComment));
  }
};
// 获取所有评论
const getComments = (req, res) => {
  res.header('Content-Type', 'application/json');
  res.status(200).json(_getComments());
};
// 删除评论
const delComment = (req, res) => {
  res.header('Content-Type', 'application/json');
  if (req.query.masterkey !== 'd5c00449b3d3dae17498696189b14f3c') {
    return res.status(403).json({ code: 403, message: 'fuck you' });
  }
  if (_delComment(req.query.id)) {
    res.status(200).json({ code: 200, message: 'ok, removed' });
  } else {
    res.status(500).json({ code: 500, message: 'oh no, something happened' });
  }
}

const ejs = require('ejs');
const comments_template = fs.readFileSync('./backend/comment/template.xml', 'utf-8');
const template = ejs.compile(comments_template);

// 订阅评论
const rssComment = (req, res) => {
  res.header('Content-Type', 'application/xml');
  const data = _getComments().slice(0, 20);
  res.status(200).end(template({ data }));
};

module.exports = {
  createComment,
  getComment,
  rssComment,
  getComments,
  delComment,
}
