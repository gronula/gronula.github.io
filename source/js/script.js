var navMain = document.querySelector('.main-nav__list');
var navToggle = document.querySelector('.main-nav__toggle');
var wasLabel = document.querySelector('.example__was');
var nowLabel = document.querySelector('.example__now');

navMain.classList.remove('main-nav__list--nojs');
navToggle.classList.remove('main-nav__toggle--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav__list--closed')) {
    navMain.classList.remove('main-nav__list--closed');
    navMain.classList.add('main-nav__list--opened');
    navToggle.classList.remove('main-nav__toggle--closed');
    navToggle.classList.add('main-nav__toggle--opened');
  } else {
    navMain.classList.add('main-nav__list--closed');
    navMain.classList.remove('main-nav__list--opened');
    navToggle.classList.add('main-nav__toggle--closed');
    navToggle.classList.remove('main-nav__toggle--opened');
  }
});

if (window.matchMedia('(min-width: 768px)').matches && document.body.contains(wasLabel || nowLabel)) {
  wasLabel.removeAttribute('checked');
}

window.addEventListener('resize', function () {
  if (window.matchMedia('(max-width: 767px)').matches && document.body.contains(wasLabel || nowLabel)) {
    wasLabel.setAttribute('checked', 'checked');
  } else if (window.matchMedia('(min-width: 768px)').matches && document.body.contains(wasLabel || nowLabel)) {
    wasLabel.removeAttribute('checked');
  }
});
