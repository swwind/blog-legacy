/**
 * @Valine
 * Author: xCss
 * Github: https://github.com/xCss/Valine
 * Website: https://valine.js.org
 */
'use strict';

import marked from 'marked';
import detect from './assets/detect.js';
import { timeAgo, getLink, Event, decodeHTML } from './assets/utils.js';
import emoji from './assets/emoji.js';

const gravatar = {
  cdn: 'https://gravatar.loli.net/avatar/',
  get(mail) {
    return `<img class="vimg" src="${this.cdn + mail}?d=mm&s=40">`;
  }
};

const shorten = (str) => str.trim().replace(/>\s+</g, '><');
const data = {
  // 记录正在回复的 comment id
  rid: '',
  // 是否显示 emoji
  emoji: false,
};

export default function valine(option) {
  const el = document.querySelector(option);
  el.classList.add('valine');

  const placeholder = 'hello world';
  el.innerHTML = shorten(`
    <div class="vwrap">
      <div class="vheader item3">
        <input name="nonick" placeholder="称呼" class="vnick vinput" type="text">
        <input name="nomail" placeholder="邮箱" class="vmail vinput" type="email">
        <input name="nolink" placeholder="网址(https://)" class="vlink vinput" type="vlink">
      </div>
      <div class="vedit">
        <textarea class="veditor vinput" placeholder="${placeholder}"></textarea>
      </div>
      <div class="vcontrol">
        <div class="col text-left">
          <a href="https://segmentfault.com/markdown" title="???" target="_blank">Markdown</a>
          <a href="javascript:;" title="_(:3 」∠ )_" id="emoji-btn">(〃∀〃)</a>
        </div>
        <div class="col text-right">
          <button type="button" class="vsubmit vbtn">回复 (Ctrl+Enter)</button>
        </div>
      </div>
      <div class="vemoji">
      </div>
    </div>
    <div class="info">
      <div class="count col"></div>
    </div>
    <div class="vloading"></div>
    <div class="vempty" style="display:none;"></div>
    <ul class="vlist"></ul>
    <div class="info">
      <div class="power txt-right">
        Do What You Think Is Right
      </div>
    </div>
  `);

  // emoji
  const vemoji = el.querySelector('.vemoji');
  vemoji.innerHTML = emoji.map((emo, i) => {
    return `<a href="javascript:;" title="${decodeHTML(emo).replace('"', '\\"')}" class="vemoji-item" style="animation-delay: ${i * 0.01}s">${emo}</a>`
  }).join('');

  // Empty Data
  let vempty = el.querySelector('.vempty');
  const nodata = {
    show(txt) {
      vempty.innerHTML = txt;
      vempty.style.display = 'block';
    },
    hide() {
      vempty.style.display = 'none';
    }
  }

  // loading
  const vloading = el.querySelector('.vloading');
  vloading.innerHTML = shorten(`
    <div class="spinner">
      <div class="r1"></div>
      <div class="r2"></div>
      <div class="r3"></div>
      <div class="r4"></div>
      <div class="r5"></div>
    </div>
  `);
  const loading = {
    show() {
      vloading.style.display = 'block';
      nodata.hide();
    },
    hide() {
      vloading.style.display = 'none';
      if (el.querySelectorAll('.vcard').length === 0) {
        nodata.show('还没有评论哟');
      }
    }
  };

  // 插入一个评论
  const insertDom = ({ rid, ua, id, link, nick, title, content, mail, createTime }) => {
    // element which we should insert the comment to
    let _vlist = el.querySelector('.vlist');
    // is a reply
    if (rid) {
      const rpc = document.getElementById(rid);
      if (!rpc) {
        // replys to a comment which is not exist
        console.error(`comment ${rid} did not found`);
        return;
      }
      const rel = rpc.querySelector('section');
      if (rel.querySelector('ul')) {
        _vlist = rel.querySelector('ul');
        _vlist.classList.add('vlist');
      } else {
        _vlist = document.createElement('ul');
        rel.appendChild(_vlist);
      }
    }
    const det = detect(ua);
    const _vcard = document.createElement('li');
    _vcard.setAttribute('class', 'vcard');
    _vcard.setAttribute('id', id);
    _vcard.innerHTML = shorten(`
      ${gravatar.get(mail)}
      <section>
        <div class="vhead">
          <a rel="nofollow" href="${getLink(link)}" target="_blank">${nick}</a>
          <span class="vtag">${det.os} ${det.osVersion}</span>
          <span class="vtag">${det.browser} ${det.version}</span>
          ${title ? `<span class="vtag">${title}</span>` : ''}
        </div>
        <div class="vcontent">${marked(content, { sanitize: true })}</div>
        <div class="vfooter">
          <span class="vtime">${timeAgo(new Date(createTime))}</span>
          <span data-rid="${id}" data-nick="${nick}" class="vat">回复</span>
        <div>
      </section>
    `);
    // 设置外链跳转方式
    Array.from(_vcard.querySelectorAll('a')).forEach((item) => {
      item.setAttribute('target', '_blank');
      item.setAttribute('rel', 'nofollow');
    });
    if (rid) _vlist.appendChild(_vcard);
    else _vlist.insertBefore(_vcard, _vlist.querySelector('li'));
    // expandEvt(_vcard.querySelector('.vcontent'));
    bindAtEvt(_vcard.querySelector('.vat'));
  }

  // 初始化所有评论
  ;(() => {
    loading.show();
    fetch('/getcomment?url=' + encodeURI(window.location.pathname.replace(/index\.html?$/, '')))
    .then(res => res.json())
    .then(res => {
      if (res.length) {
        res.forEach(insertDom);
        el.querySelector('.count').innerHTML = `评论(<span class="num">${res.length}</span>)`;
      }
      loading.hide();
    }).catch((ex) => {
      loading.hide();
      nodata.show('评论系统暂不可用');
      inputs.comment.disabled = true;
    });
  })();

  // 加载输入框
  let inputs = {
    comment: el.querySelector('.veditor'),
    nick: el.querySelector('.vnick'),
    mail: el.querySelector('.vmail'),
    link: el.querySelector('.vlink')
  };

  // 保存和加载游客的信息
  const setCache = (nick, mail, link) => {
    if (nick) document.cookie = 'nick=' + nick;
    if (mail) document.cookie = 'mail=' + mail;
    if (link) document.cookie = 'link=' + link;
  }
  const getCache = () => {
    const cookie = document.cookie.split(';')
      .map((str) => str.trim().split('='))
      .reduce((obj, [key, value]) => { obj[key] = value; return obj; }, {});
    return {
      nick: cookie.nick || '',
      mail: cookie.mail || '',
      link: cookie.link || '',
    }
  }
  const cache = getCache();
  inputs.nick.value = cache.nick;
  inputs.mail.value = cache.mail;
  inputs.link.value = cache.link;

  // 提交评论相关
  const submitBtn = el.querySelector('.vsubmit');
  const submitEvt = (e) => {
    const content = inputs.comment.value;
    if (!content) {
      // nothing typed
      return;
    }
    const nick = inputs.nick.value;
    const mail = inputs.mail.value;
    const link = inputs.link.value;
    const dfc = new FormData();
    dfc.append('url', window.location.pathname.replace(/index\.html?$/, ''));
    dfc.append('nick', nick);
    dfc.append('mail', mail);
    dfc.append('link', link);
    dfc.append('content', content);
    dfc.append('rid', data.rid);
    setCache(nick, mail, link);

    // submit the comment

    submitBtn.setAttribute('disabled', true);
    loading.show();
    fetch('/comment', {
      method: 'POST',
      body: dfc,
    }).then(res => res.json())
    .then(res => {
      const _count = el.querySelector('.num');
      if (_count) {
        _count.innerText = parseInt(_count.innerText) + 1;
      } else {
        el.querySelector('.count').innerHTML = '评论(<span class="num">1</span>)';
      }
      insertDom(res);
      submitBtn.removeAttribute('disabled');
      loading.hide();

      // 清理回复设置
      inputs.comment.value = '';
      inputs.comment.setAttribute('placeholder', placeholder);
      data.rid = '';
    }).catch((ex) => {
      loading.hide();
      nodata.show('提交失败\n' + ex.message);
      // setTimeout(nodata.hide, 2000);
    });
  }
  Event.on('click', submitBtn, submitEvt);
  Event.on('keydown', inputs.comment, (e) => {
    if (e.ctrlKey && e.code === 'Enter') {
      submitBtn.click();
    }
  });

  // 点下了 回复 按钮
  const bindAtEvt = (el) => {
    Event.on('click', el, (e) => {
      const nick = el.getAttribute('data-nick');
      data.rid = el.getAttribute('data-rid');
      inputs.comment.setAttribute('placeholder', `回复 @${nick} 的评论...`);
      inputs.comment.scrollIntoView({ block: 'center', behavior: 'smooth' });
      inputs.comment.select();
    });
  }

  // emoji
  const emojiBtn = el.querySelector('#emoji-btn');
  Event.on('click', emojiBtn, (e) => {
    data.emoji = !data.emoji;
    vemoji.style.display = data.emoji ? 'block' : 'none';
    emojiBtn.classList.toggle('active');
  });
  vemoji.querySelectorAll('.vemoji-item').forEach((el) => {
    Event.on('click', el, (e) => {
      inputs.comment.value += el.innerText;
      inputs.comment.focus();
    });
  });
}
