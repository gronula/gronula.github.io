'use strict';

var header = document.querySelector('.header');
var logo = header.querySelector('.logo');
var logoTitle = logo.querySelector('.logo__title');
var search = header.querySelector('.search');
var searchIcon = search.querySelector('.search__icon');
var searchField = search.querySelector('.search__field');
var searchSubmit = search.querySelector('.search__button');
var navButton = header.querySelector('.main-nav__toggle');
var mainNav = header.querySelector('.main-nav');
var mainNavList = mainNav.querySelector('.main-nav__list');
var siteNav = header.querySelector('.site-nav');
var contacts = header.querySelector('.contacts');
var citiesWrapper = contacts.querySelector('.contacts__cities-wrapper');
var activeCity = citiesWrapper.querySelector('.contacts__active');
var citiesList = citiesWrapper.querySelector('.contacts__cities');
var citiesHeader = citiesList.querySelectorAll('.contacts__city');
var main = document.querySelector('.main');
var sidebar = main.querySelector('.sidebar');
var categoryCompressor = main.querySelector('.categories__item--compressor  .categories__link');
var categoryDehydrator = main.querySelector('.categories__item--dehydrator  .categories__link');
var categoryPneumotool = main.querySelector('.categories__item--pneumotool  .categories__link');
var categoryPump = main.querySelector('.categories__item--pump  .categories__link');
var categoryPowerstation = main.querySelector('.categories__item--powerstation  .categories__link');
var upwardButton = main.querySelector('.upward');
var filterLinks = main.querySelectorAll('.filter__link');
var filterForms = main.querySelectorAll('.filter__form');
var filterCaptions = main.querySelectorAll('.filter__caption');
var filterSelects = main.querySelectorAll('.filter__select');
var filterPreview = main.querySelectorAll('.filter__preview');
var footer = document.querySelector('.footer');
var citiesFooter = footer.querySelectorAll('.footer__city');
var addressesFooter = footer.querySelectorAll('.footer__address');
var footerAuthor = footer.querySelector('.footer__policy + .footer__copyrights');
var searchFieldWidth = 100;
var mainNavWidth = 240;

var navButtonClickHandler = function () {
  if (window.matchMedia('(max-width: 1023px)').matches) {
    if (navButton.classList.contains('main-nav__toggle--closed')) {
      document.body.classList.add('no-scroll');
      header.classList.add('header--fixed');

      logo.classList.remove('logo--opened');
      logo.classList.add('logo--closed');

      search.classList.remove('search--closed');
      mainNavList.classList.remove('main-nav__list--closed');
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
      mainNavList.classList.add('main-nav__list--closed');
      siteNav.classList.add('site-nav--closed');

      navButton.classList.remove('main-nav__toggle--opened');
      navButton.classList.add('main-nav__toggle--closed');

      sidebar.classList.remove('sidebar--closed');
    }
  } else {
    if (navButton.classList.contains('main-nav__toggle--opened')) {
      document.addEventListener('click', mainNavListCloseHandler);
      navButton.classList.remove('main-nav__toggle--opened');
      mainNavList.classList.remove('main-nav__list--closed');
      mainNavList.classList.remove('main-nav__list--hidden');
      mainNavList.classList.add('main-nav__list--fixed');
    } else {
      navButton.classList.add('main-nav__toggle--opened');
      mainNavList.classList.add('main-nav__list--closed');
      mainNavList.classList.add('main-nav__list--hidden');
      mainNavList.classList.remove('main-nav__list--fixed');
    }
  }
};

var mainNavListCloseHandler = function (evt) {
  if (!window.matchMedia('(max-width: 1023px)').matches && evt.target !== navButton) {
    navButton.classList.add('main-nav__toggle--opened');
    mainNavList.classList.add('main-nav__list--closed');
    mainNavList.classList.add('main-nav__list--hidden');
    mainNavList.classList.remove('main-nav__list--fixed');
    document.removeEventListener('click', mainNavListCloseHandler);
  }
};

