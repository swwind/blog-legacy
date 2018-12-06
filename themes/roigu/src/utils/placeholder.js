'use strict';

const placeholder = (el) => {
  let k = document.createElement('div');
      k.classList.add('placeholder-massage');
      k.innerHTML = el.innerHTML;
  el.innerHTML = '';
  el.append(k);
  let nxt = el.nextElementSibling;
  nxt.onfocus = () => {
    k.classList.add('placeholder-focus');
  }
  nxt.onblur = () => {
    if (!nxt.value) {
      k.classList.remove('placeholder-focus');
    }
  }
}

export default placeholder;
