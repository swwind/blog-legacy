'use strict';

const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const dir_template_path = path.resolve(__dirname, 'dir_template.ejs');
const dir_template_text = fs.readFileSync(dir_template_path, 'utf-8');
const dir_template = ejs.compile(dir_template_text);

const root_template_path = path.resolve(__dirname, 'root_template.ejs');
const root_template_text = fs.readFileSync(root_template_path, 'utf-8');
const root_template = ejs.compile(root_template_text);

const data = new Map();
const galleryDir = fs.readdirSync('./gallery');
for (const dir of galleryDir) {
  const dirname = path.resolve('./gallery', dir);
  if (fs.lstatSync(dirname).isDirectory()) {
    const filelist = fs.readdirSync(dirname);
    const picnumber = filelist.filter((filename) => filename.indexOf('thumbnail') > -1).length;
    if (picnumber) {
      data.set(dir, picnumber);
    }
  }
}
const css = fs.readFileSync(path.resolve(__dirname, 'style.css'), 'utf-8');

// :dirname
const viewDir = (req, res, next) => {
  const dirname = req.params.dirname;
  const picnumber = data.get(dirname)
  if (picnumber) {
    res.status(200).end(dir_template({ dirname, picnumber }));
  } else {
    next();
  }
}
// /
const viewRoot = (req, res, next) => {
  if (req.originalUrl === '/') {
    res.status(200).end(root_template({ data }));
  } else {
    next();
  }
}
// /gallery.css
const requestForCss = (req, res, next) => {
  res.header('Content-Type', 'text/css');
  res.status(200).end(css);
}

module.exports = { viewDir, viewRoot, requestForCss };
