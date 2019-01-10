'use strict';

var header = document.querySelector('.header');
var logo = header.querySelector('.logo');
var logoTitle = logo.querySelector('.logo__title');
var search = header.querySelector('.search');
var searchIcon = search.querySelector('.search__icon');
var searchField = search.querySelector('.search__field');
var searchSubmit = search.querySelector('.search__button');
var navButton = header.querySelector('.main-nav__toggle');
var mainNav = header.querySelector('.main-nav__list');
var siteNav = header.querySelector('.site-nav');
var citiesWrapper = header.querySelector('.contacts__cities-wrapper');
var activeCity = citiesWrapper.querySelector('.contacts__active');
var citiesList = citiesWrapper.querySelector('.contacts__cities');
var citiesHeader = citiesList.querySelectorAll('.contacts__city');
var sidebar = document.querySelector('.sidebar');
var categoryCompressor = document.querySelector('.categories__item--compressor  .categories__link');
var categoryDehydrator = document.querySelector('.categories__item--dehydrator  .categories__link');
var categoryPneumotool = document.querySelector('.categories__item--pneumotool  .categories__link');
var categoryPump = document.querySelector('.categories__item--pump  .categories__link');
var categoryPowerstation = document.querySelector('.categories__item--powerstation  .categories__link');
var filterHeadings = document.querySelectorAll('.filter__heading');
var filterBlocks = document.querySelectorAll('.filter__block');
var filterCaptions = document.querySelectorAll('.filter__caption');
var filterSelects = document.querySelectorAll('.filter__select');
var citiesFooter = document.querySelectorAll('.footer__city');
var addressesFooter = document.querySelectorAll('.footer__address');

var navButtonClickHandler = function () {
  if (window.matchMedia('(max-width: 1519px)').matches) {
    if (navButton.classList.contains('main-nav__toggle--closed')) {
      document.body.classList.add('no-scroll');
      header.classList.add('header--fixed');

      logo.classList.remove('logo--opened');
      logo.classList.add('logo--closed');

      search.classList.remove('search--closed');
      mainNav.classList.remove('main-nav__list--closed');
      siteNav.classList.remove('site-nav--closed');

      navButton.classList.remove('main-nav__toggle--closed');
      navButton.classList.add('main-nav__toggle--opened');

      sidebar.classList.add('sidebar--closed');
    } else {
      document.body.classList.remove('no-scroll');
      header.classList.remove('header--fixed');

      logo.classList.remove('logo--closed');
      logo.classList.add('logo--opened');

      search.classList.add('search--closed');
      mainNav.classList.add('main-nav__list--closed');
      siteNav.classList.add('site-nav--closed');

      navButton.classList.remove('main-nav__toggle--opened');
      navButton.classList.add('main-nav__toggle--closed');

      sidebar.classList.remove('sidebar--closed');
    }
  } else {
    navButton.classList.remove('main-nav__toggle--opened');
    navButton.classList.add('main-nav__toggle--closed');
    mainNav.classList.remove('main-nav__list--closed');
    searchSubmit.classList.add('search__button--closed');
    searchField.addEventListener('click', searchFieldClickHandler);
    document.removeEventListener('click', searchFieldCloseHandler);
  }
};

var searchFieldClickHandler = function () {
  navButton.classList.remove('main-nav__toggle--closed');
  navButton.classList.add('main-nav__toggle--opened');
  mainNav.classList.add('main-nav__list--closed');
  searchSubmit.classList.remove('search__button--closed');
  searchField.removeEventListener('click', searchFieldClickHandler);
};

var searchIconClickHandler = function () {
  logoTitle.classList.add('logo__title--closed');
  navButton.classList.remove('main-nav__toggle--closed');
  navButton.classList.add('main-nav__toggle--opened');
  mainNav.classList.add('main-nav__list--closed');
  searchField.classList.remove('search__field--closed');
  searchField.focus();
  document.addEventListener('click', searchFieldCloseHandler);
  navButton.addEventListener('click', navButtonClickHandler);
  searchIcon.removeEventListener('click', searchIconClickHandler);
};

