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
var sidebarLinks = sidebar.querySelectorAll('.sidebar__link');
var sidebarCatalogLink = sidebar.querySelector('.sidebar__link--catalog');
var catalog = sidebar.querySelector('.catalog');
var catalogHeader = catalog.querySelector('.catalog__header');
var catalogTitle = catalog.querySelector('.catalog__title');
var catalogButton = catalog.querySelector('.catalog__toggle');
var catalogWrapper = catalog.querySelector('.catalog__wrapper');
var catalogList = catalog.querySelector('.catalog__list');
var catalogItems = catalog.querySelectorAll('.catalog__item');
var catalogLinks = catalog.querySelectorAll('.catalog__link');
var catalogNumbers = catalog.querySelectorAll('.catalog__number');
var catalogSublists = catalog.querySelectorAll('.catalog__sublist');
var feedback = main.querySelector('.feedback');
var footer = document.querySelector('.footer');
var citiesFooter = footer.querySelectorAll('.footer__city');
var addressesFooter = footer.querySelectorAll('.footer__address');
var searchFieldWidth = 100;
var mainNavWidth = 240;

var getScrollWidth = function () {
  var div = document.createElement('div');

  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.visibility = 'hidden';

  document.body.appendChild(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);

  return scrollWidth;
};

var navButtonClickHandler = function () {
  if (window.matchMedia('(max-width: 1023px)').matches) {
    if (navButton.classList.contains('main-nav__toggle--closed')) {
      document.body.classList.add('no-scroll');
      header.classList.add('header--fixed');

      logo.classList.remove('logo--opened');
      logo.classList.add('logo--closed');

      search.classList.remove('search--closed');
      mainNav.style.width = '';
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
};

var activeCityClickHandler = function () {
  activeCity.addEventListener('click', function () {
    citiesList.classList.toggle('contacts__cities--opened');

    for (var i = 0; i < citiesHeader.length; i++) {
      citiesHeader[i].addEventListener('click', citiesHeaderClickHandler, true);
    }

    document.addEventListener('click', citiesListCloseHandler, true);
  });
};

var citiesHeaderClickHandler = function (evt) {
  activeCity.textContent = evt.target.textContent;
  citiesList.classList.remove('contacts__cities--opened');
  citiesHeader.forEach(function (it) {
    it.removeEventListener('click', citiesHeaderClickHandler, true);
  });
};

var citiesListCloseHandler = function (evt) {
  if (!evt.target.classList.contains('contacts__city')) {
    citiesList.classList.remove('contacts__cities--opened');
    evt.stopPropagation();
  }
  document.removeEventListener('click', citiesListCloseHandler, true);
};

var offsetTop = 0;

var sidebarCatalogLinkClickHandler = function (evt) {
  if (window.matchMedia('(max-width: 1023px)').matches) {
    evt.preventDefault();

    offsetTop = pageYOffset;

    document.body.style.top = -offsetTop + 'px';
    document.body.classList.add('no-scroll');

    catalog.classList.add('catalog--opened');

    for (var i = 0; i < catalogLinks.length; i++) {
      if (catalogLinks[i].parentElement.childElementCount > 1) {
        catalogLinks[i].addEventListener('click', catalogLinkClickHandler, true);
      }
    }

    catalogButton.addEventListener('click', catalogButtonClickHandler);
  }
};

var targetLink;
var targetCatalogSublist;

var catalogLinkClickHandler = function (evt) {
  evt.preventDefault();

  catalogTitle.classList.add('catalog__title--opened');
  catalogTitle.textContent = evt.currentTarget.firstChild.textContent;

  catalogItems.forEach(function (it) {
    if (it !== evt.currentTarget.parentElement) {
      it.classList.add('catalog__item--closed');
    }
  });

  targetLink = evt.currentTarget;
  targetLink.classList.add('catalog__link--closed');

  targetCatalogSublist = evt.currentTarget.parentElement.querySelector('.catalog__sublist');
  targetCatalogSublist.classList.add('catalog__sublist--opened');

  catalogTitle.addEventListener('click', catalogTitleClickHandler);
};

var catalogTitleClickHandler = function () {
  catalogTitle.classList.remove('catalog__title--opened');
  catalogTitle.textContent = 'Каталог';

  catalogItems.forEach(function (it) {
    it.classList.remove('catalog__item--closed');
  });

  if (targetLink || targetCatalogSublist) {
    targetLink.classList.remove('catalog__link--closed');
    targetCatalogSublist.classList.remove('catalog__sublist--opened');
  }

  catalogTitle.removeEventListener('click', catalogTitleClickHandler);
};

var catalogButtonClickHandler = function () {
  catalog.classList.remove('catalog--opened');
  catalogButton.removeEventListener('click', catalogButtonClickHandler);
  catalogTitle.removeEventListener('click', catalogTitleClickHandler);

  if (window.matchMedia('(max-width: 1023px)').matches) {
    document.body.style.top = '';
    document.body.classList.remove('no-scroll');

    window.scroll(0, offsetTop);

    for (var i = 0; i < catalogLinks.length; i++) {
      if (catalogLinks[i].parentElement.childElementCount > 1) {
        catalogLinks[i].removeEventListener('click', catalogLinkClickHandler, true);
      }
    }

    catalogTitle.classList.remove('catalog__title--opened');
    catalogTitle.textContent = 'Каталог';

    catalogItems.forEach(function (it) {
      it.classList.remove('catalog__item--closed');
    });

    if (targetLink || targetCatalogSublist) {
      targetLink.classList.remove('catalog__link--closed');
      targetCatalogSublist.classList.remove('catalog__sublist--opened');
    }
  } else {
    document.body.classList.remove('dark');
    document.body.style.overflow = '';
    document.body.style.width = '';
    header.style.zIndex = '';
    header.style.right = '';
    setTimeout(function () {
      header.style.transition = '';
    }, 500);
    catalog.removeEventListener('mouseover', catalogMouseoverHandler);
    catalog.removeEventListener('mouseout', catalogMouseoutHandler);
    catalogHeader.classList.remove('catalog__header--opened');
    catalogWrapper.classList.remove('catalog__wrapper--opened');
    catalogLinks.forEach(function (it) {
      it.classList.remove('catalog__link--opened');
    });
    catalogSublists.forEach(function (it) {
      it.classList.remove('catalog__sublist--opened');
    });
    setTimeout(function () {
      sidebarCatalogLink.addEventListener('mouseover', sidebarCatalogLinkMouseoverHandler);
    }, 400);
  }
};

var sidebarCatalogLinkMouseoverHandler = function () {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    document.body.classList.add('dark');
    document.body.style.overflow = 'hidden';
    document.body.style.width = 'calc(100% - ' + getScrollWidth() + 'px)';
    header.style.transition = 'none';
    header.style.zIndex = '2';
    header.style.right = getScrollWidth() + 'px';

    catalog.classList.add('catalog--opened');
    catalog.addEventListener('mouseover', catalogMouseoverHandler);
    catalog.addEventListener('mouseout', catalogMouseoutHandler);

    catalogButton.addEventListener('click', catalogButtonClickHandler);
    for (var i = 0; i < catalogItems.length; i++) {
      catalogItems[i].addEventListener('mouseover', catalogItemMouseoverHandler);
      catalogItems[i].addEventListener('mouseout', catalogItemMouseoutHandler);
    }
  }
};

var sidebarCatalogLinkMouseoutHandler = function (evt) {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    if (evt.relatedTarget === null ||
        evt.relatedTarget !== catalogList &&
        !evt.relatedTarget.classList.contains('catalog__link')) {
      document.body.classList.remove('dark');
      document.body.style.overflow = '';
      document.body.style.width = '';
      header.style.zIndex = '';
      header.style.right = '';
      setTimeout(function () {
        header.style.transition = '';
      }, 500);
      catalog.classList.remove('catalog--opened');
      catalog.removeEventListener('mouseover', catalogMouseoverHandler);
      catalog.removeEventListener('mouseout', catalogMouseoutHandler);
      catalogHeader.classList.remove('catalog__header--opened');
      catalogWrapper.classList.remove('catalog__wrapper--opened');
    }
  }
};

