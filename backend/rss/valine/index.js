'use strict';

const AV = require('leancloud-storage');
const express = require('express');
const path = require('path');
const pug = require('pug');
const fs = require('fs');

const compile = pug.compile(fs.readFileSync(path.join(__dirname, 'rss.pug'), 'utf-8'));

const app = express();
app.use('/valine/:appid/:appkey/:domain', (req, res) => {

  const reject = (err) => {
    const message = err && err.message || 'unknow error';
    res.status(501).end('501 Server Error:\n' + message);
  }
  const resolve = (data) => {
    res.header('Content-Type', 'application/xml');
    res.header('Cache-Control', 'max-age=600');
    res.status(200).end(data);
  }

  AV.applicationId = null;
  AV.init({
    appId: req.params.appid,
    appKey: req.params.appkey,
  });

  const domain = req.params.domain;

  const query = new AV.Query('Comment');
  query.limit(10);
  query.descending('createdAt');
  query.find().then((saves) => {
    const data = saves.map((save) => {
      const nick = save.get('nick');
      const comment = save.get('comment');
      const url = save.get('url');
      const id = save.get('objectId');
      const time = save.get('createdAt');

      return {
        title: `${nick} 评论于 ${url} (${id})`,
        link: `https://${domain}${url}#${id}`,
        description: comment,
        time: time.toString(),
      }
    });

    try {
      resolve(compile({ domain, data }));
    } catch (e) {
      reject(e);
    }
  }, reject);

});

module.exports = app;

