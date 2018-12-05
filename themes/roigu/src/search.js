'use strict';

import ripple from './ripple.js';

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

export default search;