var catalogTimer;

var catalogMouseoverHandler = function (evt) {
  if (evt.target === catalog) {
    catalogTimer = setTimeout(function () {
      document.body.classList.remove('dark');
      document.body.style.overflow = '';
      document.body.style.width = '';
      header.style.zIndex = '';
      header.style.right = '';
      setTimeout(function () {
        header.style.transition = '';
      }, 500);
      catalog.classList.remove('catalog--opened');
      catalog.removeEventListener('mouseover', catalogMouseoverHandler);
      catalog.removeEventListener('mouseout', catalogMouseoutHandler);
      catalogHeader.classList.remove('catalog__header--opened');
      catalogWrapper.classList.remove('catalog__wrapper--opened');
      catalogLink.classList.remove('catalog__link--opened');
      catalogSublist.classList.remove('catalog__sublist--opened');
    }, 500);
  }
};

var catalogMouseoutHandler = function (evt) {
  if (catalogTimer) {
    clearTimeout(catalogTimer);
    catalogTimer = null;
  }

  sidebarLinks.forEach(function (it) {
    if (evt.relatedTarget === null || evt.relatedTarget === it && evt.relatedTarget !== sidebarCatalogLink) {
      document.body.classList.remove('dark');
      document.body.style.overflow = '';
      header.style.zIndex = '';
      header.style.right = '';
      setTimeout(function () {
        header.style.transition = '';
      }, 500);
      catalog.classList.remove('catalog--opened');
      catalog.removeEventListener('mouseover', catalogMouseoverHandler);
      catalog.removeEventListener('mouseout', catalogMouseoutHandler);
      catalogHeader.classList.remove('catalog__header--opened');
      catalogWrapper.classList.remove('catalog__wrapper--opened');
      catalogLink.classList.remove('catalog__link--opened');
      catalogSublist.classList.remove('catalog__sublist--opened');
      return;
    }
  });
};