var searchFieldCloseHandler = function (evt) {
  if (evt.target !== searchField && evt.target !== searchIcon && evt.target !== searchSubmit && evt.target !== navButton) {
    logoTitle.classList.remove('logo__title--closed');
    navButton.classList.remove('main-nav__toggle--opened');
    navButton.classList.add('main-nav__toggle--closed');
    mainNav.classList.remove('main-nav__list--closed');
    searchField.classList.add('search__field--closed');
    searchIcon.addEventListener('click', searchIconClickHandler);
    document.removeEventListener('click', searchFieldCloseHandler);
    evt.preventDefault();
  }
};

var windowResizeHandler = function () {
  logoTitle.classList.remove('logo__title--closed');

  if (window.matchMedia('(max-width: 1519px)').matches) {
    searchIcon.removeEventListener('click', searchIconClickHandler);
    searchField.placeholder = 'Поиск';
    searchField.classList.remove('search__field--closed');

    if (navButton.classList.contains('main-nav__toggle--closed')) {
      mainNav.classList.add('main-nav__list--closed');
    }
    categoryCompressor.textContent = 'Компрессоры';
    categoryDehydrator.textContent = 'Осушители';
    categoryPump.textContent = 'Насосы';
    categoryPowerstation.textContent = 'Электростанции';
  } else {
    searchField.placeholder = 'Поиск товаров и услуг';
    searchField.classList.add('search__field--closed');

    var categoryCompressorSubitems = categoryCompressor.parentElement.querySelectorAll('.categories__subitem').length;
    var categoryDehydratorSubitems = categoryDehydrator.parentElement.querySelectorAll('.categories__subitem').length;
    var categoryPneumotoolSubitems = categoryPneumotool.parentElement.querySelectorAll('.categories__subitem').length;
    var categoryPumpSubitems = categoryPump.parentElement.querySelectorAll('.categories__subitem').length;
    var categoryPowerstationSubitems = categoryPowerstation.parentElement.querySelectorAll('.categories__subitem').length;

    categoryCompressor.innerHTML = 'Компрессорное оборудование<sup class="categories__number">' + categoryCompressorSubitems + '</sup>';

    categoryDehydrator.innerHTML = 'Адсорбционные осушители<sup class="categories__number">' + categoryDehydratorSubitems + '</sup>';

    categoryPneumotool.innerHTML = 'Пневмоинструмент<sup class="categories__number">' + categoryPneumotoolSubitems + '</sup>';

    categoryPump.innerHTML = 'Вакуумные насосы<sup class="categories__number">' + categoryPumpSubitems + '</sup>';

    categoryPowerstation.innerHTML = 'Автономные электростанции<sup class="categories__number">' + categoryPowerstationSubitems + '</sup>';

    document.body.classList.remove('no-scroll');
    header.classList.remove('header--fixed');

    logo.classList.remove('logo--closed');
    logo.classList.add('logo--opened');

    search.classList.add('search--closed');
    mainNav.classList.remove('main-nav__list--closed');
    siteNav.classList.add('site-nav--closed');

    navButton.classList.remove('main-nav__toggle--opened');
    navButton.classList.add('main-nav__toggle--closed');

    sidebar.classList.remove('sidebar--closed');

    searchIcon.addEventListener('click', searchIconClickHandler);
  }
};

var searchFieldInputHandler = function () {
  var searchErrorMessage = '';

  if (searchField.validity.valueMissing) {
    searchErrorMessage = 'Введите текст запроса.';
  }

  searchField.setCustomValidity(searchErrorMessage);
};

var citiesHeaderClickHandler = function (evt) {
  activeCity.textContent = evt.target.textContent;
  citiesList.classList.remove('contacts__cities--opened');
  citiesHeader.forEach(function (it) {
    it.removeEventListener('click', citiesHeaderClickHandler);
  });
};

