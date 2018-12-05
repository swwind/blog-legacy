'use strict';

import fly from './fly.js';
import ripple from './ripple.js';
import bilibili from './bilibili.js';
import onscroll from './onscroll.js';
import placeholder from './placeholder.js';

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

export default prepare;