var catalogSublist;
var catalogLink;

var catalogItemTimer;

var catalogItemMouseoverHandler = function (evt) {
  if (evt.currentTarget.childElementCount > 1) {
    catalogLink = evt.currentTarget.querySelector('.catalog__link');
    catalogSublist = evt.currentTarget.querySelector('.catalog__sublist');

    catalogHeader.classList.add('catalog__header--opened');
    catalogWrapper.classList.add('catalog__wrapper--opened');

    catalogLinks.forEach(function (it) {
      it.classList.remove('catalog__link--opened');
    });
    catalogLink.classList.add('catalog__link--opened');

    catalogSublists.forEach(function (it) {
      it.classList.remove('catalog__sublist--opened');
    });
    catalogSublist.classList.add('catalog__sublist--opened');
  } else {
    catalogHeader.classList.remove('catalog__header--opened');
    catalogWrapper.classList.remove('catalog__wrapper--opened');

    catalogLinks.forEach(function (it) {
      it.classList.remove('catalog__link--opened');
    });
    catalogSublists.forEach(function (it) {
      it.classList.remove('catalog__sublist--opened');
    });
  }

  if (catalogItemTimer) {
    clearTimeout(catalogItemTimer);
    catalogItemTimer = null;
  }
};

var catalogItemMouseoutHandler = function (evt) {
  if (
    evt.currentTarget.childElementCount > 1 &&
    !evt.target.classList.contains('catalog__sublist') &&
    evt.relatedTarget === catalogHeader) {
    return;
  }

  catalogItemTimer = setTimeout(function () {
    catalogHeader.classList.remove('catalog__header--opened');
    catalogWrapper.classList.remove('catalog__wrapper--opened');

    catalogLinks.forEach(function (it) {
      it.classList.remove('catalog__link--opened');
    });
    catalogSublists.forEach(function (it) {
      it.classList.remove('catalog__sublist--opened');
    });
  }, 250);
};

