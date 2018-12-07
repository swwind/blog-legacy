'use strict';

import {
  prepare,
  counter,
  search,
  fly,
  show,
  onscroll,
} from './utils/prepare.js';

import valine from './utils/valine';

window.searchFunc = search;
window.show = show;
window.onscroll = onscroll;
window.onresize = onscroll;
window.requestReadTimes = counter;
window.fly = fly;

window.valine = valine;

document.addEventListener('DOMContentLoaded', prepare);
