'use strict';

import search from './utils/search.js';
import show from './utils/show.js';
import onscroll from './utils/onscroll.js';
import counter from './utils/counter.js';
import fly from './utils/fly.js';
import prepare from './utils/prepare.js';

window.searchFunc = search;
window.show = show;
window.onscroll = onscroll;
window.onresize = onscroll;
window.requestReadTimes = counter;
window.fly = fly;

document.addEventListener('DOMContentLoaded', prepare);
