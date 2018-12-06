'use strict';

import {
  prepare,
  counter,
  search,
  fly,
  show,
  onscroll,
} from './utils/prepare.js';

window.searchFunc = search;
window.show = show;
window.onscroll = onscroll;
window.onresize = onscroll;
window.requestReadTimes = counter;
window.fly = fly;

document.addEventListener('DOMContentLoaded', prepare);