var searchFieldFocusHandler = function () {
  if (!navButton.classList.contains('main-nav__toggle--opened') &&
      !mainNavList.classList.contains('main-nav__list--fixed') &&
      !siteNav.classList.contains('site-nav--closed')) {
    mainNav.style.transition = 'all 0.5s cubic-bezier(0.77, 0, 0.175, 1)';
    mainNav.style.width = '';
    mainNav.classList.add('main-nav--closed');
    searchField.removeEventListener('click', searchFieldFocusHandler);
    searchField.classList.remove('search__field--closed');
    searchField.style.transition = 'all 0.5s cubic-bezier(0.77, 0, 0.175, 1)';
    searchField.style.width = searchFieldWidth + 'px';
  }

  if (!window.matchMedia('(max-width: 1023px)').matches) {
    searchIcon.classList.add('search__icon--opened');
    searchField.placeholder = 'Поиск';
  }
};

var searchFieldBlurHandler = function () {
  if (navButton.classList.contains('main-nav__toggle--closed')) {
    searchField.removeEventListener('click', searchFieldBlurHandler);
    searchField.classList.add('search__field--closed');
    searchField.style.width = '';
    mainNav.style.width = mainNavWidth + 'px';
    mainNav.classList.remove('main-nav--closed');
    setTimeout(function () {
    }, 500);
  }

  if (!window.matchMedia('(max-width: 1023px)').matches) {
    searchIcon.classList.remove('search__icon--opened');
    searchField.placeholder = 'Поиск товаров и услуг';
  }
};

var getSearchInputWidth = function () {
  if (pageYOffset === 0) {
    mainNav.style.transition = '';
    mainNav.style.width = '';
    mainNavWidth = mainNav.getBoundingClientRect().width;
    mainNav.style.width = 0;
    searchField.style.transition = '';
    searchField.style.width = '100%';
    searchFieldWidth = searchField.getBoundingClientRect().width;
    searchField.classList.add('search__field--closed');
    searchField.style.width = '';
    mainNav.style.width = mainNavWidth + 'px';
    mainNav.classList.remove('main-nav--closed');
  } else {
    mainNav.style.width = '';
    searchField.style.width = '';
  }

  setTimeout(function () {
  }, 500);
};

var windowResizeHandler = function () {
  if (window.matchMedia('(max-width: 1023px)').matches) {
    logoTitle.classList.remove('logo__title--closed');
    searchField.placeholder = 'Поиск';

    if (navButton.classList.contains('main-nav__toggle--opened') && logo.classList.contains('logo--opened')) {
      navButton.classList.remove('main-nav__toggle--opened');
      navButton.classList.add('main-nav__toggle--closed');
    }

    if (mainNavList.classList.contains('main-nav__list--fixed')) {
      mainNavList.classList.remove('main-nav__list--fixed');
      mainNavList.classList.add('main-nav__list--closed');
      navButton.classList.add('main-nav__toggle--closed');
      siteNav.classList.add('site-nav--closed');
      search.classList.add('search--closed');
    } else if (navButton.classList.contains('main-nav__toggle--closed')) {
      mainNavList.classList.add('main-nav__list--closed');
      siteNav.classList.add('site-nav--closed');
      search.classList.add('search--closed');
    }

    categoryCompressor.textContent = 'Компрессоры';
    categoryDehydrator.textContent = 'Осушители';
    categoryPump.textContent = 'Насосы';
    categoryPowerstation.textContent = 'Электростанции';
  } else {
    if (!mainNavList.classList.contains('main-nav__list--fixed')) {
      windowScrollHandler();

      document.body.classList.remove('no-scroll');
      header.classList.remove('header--fixed');
      header.classList.remove('header--closed');

      logo.classList.remove('logo--closed');
      logo.classList.add('logo--opened');
      logoTitle.classList.remove('logo__title--closed');

      search.classList.add('search--closed');
      searchField.placeholder = 'Поиск товаров и услуг';
      searchField.classList.add('search__field--closed');

      mainNavList.classList.remove('main-nav__list--closed');
      siteNav.classList.remove('site-nav--closed');

      navButton.classList.remove('main-nav__toggle--opened');
      navButton.classList.add('main-nav__toggle--closed');

      contacts.classList.remove('contacts--closed');

      sidebar.classList.remove('sidebar--closed');

      searchField.addEventListener('focus', searchFieldFocusHandler);
      searchField.addEventListener('blur', searchFieldBlurHandler);

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
    }
  }
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

var scrollTop = document.body.getBoundingClientRect().top;

var windowScrollHandler = function () {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    searchField.blur();
    searchField.style.transition = 'border-bottom 0.5s cubic-bezier(0.77, 0, 0.175, 1)';

    var newScrollTop = document.body.getBoundingClientRect().top;

    var bodyHeight = document.body.offsetHeight;
    var footerHeight = footer.getBoundingClientRect().height;
    var footerTop = bodyHeight - innerHeight - footerHeight;
    var footerAuthorHeight = footerAuthor.getBoundingClientRect().height;
    var footerAuthorTop = bodyHeight - footerAuthorHeight;
    var upwardButtonTop = footerAuthorTop - upwardButton.getBoundingClientRect().height - 28;

    if (footerTop < window.pageYOffset) {
      sidebar.style.position = 'absolute';
      sidebar.style.top = footerTop + 'px';
    } else {
      sidebar.style.position = '';
      sidebar.style.top = '';
    }

    if (footerAuthorTop < window.pageYOffset + innerHeight) {
      upwardButton.style.position = 'absolute';
      upwardButton.style.top = upwardButtonTop + 'px';
    } else {
      upwardButton.style.position = '';
      upwardButton.style.top = '';
    }

    if (scrollTop > newScrollTop) {
      header.classList.add('header--closed');
      main.classList.remove('main--full');
    } else {
      if (pageYOffset > 115) {
        header.classList.remove('header--closed');
        logoTitle.classList.add('logo__title--closed');
        mainNavList.classList.add('main-nav__list--closed');
        mainNavList.classList.add('main-nav__list--hidden');
        navButton.classList.remove('main-nav__toggle--closed');
        navButton.classList.add('main-nav__toggle--opened');
        siteNav.classList.add('site-nav--closed');
        contacts.classList.add('contacts--closed');
        searchField.classList.remove('search__field--closed');
      } else {
        header.classList.remove('header--closed');
        logoTitle.classList.remove('logo__title--closed');
        mainNavList.classList.remove('main-nav__list--closed');
        mainNavList.classList.remove('main-nav__list--hidden');
        mainNavList.classList.remove('main-nav__list--fixed');
        navButton.classList.add('main-nav__toggle--closed');
        navButton.classList.remove('main-nav__toggle--opened');
        siteNav.classList.remove('site-nav--closed');
        contacts.classList.remove('contacts--closed');
        searchField.classList.add('search__field--closed');
        main.classList.add('main--full');
        document.removeEventListener('click', mainNavListCloseHandler);
      }
    }

    scrollTop = newScrollTop;

    getSearchInputWidth();
  }
};

