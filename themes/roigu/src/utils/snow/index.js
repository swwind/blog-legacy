'use strict';

const now = new Date();
const isCristmas = now.getMonth() === 11 && now.getDay() === 25;

const snowList = new Set();

const createSnow = (init = false) => {
  const s = document.createElement('div');
  s.classList.add('snow');
  s.style.transform = `scale(${Math.random() + 1})`;
  s.style.left = Math.random() * window.innerWidth  + 'px';
  s.style.top  = init ? Math.random() * window.innerHeight + 'px' : '-40px';
  s.setAttribute('data-vx', Math.random() + 1);
  s.setAttribute('data-vy', Math.random());
  return s;
}

const putSnow = (init) => {
  const s = createSnow(init);
  snowList.add(s);
  document.body.appendChild(s);
}

const snow = () => {

  for (let i = 1; i <= 50; ++ i) {
    putSnow(true);
  }

  const render = () => {
    snowList.forEach((item) => {
      const vx = 5 * item.getAttribute('data-vx');
      const vy = 2 * item.getAttribute('data-vy');
      const x = parseFloat(item.style.top );
      const y = parseFloat(item.style.left);
      if (x > window.innerHeight) {
        item.remove();
        snowList.delete(item);
        putSnow();
      } else {
        item.style.top  = x + vx + 'px';
        item.style.left = y - vy + 'px';
      }
    });
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

}

module.exports = snow;
