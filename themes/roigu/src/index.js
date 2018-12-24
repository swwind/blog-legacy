'use strict';

import { prepare, search, fly, show, onscroll } from './utils/prepare.js';

import valine from './utils/valine';

window.search = search;
window.show = show;
window.onscroll = onscroll;
window.onresize = onscroll;
window.fly = fly;

window.valine = valine;

document.addEventListener('DOMContentLoaded', prepare);