var setCatalogNumbersValue = function () {
  catalogItems.forEach(function (it, i) {
    var sublist = it.querySelector('.catalog__sublist');
    var number = sublist === null ? '' : sublist.childElementCount;

    catalogNumbers[i].textContent = number;
  });
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
  var sidebarHeight = sidebar.getBoundingClientRect().height;

  if (!window.matchMedia('(max-width: 1023px)').matches) {
    searchField.blur();
    searchField.style.transition = 'border-bottom 0.5s cubic-bezier(0.77, 0, 0.175, 1)';

    var newScrollTop = document.body.getBoundingClientRect().top;

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
      }
    }

    scrollTop = newScrollTop;

    setTimeout(getSearchInputWidth, 400);

    sidebarHeight = 0;
  }
  setTimeout(function () {
    var feedbackTop = feedback.offsetTop - innerHeight + sidebarHeight;
    // var feedbackOffsetTop = feedback.offsetTop;
    // var feedbackMiddle = feedbackTop + feedback.getBoundingClientRect().height / 2;
    var feedbackBottom = feedbackTop + feedback.getBoundingClientRect().height;
    // var feedbackOffsetBottom = feedback.offsetTop + feedback.getBoundingClientRect().height;

    if (pageYOffset > feedbackTop && pageYOffset < feedbackBottom) {
      if (pageYOffset <= feedbackBottom) {
        var currentPosition = (pageYOffset - feedbackTop) / (feedbackBottom - feedbackTop);
        var colors = [
          [21, 38, 46], // #15262e
          [251, 192, 45] // #fbc02d
        ];

        var currentColor = [];

        for (var i = 0; i < colors[0].length; i++) {
          // Проверяю, какое значение цвета больше
          if (colors[0][i] < colors[1][i]) {
            // Высчитываю текущее значение цвета
            var val = ((colors[1][i] - colors[0][i]) * currentPosition) + colors[0][i];
            // Устанавливаю текущее значение цвета
            currentColor[i] = Math.round(val);
          } else {
            // Высчитываю текущее значение цвета
            val = colors[0][i] - ((colors[0][i] - colors[1][i]) * currentPosition);
            // Устанавливаю текущее значение цвета
            currentColor[i] = Math.round(val);
          }
        }

        feedback.style['background-color'] = 'rgb(' + currentColor.join(',') + ')';
      } else if (pageYOffset >= feedbackBottom) {
        // currentPosition = (pageYOffset - feedbackBottom) / (feedbackOffsetBottom - feedbackBottom);
        // colors = [
        //   [251, 192, 45], // #fbc02d
        //   [21, 38, 46] // #15262e
        // ];

        // currentColor = [];

        // for (i = 0; i < colors[0].length; i++) {
        //   // Проверяю, какое значение цвета больше
        //   if (colors[0][i] < colors[1][i]) {
        //     // Высчитываю текущее значение цвета
        //     val = ((colors[1][i] - colors[0][i]) * currentPosition) + colors[0][i];
        //     // Устанавливаю текущее значение цвета
        //     currentColor[i] = Math.round(val);
        //   } else {
        //     // Высчитываю текущее значение цвета
        //     val = colors[0][i] - ((colors[0][i] - colors[1][i]) * currentPosition);
        //     // Устанавливаю текущее значение цвета
        //     currentColor[i] = Math.round(val);
        //   }
        // }

        // feedback.style['background-color'] = 'rgb(' + currentColor.join(',') + ')';
      } else {
        feedback.style['background-color'] = 'rgb(251, 192, 45)';
      }
    } else {
      feedback.style['background-color'] = 'rgb(251, 192, 45)';
    }
  }, 100);
};