var filterLinksClickHandler = function (link, form) {
  link.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (!link.classList.contains('filter__link--active')) {
      filterLinks.forEach(function (it) {
        it.classList.remove('filter__link--active');
      });
      link.classList.add('filter__link--active');

      filterForms.forEach(function (it) {
        it.classList.remove('filter__form--active');
      });
      form.classList.add('filter__form--active');
    }
  });
};

var getBlockHeight = function (form) {
  form.classList.add('filter__form--active');

  var headings = form.querySelectorAll('.filter__main  .filter__heading');
  var blocks = form.querySelectorAll('.filter__block');

  for (var i = 0; i < headings.length; i++) {
    blocks[i].classList.add('filter__block--opened');
    var blockHeight = blocks[i].getBoundingClientRect().height;
    blocks[i].classList.remove('filter__block--opened');

    filterHeadingsClickHandler(form, headings, blocks, blockHeight, i);
  }

  form.classList.remove('filter__form--active');
};

/* eslint-disable */
var filterHeadingsClickHandler = function (form, headings, blocks, blockHeight, i) {
  headings[i].addEventListener('click', function () {
    if (blocks[i].classList.contains('filter__block--opened')) {
      var filterRange = $('.filter__form--active  .filter__range');
      filterRange.slider('destroy');

      headings[i].classList.remove('filter__heading--opened');
      blocks[i].classList.remove('filter__block--opened');
      blocks[i].style.height = 0;
    } else {
      headings.forEach(function (it) {
        it.classList.remove('filter__heading--opened');
      });
      blocks.forEach(function (it) {
        it.classList.remove('filter__block--opened');
        it.style.height = 0;
      });

      headings[i].classList.add('filter__heading--opened');
      blocks[i].classList.add('filter__block--opened');
      blocks[i].style.height = blockHeight + 'px';

      filterRange = $('.filter__form--active  .filter__range');
      var minValue = $('.filter__form--active  .filter__block--opened  .filter__value--min');
      var maxValue = $('.filter__form--active  .filter__block--opened  .filter__value--max');
      var minInput = $('.filter__form--active  .filter__block--opened  .filter__cost--min');
      var maxInput = $('.filter__form--active  .filter__block--opened  .filter__cost--max');

      filterRange.slider({
        range: true,
        min: 9000,
        max: 90000,
        step: 1000,
        values: [20000, 80000],
        slide: function (event, ui) {
          var min = filterRange.slider('option', 'min');
          var max = filterRange.slider('option', 'max');
          var step = filterRange.slider('option', 'step');

          minValue.text(Math.floor(ui.values[0] / step) + 'K');
          minValue.css({left: ((ui.values[0] - min) / (max - min) * 100 - 1) + '%'});
          minInput[0].value = ui.values[0];

          maxValue.text(Math.floor(ui.values[1] / 1000) + 'K');
          maxValue.css({left: ((ui.values[1] - min) / (max - min) * 100 - 1) + '%'});
          maxInput[0].value = ui.values[1];
        }
      });

      minValue.text(Math.floor(20000 / 1000) + 'K');
      minValue.css({left: ((20000 - 9000) / 81000 * 100 - 1) + '%'});
      minInput[0].value = '';

      maxValue.text(Math.floor(80000 / 1000) + 'K');
      maxValue.css({left: ((80000 - 9000) / 81000 * 100 - 1) + '%'});
      maxInput[0].value = '';
    }
  });
};

