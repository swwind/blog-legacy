'use strict';

const show = (str, timeout) => {
  if (typeof str !== 'string') {
    str = str.toString();
  }
  if (typeof timeout === 'number') {
    setTimeout(show, timeout, str);
  } else {
    let title = document.createElement('p');
        title.innerHTML = str;
        title.classList.add('warning_massage');
    let T = document.createElement('div');
        T.append(title);
        T.classList.add('warning_title');
    document.body.append(T);
    T.style.opacity = 0;
    T.classList.add('show-fade-in-5');
    setTimeout(() => {
      T.style.opacity = .5;
      T.classList.remove('show-fade-in-5');
      T.classList.add('show-fade-out');
      setTimeout(() => {
        T.remove();
      }, 500);
    }, 2500);
  }
}

export default show;
