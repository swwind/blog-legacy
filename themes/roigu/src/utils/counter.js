'use strict';

const counter = (res) => {
  const page_path = window.location.pathname.replace(/index\.html?$/, "");
  const elem = document.querySelector(res);
  if (!elem) return;
  elem.innerHTML = '?';
  const formData = new FormData();
  formData.append('link', page_path);
  fetch('https://mc.swwind.me/count/', {
    method: 'POST',
    body: formData,
    mode: "no-cors"
  })
  .then(res => res.json())
  .then(res => elem.innerHTML = res.data);
}

export default counter;