var citiesListCloseHandler = function (evt) {
  if (!evt.target.classList.contains('contacts__city') && evt.target !== activeCity) {
    citiesList.classList.remove('contacts__cities--opened');
    document.removeEventListener('click', citiesListCloseHandler);
  }
};

var citiesFooterClickHandler = function (city, address) {
  city.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (!city.classList.contains('footer__city--active')) {
      citiesFooter.forEach(function (it) {
        it.classList.remove('footer__city--active');
      });
      addressesFooter.forEach(function (it) {
        it.classList.remove('footer__address--active');
      });

      city.classList.add('footer__city--active');
      address.classList.add('footer__address--active');
    }
  });
};

var windowScrollHandler = function () {
  if (!window.matchMedia('(max-width: 1519px)').matches) {
    if (window.pageYOffset > 0) {
      logoTitle.classList.add('logo__title--closed');
      navButton.classList.remove('main-nav__toggle--closed');
      navButton.classList.add('main-nav__toggle--opened');
      mainNav.classList.add('main-nav__list--closed');
      searchField.classList.remove('search__field--closed');
      // searchSubmit.classList.add('search__button--closed');
    } else {
      // logoTitle.classList.remove('logo__title--closed');
      navButton.classList.remove('main-nav__toggle--opened');
      navButton.classList.add('main-nav__toggle--closed');
      mainNav.classList.remove('main-nav__list--closed');
      searchField.classList.add('search__field--closed');
      searchSubmit.classList.remove('search__button--closed');
    }
  }
};

var filterHeadingsClickHandler = function (heading, block) {
  heading.addEventListener('click', function () {
    if (block.classList.contains('filter__block--opened')) {
      block.classList.remove('filter__block--opened');
    } else {
      block.classList.add('filter__block--opened');
    }
  });
};

var filterCapionsClickHandler = function (caption, select) {
  caption.addEventListener('click', function () {
    // debugger
    if (select.classList.contains('filter__select--opened')) {
      select.classList.remove('filter__select--opened');
    } else {
      select.classList.add('filter__select--opened');
    }
  });
};

document.addEventListener('DOMContentLoaded', function () {
  navButton.addEventListener('click', navButtonClickHandler);

  windowResizeHandler();
  window.addEventListener('resize', windowResizeHandler);

  window.addEventListener('scroll', windowScrollHandler);

  activeCity.addEventListener('click', function () {
    var currentCity = activeCity.textContent;

    citiesHeader.forEach(function (it) {
      if (it.textContent === currentCity) {
        citiesList.insertBefore(it, citiesList.firstChild);
      }
    });

    citiesList.classList.add('contacts__cities--opened');


    for (var i = 0; i < citiesHeader.length; i++) {
      citiesHeader[i].addEventListener('click', citiesHeaderClickHandler);
    }

    document.addEventListener('click', citiesListCloseHandler);
  });

  searchField.addEventListener('input', searchFieldInputHandler);
  searchSubmit.addEventListener('click', function (evt) {
    if (searchField.validity.valueMissing) {
      searchField.setCustomValidity('Введите текст запроса.');
    } else {
      search.submit();
      evt.preventDefault();
    }
  });

  for (var i = 0; i < filterHeadings.length; i++) {
    filterHeadingsClickHandler(filterHeadings[i], filterBlocks[i]);
  }

  for (i = 0; i < filterCaptions.length; i++) {
    filterCapionsClickHandler(filterCaptions[i], filterSelects[i]);
  }

  for (i = 0; i < citiesFooter.length; i++) {
    citiesFooterClickHandler(citiesFooter[i], addressesFooter[i]);
  }
});

