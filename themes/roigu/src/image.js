'use strict';

const image = (url, el) => {
  if (typeof window.fetch === 'undefined')
    return new Error('Error: `window.fetch` is not recognized as a function');
  fetch(url, {
    method: 'GET',
    referrerPolicy: 'no-referrer'
  }).then(x => x.blob()).then(x => {
    if (/^image\/.*$/.test(x.type)) {
      el.src = URL.createObjectURL(x);
    }
  });
}

export default image;
