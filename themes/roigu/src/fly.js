'use strict';

import { requestAnimationFrame } from './animationFrame.js';

const setScrollTop = (top) => {
  document.body.scrollTop = top; // For Safari
  document.documentElement.scrollTop = top; // For Chrome, Firefox, IE and Opera
}
const fly = (pos, time, timefn) => {
  time = time || 500;
  // easy-in-out => x^2/(x^2+(1-x)^2)
  timefn = timefn || (x => x*x / (x*x + (1-x)*(1-x)));
  let last = new Date().getTime();
  let lastpos = document.documentElement.scrollTop || document.body.scrollTop;
  let fn = (now) => {
    now = new Date().getTime() - last;
    if (now < time) {
      let nowpos = (pos - lastpos) * timefn(now / time) + lastpos;
      setScrollTop(nowpos);
      requestAnimationFrame(fn);
    } else {
      setScrollTop(pos);
    }
  }
  requestAnimationFrame(fn);
}

export default fly;
