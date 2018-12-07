'use strict';

import bilibili from './bilibili';

const setScrollTop = (top) => {
  document.body.scrollTop = top; // For Safari
  document.documentElement.scrollTop = top; // For Chrome, Firefox, IE and Opera
}
const easyInOut = x => x*x / (x*x + (1-x)*(1-x));
const fly = (pos, time = 500, timefn = easyInOut) => {
  const start = new Date().getTime();
  const lastpos = document.documentElement.scrollTop || document.body.scrollTop;
  const fn = () => {
    const now = new Date().getTime() - start;
    if (now < time) {
      const nowpos = (pos - lastpos) * timefn(now / time) + lastpos;
      setScrollTop(nowpos);
      requestAnimationFrame(fn);
    } else {
      setScrollTop(pos);
    }
  }
  requestAnimationFrame(fn);
}

const onscroll = () => {
  let oScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let wi = window.innerHeight / 2;
  let totop = document.querySelector('.totop');
  let header = document.querySelector('header');
  if (totop) {
    totop.classList[oScrollTop > wi ? 'add' : 'remove']('totop-show');
  }
  if (header) {
    header.classList[oScrollTop ? 'add' : 'remove']('header-fixed');
  }
}

const placeholder = (el) => {
  let k = document.createElement('div');
      k.classList.add('placeholder-massage');
      k.innerHTML = el.innerHTML;
  el.innerHTML = '';
  el.append(k);
  let nxt = el.nextElementSibling;
  nxt.onfocus = () => {
    k.classList.add('placeholder-focus');
  }
  nxt.onblur = () => {
    if (!nxt.value) {
      k.classList.remove('placeholder-focus');
    }
  }
}

const ripple = () => {
  document.querySelectorAll('.ripple').forEach(elem => {
    elem.onmousedown = (event) => {
      let rect = elem.getBoundingClientRect();
      let win = elem.ownerDocument.defaultView;

      let size = elem.offsetWidth;
      let st = document.documentElement.scrollTop || document.body.scrollTop;
      let x = event.clientX - (rect.left + win.pageXOffset);
      let y = event.clientY - (rect.top + win.pageYOffset - st);
      let obj = document.createElement('span');
          obj.classList.add('ripple-span');
          obj.style.height = size + 'px';
          obj.style.width = size + 'px';
          obj.style.left = x + 'px';
          obj.style.top = y + 'px';
      elem.append(obj);
      setTimeout(() => {
        obj.remove();
      }, 1000);
    }
  })
}

const prepare = () => {
  // create totop button
  let totop = document.createElement('div');
      totop.classList.add('totop');
  totop.addEventListener('click', () => {
    fly(0, 500);
  })
  document.body.append(totop);
  onscroll();
  // placeholder
  document.querySelectorAll('.placeholder').forEach(placeholder);
  // `#` links
  document.querySelectorAll('a[href^="#"]').forEach((el) => {
    el.addEventListener('click', (e) => {
      let to = document.querySelector(e.currentTarget.getAttribute('href'));
      if (!to) return true;

      let rect = to.getBoundingClientRect();
      let win = to.ownerDocument.defaultView;

      fly((rect.top + win.pageYOffset) - 60);
      return false;
    })
  })
  // ripple
  ripple();
  // create bilibili card
  document.querySelectorAll('.bilibili-card-pre')
    .forEach(bilibili)
}

