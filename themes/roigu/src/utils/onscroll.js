'use strict';

const onscroll = () => {
  let oScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let wi = window.innerHeight / 2;
  let totop = document.querySelector('.totop');
  let header = document.querySelector('header');
  if (totop) {
    totop.classList[oScrollTop > wi ? 'add' : 'remove']('totop-show');
  }
  if (header) {
    header.classList[oScrollTop ? 'add' : 'remove']('header-fixed');
  }
}

export default onscroll;
