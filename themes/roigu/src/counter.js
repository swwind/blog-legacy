'use strict';

const counter = (appId, appKey, res) => {
  if (!appId || !appKey) return console.error('ReadCounter: Check your appid and appkey!');
  let page_path = encodeURI(decodeURI(window.location.pathname)).replace(/index\.html?$/,"");
  if (!AV) return console.error('Error: Can not find object "AV".');
  let el = document.querySelector(res);
  if (!el) return;
  el.innerHTML = '?';
  AV.applicationId = null;
  AV.init(appId, appKey);
  // work
  let query = new AV.Query('Read_Count');
  let ReadCount = AV.Object.extend('Read_Count');
  query.equalTo('link', page_path);
  query.find().then(todo => {
    let obj = todo[0] || new ReadCount({link: page_path, value: 0});
    obj.increment('value');
    return obj.save();
  }).then(obj => {
    el.innerHTML = obj.get('value');
  }).catch(err => {
    console.error('Failed to save read times, with error message: ' + err.message);
  });
}

export default counter;