/* eslint-disable */
$(document).ready(function () {
  $('.banner__slides').on('init reInit afterChange', function(event, slick, currentSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.banner__controls .controls__number--active').text('0' + i);
    $('.banner__controls .controls__number--last').text('0' + slick.slideCount);

    $('.banner__controls .controls__timeline').css({
      height: '0'
    }).stop().animate({
      height: '100%'
    }, 10000);

    if (i === 1) {
      $('.banner__controls .controls__button--previous').prop('disabled',true);
    } else if (i === slick.slideCount) {
      $('.banner__controls .controls__button--next').prop('disabled',true);
    } else {
      $('.banner__controls .controls__button--previous').prop('disabled',false);
      $('.banner__controls .controls__button--next').prop('disabled',false);
    }
  });

  $('.banner__slides').slick({
    dots: false,
    arrows: true,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 10000,
    speed: 500,
    pauseOnHover: false,
    variableWidth: true,
    appendArrows: $('.banner__controls'),
    prevArrow: $('.banner__controls .controls__button--previous'),
    nextArrow: $('.banner__controls .controls__button--next'),
    responsive: [
      {
        breakpoint: 1520,
        settings: {
          dots: true,
          arrows: false,
          variableWidth: false,
        }
      }
    ]
  });

  $('.clients__list').slick({
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 10000,
    speed: 500,
    pauseOnHover: false,
    slidesToShow: 4,
    variableWidth: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: false
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          centerMode: false
        }
      },
      {
        breakpoint: 940,
        settings: {
          slidesToShow: 3,
          centerMode: false
        }
      },
      {
        breakpoint: 1200,
        settings: {
          centerMode: false
        }
      }
    ]
  });

  $(window).on("load resize", function(){
    var width = $(document).width();

    if (width >= 1520) {
      $('.news__notes.slick-initialized').slick('unslick');
    } else {
      if (!document.querySelector('.news__notes').classList.contains('slick-initialized')) {
        $('.news__notes').slick({
          dots: true,
          arrows: false,
          infinite: false,
          adaptiveHeight: true
        });
      }
    }
  });

  $(window).scroll(function() {
    if ($(document).width() >= 1520)
    if($(this).scrollTop() !== 0) {
      $('.upward').fadeIn();
    } else {
      $('.upward').fadeOut();
    }
  });

  $('.upward').click(function() {
    $('body,html').animate({scrollTop:0},500);
  });

  $('.industry .slider__items').on('init reInit afterChange', function(event, slick, currentSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.industry__controls .controls__number--active').text('0' + i);
    $('.industry__controls .controls__number--last').text('0' + slick.slideCount);

    $('.industry__controls .controls__timeline').css({
      width: '0'
    }).stop().animate({
      width: '100%'
    }, 10000);

    if (i === 1) {
      $('.industry__controls .controls__button--previous').prop('disabled',true);
    } else if (i === slick.slideCount) {
      $('.industry__controls .controls__button--next').prop('disabled',true);
    } else {
      $('.industry__controls .controls__button--previous').prop('disabled',false);
      $('.industry__controls .controls__button--next').prop('disabled',false);
    }
  });

  $('.industry .slider__items').slick({
    dots: false,
    arrows: true,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    speed: 500,
    pauseOnHover: false,
    variableWidth: true,
    draggable: false,
    appendArrows: $('.industry__controls'),
    prevArrow: $('.industry__controls .controls__button--previous'),
    nextArrow: $('.industry__controls .controls__button--next'),
    responsive: [
      {
        breakpoint: 530,
        settings: {
          draggable: true,
        }
      },
      {
        breakpoint: 790,
        settings: {
          draggable: true,
        }
      }
    ]
  });

  $('.projects .slider__items').slick({
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: false,
    speed: 500,
    slidesToShow: 1,
    variableWidth: true,
    draggable: false,
    appendArrows: $('.projects__controls'),
    prevArrow: $('.projects__controls .controls__button--previous'),
    nextArrow: $('.projects__controls .controls__button--next')
  });
});

/* eslint-enable */
