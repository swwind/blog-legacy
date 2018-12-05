'use strict';

export const noBaiduFadeIn = () => {
  let elem = document.getElementById('nobaidu_dlg');
  elem.style.display = 'block';
  elem.style.opacity = 0;
  elem.classList.add('show-fade-in');
  setTimeout(() => {
    elem.style.opacity = 1;
    elem.classList.remove('show-fade-in');
  }, 500);
}

export const noBaiduFadeOut = () => {
  let elem = document.getElementById('nobaidu_dlg');
  elem.classList.add('show-fade-out');
  setTimeout(() => {
    elem.style.display = 'none';
    elem.classList.remove('show-fade-out');
  }, 500);
}