/* eslint-enable */

var filterCapionsClickHandler = function (caption, select) {
  caption.addEventListener('click', function () {
    if (select.classList.contains('filter__select--opened')) {
      select.classList.remove('filter__select--opened');
    } else {
      filterSelects.forEach(function (it) {
        it.classList.remove('filter__select--opened');
      });

      select.classList.add('filter__select--opened');

      document.addEventListener('click', filterSelectsCloseHandler);
    }
  });
};

var filterSelectsCloseHandler = function (evt) {
  if (!evt.target.classList.contains('filter__caption') &&
      !evt.target.classList.contains('filter__label') &&
      !evt.target.classList.contains('filter__checkbox')) {
    var openedSelect = main.querySelector('.filter__select--opened');
    openedSelect.classList.remove('filter__select--opened');
    document.removeEventListener('click', filterSelectsCloseHandler);
  }
};

var filterFormsClickHandler = function (form, preview) {
  form.addEventListener('click', function () {
    var textInputs = form.querySelectorAll('input:not([type=checkbox]):not([type=radio])');
    var checkboxInputs = form.querySelectorAll('input[type=checkbox]');
    var radioInputs = form.querySelectorAll('input[type=radio]');
    var inputs = [];

    textInputs.forEach(function (it) {
      if (it.value !== '') {
        inputs.push(it);
      }
    });

    checkboxInputs.forEach(function (it) {
      if (it.checked) {
        inputs.push(it);
      }
    });

    radioInputs.forEach(function (it) {
      if (it.checked) {
        inputs.push(it);
      }
    });

    if (inputs.length > 0) {
      preview.classList.add('filter__preview--opened');
    } else {
      preview.classList.remove('filter__preview--opened');
    }
  });
};

