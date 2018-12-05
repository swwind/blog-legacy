'use strict';

import search from './search.js';
import show from './show.js';
import onscroll from './onscroll.js';
import counter from './counter.js';
import { noBaiduFadeIn, noBaiduFadeOut } from './noBaidu.js';
import fly from './fly.js';
import prepare from './prepare.js';

window.searchFunc = search;
window.show = show;
window.onscroll = onscroll;
window.onresize = onscroll;
window.requestReadTimes = counter;
window.noBaiduFadeIn = noBaiduFadeIn;
window.noBaiduFadeOut = noBaiduFadeOut;
window.fly = fly;

document.addEventListener('DOMContentLoaded', prepare);
