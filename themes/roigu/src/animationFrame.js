'use strict';

let last = 0;

export const requestAnimationFrame = (callback) => {
  let now = new Date().getTime();
  let nxt = Math.max(0, 16.7 - (now - last));
  let x = setTimeout(callback, nxt, now + nxt);
  last = now + nxt;
  return x;
}

export const cancelAnimationFrame = clearTimeout;