document.addEventListener('DOMContentLoaded', function () {
  navButton.addEventListener('click', navButtonClickHandler);

  window.addEventListener('scroll', windowScrollHandler);
  window.addEventListener('resize', windowResizeHandler);
  windowResizeHandler();

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

  searchSubmit.addEventListener('click', function (evt) {
    if (searchField.validity.valueMissing) {
      searchField.setCustomValidity('Введите текст запроса.');
    } else {
      search.submit();
      evt.preventDefault();
    }
  });

  for (var i = 0; i < filterLinks.length; i++) {
    filterLinksClickHandler(filterLinks[i], filterForms[i]);
    filterFormsClickHandler(filterForms[i], filterPreview[i]);
    getBlockHeight(filterForms[i]);
  }

  filterForms[0].classList.add('filter__form--active');

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

    if (i < 10) {
      $('.banner__controls .controls__number--active').text('0' + i);
    } else {
      $('.banner__controls .controls__number--active').text(i);
    }

    if (slick.slideCount < 10) {
      $('.banner__controls .controls__number--last').text('0' + slick.slideCount);
    } else {
      $('.banner__controls .controls__number--last').text(slick.slideCount);
    }

    $('.banner__controls .controls__timeline').css({
      height: '0'
    }).stop().animate({
      height: '100%'
    }, 6000);
  });

  $('.banner__slides').slick({
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 500,
    pauseOnHover: false,
    variableWidth: true,
    appendArrows: $('.banner__controls'),
    prevArrow: $('.banner__controls .controls__button--previous'),
    nextArrow: $('.banner__controls .controls__button--next'),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          arrows: false,
          variableWidth: false,
        }
      }
    ]
  });

  $(window).on("load resize", function(){
    if (innerWidth >= 1024) {
      $('.brands__list.slick-initialized').slick('unslick');
      $('.news__notes.slick-initialized').slick('unslick');
    } else {
      if (!document.querySelector('.brands__list').classList.contains('slick-initialized')) {
        $('.brands__list').slick({
          dots: true,
          arrows: false,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 6000,
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
                slidesToShow: 3
              }
            }
          ]
        });
      }

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

  $(window).on('scroll resize', function() {
    var scrollBottom = $(window).scrollTop() + $(window).height();
    var bodyHeight = document.body.offsetHeight;
    var innerHeight = window.innerHeight;
    var footerHeight = footer.getBoundingClientRect().height;
    var footerTop = bodyHeight - innerHeight - footerHeight;
    var sidebarTop = sidebar.getBoundingClientRect().top + window.pageYOffset;

    if (window.innerWidth >= 1024) {
      if($(this).scrollTop() !== 0) {
        $('.upward').fadeIn();
      } else {
        $('.upward').fadeOut();
      }
    } else {
      $('.upward').css({display: 'none'});
    }
  });

  $('.upward').click(function() {
    $('body,html').animate({scrollTop:0}, 500);
  });

  var filterRange = $('.filter__block--opened  .filter__range');
  var minValue = $('.filter__block--opened  .filter__value--min');
  var maxValue = $('.filter__block--opened  .filter__value--max');
  var minInput = $('.filter__block--opened  .filter__cost--min');
  var maxInput = $('.filter__block--opened .filter__cost--max');

  filterRange.slider({
    range: true,
    min: 9000,
    max: 90000,
    step: 1000,
    values: [20000, 80000],
    slide: function(event, ui) {
      var min = filterRange.slider('option', 'min');
      var max = filterRange.slider('option', 'max');
      var step = filterRange.slider('option', 'step');

      minValue.text(Math.floor(ui.values[0] / step) + 'K');
      minValue.css({left: ((ui.values[0] - min) / (max - min) * 100 - 1) + '%'});
      minInput[0].value = ui.values[0];

      maxValue.text(Math.floor(ui.values[1] / 1000) + 'K');
      maxValue.css({left: ((ui.values[1] - min) / (max - min) * 100 - 1) + '%'});
      maxInput[0].value = ui.values[1];
    }
  });

  minValue.text(Math.floor(20000 / 1000) + 'K');
  minValue.css({left: ((20000 - 9000) / 81000 * 100 - 1) + '%'});

  maxValue.text(Math.floor(80000 / 1000) + 'K');
  maxValue.css({left: ((80000 - 9000) / 81000 * 100 - 1) + '%'});

  $('.industry .slider__items').on('init reInit afterChange', function(event, slick, currentSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;

    if (i < 10) {
      $('.industry__controls .controls__number--active').text('0' + i);
    } else {
      $('.industry__controls .controls__number--active').text(i);
    }

    if (slick.slideCount < 10) {
      $('.industry__controls .controls__number--last').text('0' + slick.slideCount);
    } else {
      $('.industry__controls .controls__number--last').text(slick.slideCount);
    }

    $('.industry__controls .controls__timeline').css({
      width: '0'
    }).stop().animate({
      width: '100%'
    }, 6000);
  });

  $('.industry .slider__items').slick({
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 5,
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
    autoplaySpeed: 6000,
    pauseOnHover: false,
    speed: 500,
    slidesToShow: 2,
    variableWidth: true,
    draggable: false,
    appendArrows: $('.projects__controls'),
    prevArrow: $('.projects__controls .controls__button--previous'),
    nextArrow: $('.projects__controls .controls__button--next'),
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

  $('.clients__list').slick({
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
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
          slidesToShow: 3
        }
      }
    ]
  });

});

/* eslint-enable */