var windowResizeHandler = function () {
  if (window.matchMedia('(max-width: 1023px)').matches) {
    document.body.classList.remove('dark');
    document.body.style.overflow = '';
    document.body.style.width = '';
    header.style.zIndex = '';
    header.style.right = '';
    setTimeout(function () {
      header.style.transition = '';
    }, 500);

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

    sidebarCatalogLink.addEventListener('click', sidebarCatalogLinkClickHandler);
    sidebarCatalogLink.removeEventListener('mouseover', sidebarCatalogLinkMouseoverHandler);
    sidebarCatalogLink.removeEventListener('mouseout', sidebarCatalogLinkMouseoutHandler);
    catalog.classList.remove('catalog--opened');
    catalog.removeEventListener('mouseover', catalogMouseoverHandler);
    catalog.removeEventListener('mouseout', catalogMouseoutHandler);
    catalogHeader.classList.remove('catalog__header--opened');
    catalogButton.removeEventListener('click', catalogButtonClickHandler);
    catalogWrapper.classList.remove('catalog__wrapper--opened');
    catalogTitleClickHandler();

    for (var i = 0; i < catalogItems.length; i++) {
      catalogItems[i].removeEventListener('mouseover', catalogItemMouseoverHandler);
      catalogItems[i].removeEventListener('mouseout', catalogItemMouseoutHandler);
    }

    catalogLinks.forEach(function (it) {
      it.classList.remove('catalog__link--opened');
    });
    catalogSublists.forEach(function (it) {
      it.classList.remove('catalog__sublist--opened');
    });
  } else {
    windowScrollHandler();

    document.body.classList.remove('no-scroll');
    document.body.classList.remove('dark');
    document.body.style.overflow = '';
    document.body.style.width = '';
    header.style.zIndex = '';
    header.style.right = '';
    setTimeout(function () {
      header.style.transition = '';
    }, 500);

    header.classList.remove('header--fixed');
    if (pageYOffset > 115) {
      header.classList.add('header--closed');
      main.classList.remove('main--full');
    }

    logo.classList.remove('logo--closed');
    logo.classList.add('logo--opened');

    search.classList.add('search--closed');
    searchField.placeholder = 'Поиск товаров и услуг';

    searchField.addEventListener('focus', searchFieldFocusHandler);
    searchField.addEventListener('blur', searchFieldBlurHandler);

    sidebar.classList.remove('sidebar--closed');
    sidebarCatalogLink.removeEventListener('click', sidebarCatalogLinkClickHandler);
    sidebarCatalogLink.addEventListener('mouseover', sidebarCatalogLinkMouseoverHandler);
    sidebarCatalogLink.addEventListener('mouseout', sidebarCatalogLinkMouseoutHandler);
    catalog.classList.remove('catalog--opened');
    catalog.removeEventListener('mouseover', catalogMouseoverHandler);
    catalog.removeEventListener('mouseout', catalogMouseoutHandler);
    catalogHeader.classList.remove('catalog__header--opened');
    catalogButton.removeEventListener('click', catalogButtonClickHandler);
    catalogWrapper.classList.remove('catalog__wrapper--opened');
    catalogTitleClickHandler();

    for (i = 0; i < catalogLinks.length; i++) {
      if (catalogLinks[i].parentElement.childElementCount > 1) {
        catalogLinks[i].removeEventListener('click', catalogLinkClickHandler, true);
      }
    }

    catalogLinks.forEach(function (it) {
      it.classList.remove('catalog__link--opened');
    });
    catalogSublists.forEach(function (it) {
      it.classList.remove('catalog__sublist--opened');
    });
  }
};

document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('scroll', windowScrollHandler);
  window.addEventListener('resize', windowResizeHandler);

  windowResizeHandler();
  activeCityClickHandler();

  navButton.addEventListener('click', navButtonClickHandler);

  searchSubmit.addEventListener('click', function (evt) {
    if (searchField.validity.valueMissing) {
      searchField.setCustomValidity('Введите текст запроса.');
    } else {
      search.submit();
      evt.preventDefault();
    }
  });

  for (var i = 0; i < citiesFooter.length; i++) {
    citiesFooterClickHandler(citiesFooter[i], addressesFooter[i]);
  }

  setCatalogNumbersValue();
});

$(document).ready(function () {
  $(window).on('load resize', function () {
    if (innerWidth >= 1024) {
      $('.bestsellers__products.slick-initialized').slick('slickUnfilter');
      $('.bestsellers__products.slick-initialized').slick('unslick');
    } else {
      if (!document.querySelector('.bestsellers__products').classList.contains('slick-initialized')) {
        $('.bestsellers__products').slick({
          dots: true,
          arrows: true,
          infinite: true,
          appendArrows: $('.controls'),
          prevArrow: $('.controls .controls__button--previous'),
          nextArrow: $('.controls .controls__button--next'),
        });
      }
    }
  });
});
