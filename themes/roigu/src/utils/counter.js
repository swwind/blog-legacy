'use strict';

const counter = (res) => {
  const page_path = window.location.pathname.replace(/index\.html?$/, "");
  const elem = document.querySelector(res);
  if (!elem) return;
  elem.innerHTML = '?';
  fetch('https://mc.swwind.me/count?link=' + encodeURI(page_path))
  .then(res => res.json())
  .then(res => elem.innerHTML = res.data);
}

export default counter;
