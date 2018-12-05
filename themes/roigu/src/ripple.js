'use strict';

const ripple = () => {
  document.querySelectorAll('.ripple').forEach(elem => {
    elem.onmousedown = (event) => {
      let rect = elem.getBoundingClientRect();
      let win = elem.ownerDocument.defaultView;

      let size = elem.offsetWidth;
      let st = document.documentElement.scrollTop || document.body.scrollTop;
      let x = event.clientX - (rect.left + win.pageXOffset);
      let y = event.clientY - (rect.top + win.pageYOffset - st);
      let obj = document.createElement('span');
          obj.classList.add('ripple-span');
          obj.style.height = size + 'px';
          obj.style.width = size + 'px';
          obj.style.left = x + 'px';
          obj.style.top = y + 'px';
      elem.append(obj);
      setTimeout(() => {
        obj.remove();
      }, 1000);
    }
  })
}

export default ripple;