const search = (path, search_id, content_id, regex_id, case_id) => {
  document.getElementById(content_id).innerHTML = '<p class="search-failed">Preloading ...</p>';
  const randomString = () => {
    return String.fromCharCode(Math.floor(Math.random()*10000)+545155);
  }
  const htmlEncode = value => {
    let div = document.createElement('div');
        div.innerText = value;
    return div.innerHTML;
  }
  const htmlDecode = value => {
    let div = document.createElement('div');
        div.innerHTML = value;
    return div.innerText;
  }
  let fuck = randomString();
  let success = xmlResponse => {
    // get the contents from search data
    let datas = Array.from(xmlResponse.querySelectorAll('entry')).map((elem, id) => {
      let url = elem.querySelector('url') || elem.querySelector('link');
      return {
        title: elem.querySelector('title').innerHTML,
        content: elem.querySelector('content').innerHTML,
        url: url.getAttribute('href') || url.innerHTML
      };
    });
    let _input = document.getElementById(search_id);
    let _regex = document.getElementById(regex_id);
    let _case = document.getElementById(case_id);
    if (!_input || !_regex || !_case) return;
    let _resultContent = document.getElementById(content_id);
    let _fun = () => {
      let str = '<ul class="search-result-list">';                
      let keywords = _regex.checked
        ? [_input.value.trim()]
        : (_case.checked
          ? _input.value.trim().toLowerCase()
          : _input.value.trim()).split(/\s+/);
      if (_input.value.trim().length <= 0)
        return _resultContent.innerHTML = '';
      if (_regex.checked)
        try {
          let k = new RegExp(keywords[0]);
          if (k.test('') || k.test(' '))
            return _resultContent.innerHTML = '<p class="search-failed">Everything is Matched</p>';
        } catch (e) {
          return _resultContent.innerHTML = '<p class="search-failed">Regular Was Wrong</p>';
        }
      _resultContent.innerHTML = "";
      // console.log(keywords.toString()) // 正常
      let flag = 0;
      // perform local searching
      datas.forEach((data) => {
        let isMatch = false;
        let content_index = [];
        if (!data.title || data.title.trim() === '') {
          data.title = "Untitled";
        }
        let data_title = _case.checked
          ? data.title.trim().toLowerCase()
          : data.title.trim();
        let data_content = _case.checked
          ? data.content.trim().replace(/<[^>]+>/g,"").toLowerCase()
          : data.content.trim().replace(/<[^>]+>/g,"");
        data_title = htmlDecode(data_title);
        data_content = htmlDecode(data_content);
        let data_url = data.url;
        let index_title = -1;
        let index_content = -1;
        let first_occur = -1;
        // only match artiles with not empty contents
        if (data_content !== '') {
          keywords.forEach((keyword, i) => {
            if (_regex.checked) {
              let reg = new RegExp(keyword, _case.checked ? 'i' : '');
              index_title = (data_title.match(reg) || {index:-1}).index;
              index_content = (data_content.match(reg) || {index:-1}).index;
            } else {
              index_title = data_title.indexOf(keyword);
              index_content = data_content.indexOf(keyword);
            }
            if (index_title > -1 || index_content > -1) {
              isMatch = true;
              if (index_content < 0) {
                index_content = 0;
              }
              if (first_occur == -1) {
                first_occur = index_content;
              }
              // content_index.push({index_content:index_content, keyword_len:keyword_len});
            }
          });
        } else {
          isMatch = false;
        }
        // show search results
        if (isMatch) {
          flag = 1;
          str += '<li class="ripple"><a href="' + data_url + '">';
          let content = data_content;
          if (first_occur >= 0) {
            // cut out 100 characters
            let start = first_occur - 20;
            let end = first_occur + 80;
            if(start < 0){
              start = 0;
            }
            if(start == 0){
              end = 100;
            }
            if(end > content.length){
              end = content.length;
            }
            let match_content = content.substr(start, end); 
            // highlight all keywords
            let ohno = new Array();
            keywords.forEach((keyword) => {
              while (fuck.indexOf(keyword) > -1 || match_content.indexOf(fuck) > -1
                  || data_title.indexOf(fuck) > -1 || ohno.indexOf(fuck) > -1)
                fuck = randomString();
              ohno.push(fuck);
            })
            keywords.forEach((keyword, i) => {
              if (_regex.checked) {
                match_content = htmlEncode(match_content);
                data_title = htmlEncode(data_title);
                keyword = htmlEncode(keyword).replace(/&[^;]*;/g, (s) => '('+s+')');
                let regS = new RegExp(keyword, _case.checked ? "gi" : "g");
                match_content = match_content.replace(regS,
                  (s) => '<span class="search-keyword">'+s+'</span>');
                data_title = data_title.replace(regS,
                  (s) => '<span class="search-keyword">'+s+'</span>');
              } else {
                // console.log('keyword = ' + keyword)
                // console.log(match_content)
                while (match_content.indexOf(keyword) > -1)
                  match_content = match_content.replace(keyword, ohno[i]);
                // console.log(data_title)
                while (data_title.indexOf(keyword) > -1)
                  data_title = data_title.replace(keyword, ohno[i]);
                // console.log('get out')
              }
            });
            if (!_regex.checked) {
              data_title = htmlEncode(data_title);
              match_content = htmlEncode(match_content);
              keywords.forEach((keyword, i) => {
                while (match_content.indexOf(ohno[i]) > -1)
                  match_content = match_content.replace(ohno[i], (s) =>
                    '<span class="search-keyword">'+htmlEncode(keyword)+'</span>');
                while (data_title.indexOf(ohno[i]) > -1)
                  data_title = data_title.replace(ohno[i], (s) =>
                    '<span class="search-keyword">'+htmlEncode(keyword)+'</span>');
              })
            }
            str += '<p class="search-result-title">' + data_title + '</p>';
            str += '<p class="search-result">' + match_content + '...</p>';
          }
          str += "</a></li>";
        }
      });
      str += "</ul>";
      _resultContent.innerHTML = flag ? str : '<p class="search-failed">Nothing Matched</p>';
      ripple();
    }
    _input.addEventListener('input', _fun);
    _regex.addEventListener('click', _fun);
    _case.addEventListener('click', _fun);
    _resultContent.innerHTML = '';
    if (_input.value) _fun();
  }
  fetch(path)
    .then(res => res.text())
    .then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
    .then(success);
}

const counter = (res) => {
  const page_path = window.location.pathname.replace(/index\.html?$/, "");
  const elem = document.querySelector(res);
  if (!elem) return;
  elem.innerHTML = '?';
  fetch('/count?url=' + encodeURI(page_path))
  .then(res => res.json())
  .then(res => elem.innerHTML = res.data);
}

const show = (str, timeout) => {
  if (typeof str !== 'string') {
    str = str.toString();
  }
  if (typeof timeout === 'number') {
    setTimeout(show, timeout, str);
  } else {
    let title = document.createElement('p');
        title.innerHTML = str;
        title.classList.add('warning_massage');
    let T = document.createElement('div');
        T.append(title);
        T.classList.add('warning_title');
    document.body.append(T);
    T.style.opacity = 0;
    T.classList.add('show-fade-in-5');
    setTimeout(() => {
      T.style.opacity = .5;
      T.classList.remove('show-fade-in-5');
      T.classList.add('show-fade-out');
      setTimeout(() => {
        T.remove();
      }, 500);
    }, 2500);
  }
}

export {
  prepare,
  counter,
  search,
  fly,
  show,
  onscroll,
};
