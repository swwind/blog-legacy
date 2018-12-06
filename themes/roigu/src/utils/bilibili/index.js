'use strict';

import jsonp from 'jsonp';

const image = (url, el) => {
  if (typeof window.fetch === 'undefined')
    return new Error('Error: `window.fetch` is not recognized as a function');
  fetch(url, {
    method: 'GET',
    referrerPolicy: 'no-referrer'
  }).then(x => x.blob()).then(x => {
    if (/^image\/.*$/.test(x.type)) {
      el.src = URL.createObjectURL(x);
    }
  });
}

import Play from './icon/play.svg';
import Comments from './icon/comments.svg';

const Icons = {
  play: Play,
  comments: Comments
};

const bilibili = (el) => {
  const aid = el.getAttribute('data-aid');
  const page = el.getAttribute('data-page');
  const link = 'https://www.bilibili.com/video/av' + aid + (page > 1 ? '/?p=' + page : '');
  console.log(`Start Load AV${aid} P${page}`);
  const success = (data) => {
    if (page > 1) {
      data.title += ' P' + page;
    }
    el.innerHTML = (`
      <a class="b_-pic" href="${link}" title="${data.title}" target="_blank">
        <img src="/img/loading.png">
      </a>
      <div class="b_-info">
        <a class="b_-title" href="${link}" title="${data.title}" target="_blank">${data.title}</a>
        <div class="b_-play-review">
          <div class="b_-play"><i class="b_-icon">${Icons.play}</i>${data.play}</div>
          <div class="b_-review"><i class="b_-icon">${Icons.comments}</i>${data.review}</div>
        </div>
        <div class="b_-type-author">
          <div class="b_-type">${data.typename}</div>
          <a class="b_-author" href="https://space.bilibili.com/${data.mid}" title="${data.author}" target="_blank">
            <img class="b_-face" src="/img/avatar/default.png">
            <span class="b_-name">${data.author}</span>
          </a>
        </div>
      </div>
    `);
    el.classList.add('active');
    image(data.pic, el.querySelector('.b_-pic img'));
    image(data.face, el.querySelector('img.b_-face'));
  }
  const failed = () => {
    el.innerHTML = (`<a href="${link}">av${aid}</a>`);
  }
  const url = `https://api.bilibili.com/view?type=jsonp&appkey=8e9fc618fbd41e28&id=${aid}&page=${page}`;
  jsonp(url, (err, data) => {
    if (err || !data.title) {
      console.error(err);
      failed();
    } else {
      success(data);
    }
  })
}

export default bilibili;
