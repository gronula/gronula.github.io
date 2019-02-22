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
// var sidebarLinks = sidebar.querySelectorAll('.sidebar__link');
var sidebarCatalogLink = sidebar.querySelector('.sidebar__link--catalog');
var catalog = sidebar.querySelector('.catalog');
var catalogHeader = catalog.querySelector('.catalog__header');
var catalogTitle = catalog.querySelector('.catalog__title');
var catalogButton = catalog.querySelector('.catalog__toggle');
var catalogWrapper = catalog.querySelector('.catalog__wrapper');
// var catalogList = catalog.querySelector('.catalog__list');
var catalogItems = catalog.querySelectorAll('.catalog__item');
var catalogLinks = catalog.querySelectorAll('.catalog__link');
var catalogNumbers = catalog.querySelectorAll('.catalog__number');
var catalogSublists = catalog.querySelectorAll('.catalog__sublist');
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
var brands = main.querySelector('.brands');
var brandsLists = brands.querySelectorAll('.brands__list');
var brandsImages = brands.querySelectorAll('.brands__image-wrapper');
var footer = document.querySelector('.footer');
var citiesFooter = footer.querySelectorAll('.footer__city');
var addressesFooter = footer.querySelectorAll('.footer__address');
var footerAuthor = footer.querySelector('.footer__policy + .footer__copyrights');
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
  } else {
    // if (navButton.classList.contains('main-nav__toggle--opened')) {
    //   document.addEventListener('click', mainNavListCloseHandler);
    //   navButton.classList.remove('main-nav__toggle--opened');
    //   mainNavList.classList.remove('main-nav__list--closed');
    //   mainNavList.classList.remove('main-nav__list--hidden');
    //   mainNavList.classList.add('main-nav__list--fixed');
    // } else {
    //   navButton.classList.add('main-nav__toggle--opened');
    //   mainNavList.classList.add('main-nav__list--closed');
    //   mainNavList.classList.add('main-nav__list--hidden');
    //   mainNavList.classList.remove('main-nav__list--fixed');
    // }
  }
};

// var mainNavListCloseHandler = function (evt) {
//   if (!window.matchMedia('(max-width: 1023px)').matches && evt.target !== navButton) {
//     navButton.classList.add('main-nav__toggle--opened');
//     mainNavList.classList.add('main-nav__list--closed');
//     mainNavList.classList.add('main-nav__list--hidden');
//     mainNavList.classList.remove('main-nav__list--fixed');
//     document.removeEventListener('click', mainNavListCloseHandler);
//   }
// };

var searchIconClickHandler = function (evt) {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    evt.stopPropagation();
    mainNav.style.transition = 'all 0.5s cubic-bezier(0.77, 0, 0.175, 1)';
    mainNav.style.width = 0;
    mainNav.classList.add('main-nav--closed');
    searchField.style.transition = 'all 0.5s cubic-bezier(0.77, 0, 0.175, 1)';
    searchField.style.width = searchFieldWidth + 'px';
  }
};

var searchFieldCloseHandler = function (evt) {
  if (evt.target !== searchField && evt.target !== searchSubmit) {
    searchIcon.classList.remove('search__icon--opened');
    searchField.style.width = '';
    mainNav.style.width = mainNavWidth + 'px';
    mainNav.classList.remove('main-nav--closed');
  }
};

var searchFieldFocusHandler = function () {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    searchIcon.classList.add('search__icon--opened');
    searchField.placeholder = 'Поиск';
    searchField.addEventListener('blur', searchFieldBlurHandler);
    document.addEventListener('click', searchFieldCloseHandler);

    if (!header.classList.contains('header--fixed')) {
      mainNav.style.transition = 'all 0.5s cubic-bezier(0.77, 0, 0.175, 1)';
      mainNav.style.width = 0;
      mainNav.classList.add('main-nav--closed');
      searchField.style.transition = 'all 0.5s cubic-bezier(0.77, 0, 0.175, 1)';
      searchField.style.width = searchFieldWidth + 'px';
    }
  }
};

var searchFieldBlurHandler = function () {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    if (!header.classList.contains('header--fixed')) {
      searchField.style.width = '';
      mainNav.style.width = mainNavWidth + 'px';
      mainNav.classList.remove('main-nav--closed');
    }

    searchIcon.classList.remove('search__icon--opened');
    searchField.placeholder = 'Поиск товаров и услуг';

    document.removeEventListener('click', searchFieldCloseHandler);
    searchField.removeEventListener('blur', searchFieldBlurHandler);
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

var mainNavLinkTimer;

var mainNavLinkCatalogMouseoverHandler = function () {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    window.removeEventListener('scroll', windowScrollHandler);

    offsetTop = pageYOffset;

    if (window.matchMedia('(max-width: 1687px)').matches) {
      header.style.left = '';
      header.style.right = getScrollWidth() + 'px';
    } else {
      header.style.left = offsetTop > 65 ? getScrollWidth() / -2 + 'px' : '';
      header.style.right = offsetTop > 65 ? getScrollWidth() / 2 + 'px' : getScrollWidth() + 'px';
    }

    document.body.style.top = -offsetTop + 'px';
    document.body.style.width = 'calc(100% - ' + getScrollWidth() + 'px)';
    document.body.classList.add('no-scroll');

    mainNavOverlay.classList.remove('main-nav__overlay--out');
    mainNavOverlay.classList.add('main-nav__overlay--hover');

    var mainNavLinkCatalogOffsetLeft = mainNavLinkCatalog.getBoundingClientRect().left;

    sidebar.style.left = mainNavLinkCatalogOffsetLeft + 'px';
    sidebar.classList.remove('sidebar--out');
    sidebar.classList.add('sidebar--hover');

    if (mainNavLinkTimer) {
      clearTimeout(mainNavLinkTimer);
      mainNavLinkTimer = null;
    }

    mainNavOverlay.addEventListener('mouseover', mainNavOverlayMouseoverHandler);
    sidebar.addEventListener('mouseover', sidebarMouseoverHandler);
  }
};

var mainNavOverlayMouseoverHandler = function () {
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.classList.remove('no-scroll');
  header.style.left = '';
  header.style.right = '';

  window.scroll(0, offsetTop);

  mainNavOverlay.classList.add('main-nav__overlay--out');
  sidebar.classList.add('sidebar--out');

  mainNavLinkCatalog.removeEventListener('mouseover', mainNavOverlayMouseoverHandler);
  window.addEventListener('scroll', windowScrollHandler);

  mainNavLinkTimer = setTimeout(function () {
    mainNavOverlay.classList.remove('main-nav__overlay--hover');
    sidebar.classList.remove('sidebar--hover');
    sidebar.removeEventListener('mouseover', sidebarMouseoverHandler);
  }, 500);
};

var sidebarMouseoverHandler = function () {
  mainNavOverlay.classList.remove('main-nav__overlay--out');
  mainNavOverlay.classList.add('main-nav__overlay--hover');
  sidebar.classList.remove('sidebar--out');
  sidebar.classList.add('sidebar--hover');

  if (mainNavLinkTimer) {
    clearTimeout(mainNavLinkTimer);
    mainNavLinkTimer = null;
  }
};

var mainNavLinkCatalog = mainNav.querySelector('.main-nav__link--catalog');
var mainNavOverlay = mainNav.querySelector('.main-nav__overlay');

mainNavLinkCatalog.addEventListener('mouseover', mainNavLinkCatalogMouseoverHandler);

var offsetTop = 0;

var sidebarCatalogLinkClickHandler = function (evt) {
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

  // if (window.matchMedia('(max-width: 1023px)').matches) {
  //   evt.preventDefault();

  //   offsetTop = pageYOffset;

  //   document.body.style.top = -offsetTop + 'px';
  //   document.body.classList.add('no-scroll');

  //   catalog.classList.add('catalog--opened');

  //   for (var i = 0; i < catalogLinks.length; i++) {
  //     if (catalogLinks[i].parentElement.childElementCount > 1) {
  //       catalogLinks[i].addEventListener('click', catalogLinkClickHandler, true);
  //     }
  //   }

  //   catalogButton.addEventListener('click', catalogButtonClickHandler);
  // }
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

  // if (window.matchMedia('(max-width: 1023px)').matches) {
  //   document.body.style.top = '';
  //   document.body.classList.remove('no-scroll');

  //   window.scroll(0, offsetTop);

  //   for (var i = 0; i < catalogLinks.length; i++) {
  //     if (catalogLinks[i].parentElement.childElementCount > 1) {
  //       catalogLinks[i].removeEventListener('click', catalogLinkClickHandler, true);
  //     }
  //   }

  //   catalogTitle.classList.remove('catalog__title--opened');
  //   catalogTitle.textContent = 'Каталог';

  //   catalogItems.forEach(function (it) {
  //     it.classList.remove('catalog__item--closed');
  //   });

  //   if (targetLink || targetCatalogSublist) {
  //     targetLink.classList.remove('catalog__link--closed');
  //     targetCatalogSublist.classList.remove('catalog__sublist--opened');
  //   }
  // } else {
  //   document.body.classList.remove('dark');
  //   document.body.style.overflow = '';
  //   document.body.style.width = '';
  //   header.style.zIndex = '';
  //   header.style.right = '';
  //   setTimeout(function () {
  //     header.style.transition = '';
  //   }, 500);
  //   catalog.removeEventListener('mouseover', catalogMouseoverHandler);
  //   catalog.removeEventListener('mouseout', catalogMouseoutHandler);
  //   catalogHeader.classList.remove('catalog__header--opened');
  //   catalogWrapper.classList.remove('catalog__wrapper--opened');
  //   catalogLinks.forEach(function (it) {
  //     it.classList.remove('catalog__link--opened');
  //   });
  //   catalogSublists.forEach(function (it) {
  //     it.classList.remove('catalog__sublist--opened');
  //   });
  //   setTimeout(function () {
  //     sidebarCatalogLink.addEventListener('mouseover', sidebarCatalogLinkMouseoverHandler);
  //   }, 400);
  // }
};

// var sidebarCatalogLinkMouseoverHandler = function () {
//   if (!window.matchMedia('(max-width: 1023px)').matches) {
//     document.body.classList.add('dark');
//     document.body.style.overflow = 'hidden';
//     document.body.style.width = 'calc(100% - ' + getScrollWidth() + 'px)';
//     header.style.transition = 'none';
//     header.style.zIndex = '2';
//     header.style.right = getScrollWidth() + 'px';

//     catalog.classList.add('catalog--opened');
//     catalog.addEventListener('mouseover', catalogMouseoverHandler);
//     catalog.addEventListener('mouseout', catalogMouseoutHandler);

//     catalogButton.addEventListener('click', catalogButtonClickHandler);
//     for (var i = 0; i < catalogItems.length; i++) {
//       catalogItems[i].addEventListener('mouseover', catalogItemMouseoverHandler);
//       catalogItems[i].addEventListener('mouseout', catalogItemMouseoutHandler);
//     }
//   }
// };

// var sidebarCatalogLinkMouseoutHandler = function (evt) {
//   if (!window.matchMedia('(max-width: 1023px)').matches) {
//     if (evt.relatedTarget === null ||
//         evt.relatedTarget !== catalogList &&
//         !evt.relatedTarget.classList.contains('catalog__link')) {
//       document.body.classList.remove('dark');
//       document.body.style.overflow = '';
//       document.body.style.width = '';
//       header.style.zIndex = '';
//       header.style.right = '';
//       setTimeout(function () {
//         header.style.transition = '';
//       }, 500);
//       catalog.classList.remove('catalog--opened');
//       catalog.removeEventListener('mouseover', catalogMouseoverHandler);
//       catalog.removeEventListener('mouseout', catalogMouseoutHandler);
//       catalogHeader.classList.remove('catalog__header--opened');
//       catalogWrapper.classList.remove('catalog__wrapper--opened');
//     }
//   }
// };

// var catalogTimer;

// var catalogMouseoverHandler = function (evt) {
//   if (evt.target === catalog) {
//     catalogTimer = setTimeout(function () {
//       document.body.classList.remove('dark');
//       document.body.style.overflow = '';
//       document.body.style.width = '';
//       header.style.zIndex = '';
//       header.style.right = '';
//       setTimeout(function () {
//         header.style.transition = '';
//       }, 500);
//       catalog.classList.remove('catalog--opened');
//       catalog.removeEventListener('mouseover', catalogMouseoverHandler);
//       catalog.removeEventListener('mouseout', catalogMouseoutHandler);
//       catalogHeader.classList.remove('catalog__header--opened');
//       catalogWrapper.classList.remove('catalog__wrapper--opened');
//       catalogLink.classList.remove('catalog__link--opened');
//       catalogSublist.classList.remove('catalog__sublist--opened');
//     }, 500);
//   }
// };

// var catalogMouseoutHandler = function (evt) {
//   if (catalogTimer) {
//     clearTimeout(catalogTimer);
//     catalogTimer = null;
//   }

//   sidebarLinks.forEach(function (it) {
//     if (evt.relatedTarget === null || evt.relatedTarget === it && evt.relatedTarget !== sidebarCatalogLink) {
//       document.body.classList.remove('dark');
//       document.body.style.overflow = '';
//       header.style.zIndex = '';
//       header.style.right = '';
//       setTimeout(function () {
//         header.style.transition = '';
//       }, 500);
//       catalog.classList.remove('catalog--opened');
//       catalog.removeEventListener('mouseover', catalogMouseoverHandler);
//       catalog.removeEventListener('mouseout', catalogMouseoutHandler);
//       catalogHeader.classList.remove('catalog__header--opened');
//       catalogWrapper.classList.remove('catalog__wrapper--opened');
//       catalogLink.classList.remove('catalog__link--opened');
//       catalogSublist.classList.remove('catalog__sublist--opened');
//       return;
//     }
//   });
// };

// var catalogSublist;
// var catalogLink;

// var catalogItemTimer;

// var catalogItemMouseoverHandler = function (evt) {
//   if (evt.currentTarget.childElementCount > 1) {
//     catalogLink = evt.currentTarget.querySelector('.catalog__link');
//     catalogSublist = evt.currentTarget.querySelector('.catalog__sublist');

//     catalogHeader.classList.add('catalog__header--opened');
//     catalogWrapper.classList.add('catalog__wrapper--opened');

//     catalogLinks.forEach(function (it) {
//       it.classList.remove('catalog__link--opened');
//     });
//     catalogLink.classList.add('catalog__link--opened');

//     catalogSublists.forEach(function (it) {
//       it.classList.remove('catalog__sublist--opened');
//     });
//     catalogSublist.classList.add('catalog__sublist--opened');
//   } else {
//     catalogHeader.classList.remove('catalog__header--opened');
//     catalogWrapper.classList.remove('catalog__wrapper--opened');

//     catalogLinks.forEach(function (it) {
//       it.classList.remove('catalog__link--opened');
//     });
//     catalogSublists.forEach(function (it) {
//       it.classList.remove('catalog__sublist--opened');
//     });
//   }

//   if (catalogItemTimer) {
//     clearTimeout(catalogItemTimer);
//     catalogItemTimer = null;
//   }
// };

// var catalogItemMouseoutHandler = function (evt) {
//   if (
//     evt.currentTarget.childElementCount > 1 &&
//     !evt.target.classList.contains('catalog__sublist') &&
//     evt.relatedTarget === catalogHeader) {
//     return;
//   }

//   catalogItemTimer = setTimeout(function () {
//     catalogHeader.classList.remove('catalog__header--opened');
//     catalogWrapper.classList.remove('catalog__wrapper--opened');

//     catalogLinks.forEach(function (it) {
//       it.classList.remove('catalog__link--opened');
//     });
//     catalogSublists.forEach(function (it) {
//       it.classList.remove('catalog__sublist--opened');
//     });
//   }, 250);
// };

var setCatalogNumbersValue = function () {
  catalogItems.forEach(function (it, i) {
    var sublist = it.querySelector('.catalog__sublist');
    var number = sublist === null ? '' : sublist.childElementCount;

    catalogNumbers[i].textContent = number;
  });
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

    categoryCompressor.textContent = 'Компрессоры';
    categoryDehydrator.textContent = 'Осушители';
    categoryPump.textContent = 'Насосы';
    categoryPowerstation.textContent = 'Электростанции';

    sidebarCatalogLink.addEventListener('click', sidebarCatalogLinkClickHandler);
    // sidebarCatalogLink.removeEventListener('mouseover', sidebarCatalogLinkMouseoverHandler);
    // sidebarCatalogLink.removeEventListener('mouseout', sidebarCatalogLinkMouseoutHandler);
    catalog.classList.remove('catalog--opened');
    // catalog.removeEventListener('mouseover', catalogMouseoverHandler);
    // catalog.removeEventListener('mouseout', catalogMouseoutHandler);
    catalogHeader.classList.remove('catalog__header--opened');
    catalogButton.removeEventListener('click', catalogButtonClickHandler);
    catalogWrapper.classList.remove('catalog__wrapper--opened');
    catalogTitleClickHandler();

    // for (var i = 0; i < catalogItems.length; i++) {
    //   catalogItems[i].removeEventListener('mouseover', catalogItemMouseoverHandler);
    //   catalogItems[i].removeEventListener('mouseout', catalogItemMouseoutHandler);
    // }

    catalogLinks.forEach(function (it) {
      it.classList.remove('catalog__link--opened');
    });
    catalogSublists.forEach(function (it) {
      it.classList.remove('catalog__sublist--opened');
    });
  } else {
    windowScrollHandler();
    // getSearchInputWidth();

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
    main.classList.remove('main--full');

    if (pageYOffset > 115) {
      // header.classList.add('header--closed');
      // main.classList.remove('main--full');
    }

    logo.classList.remove('logo--closed');
    logo.classList.add('logo--opened');
    logoTitle.classList.remove('logo__title--closed');

    navButton.classList.remove('main-nav__toggle--opened');
    navButton.classList.add('main-nav__toggle--closed');

    mainNavList.classList.remove('main-nav__list--closed');
    siteNav.classList.remove('site-nav--closed');

    search.classList.add('search--closed');
    searchField.placeholder = 'Поиск товаров и услуг';

    contacts.classList.remove('contacts--closed');

    sidebar.classList.remove('sidebar--closed');
    sidebarCatalogLink.removeEventListener('click', sidebarCatalogLinkClickHandler);
    // sidebarCatalogLink.addEventListener('mouseover', sidebarCatalogLinkMouseoverHandler);
    // sidebarCatalogLink.addEventListener('mouseout', sidebarCatalogLinkMouseoutHandler);
    catalog.classList.remove('catalog--opened');
    // catalog.removeEventListener('mouseover', catalogMouseoverHandler);
    // catalog.removeEventListener('mouseout', catalogMouseoutHandler);
    catalogHeader.classList.remove('catalog__header--opened');
    catalogButton.removeEventListener('click', catalogButtonClickHandler);
    catalogWrapper.classList.remove('catalog__wrapper--opened');
    catalogTitleClickHandler();

    // for (i = 0; i < catalogLinks.length; i++) {
    //   if (catalogLinks[i].parentElement.childElementCount > 1) {
    //     catalogLinks[i].removeEventListener('click', catalogLinkClickHandler, true);
    //   }
    // }

    catalogLinks.forEach(function (it) {
      it.classList.remove('catalog__link--opened');
    });
    catalogSublists.forEach(function (it) {
      it.classList.remove('catalog__sublist--opened');
    });

    searchIcon.addEventListener('click', searchIconClickHandler);
    searchField.addEventListener('focus', searchFieldFocusHandler);
    // searchField.addEventListener('blur', searchFieldBlurHandler);

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

    setTimeout(function () {
      $('.brands__list.slick-initialized').not('.brands__list--copy').slick('unslick');
    }, 50);

    cancelAnimation();
    animateBrandsLists();
  }

  document.removeEventListener('click', filterSelectsCloseHandler);
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
    // var footerHeight = footer.getBoundingClientRect().height;
    // var footerTop = bodyHeight - innerHeight - footerHeight;
    var footerAuthorHeight = footerAuthor.getBoundingClientRect().height;
    var footerAuthorTop = bodyHeight - footerAuthorHeight;
    var upwardButtonTop = footerAuthorTop - upwardButton.getBoundingClientRect().height - 28;

    // if (footerTop < window.pageYOffset) {
    //   sidebar.style.position = 'absolute';
    //   sidebar.style.top = footerTop + 'px';
    // } else {
    //   sidebar.style.position = '';
    //   sidebar.style.top = '';
    // }

    if (footerAuthorTop < window.pageYOffset + innerHeight) {
      upwardButton.style.position = 'absolute';
      upwardButton.style.top = upwardButtonTop + 'px';
    } else {
      upwardButton.style.position = '';
      upwardButton.style.top = '';
    }

    var mainOffsetTop = main.getBoundingClientRect().top;

    if (mainOffsetTop > 115) {
      header.classList.remove('header--fixed');
      main.classList.remove('main--full');

      logoTitle.classList.remove('logo__title--closed');
      mainNavList.classList.remove('main-nav__list--closed');
      siteNav.classList.remove('site-nav--closed');
      contacts.classList.remove('contacts--closed');
      searchField.classList.add('search__field--closed');
    } else {
      header.classList.add('header--fixed');
      main.classList.add('main--full');

      logoTitle.classList.add('logo__title--closed');
      mainNavList.classList.add('main-nav__list--closed');
      siteNav.classList.add('site-nav--closed');
      contacts.classList.add('contacts--closed');
      searchField.classList.remove('search__field--closed');
    }

    if (scrollTop > newScrollTop) {
      // header.classList.add('header--fixed');
    //   main.classList.remove('main--full');
    } else {
    //   if (pageYOffset > 115) {
    //     header.classList.remove('header--closed');
    //     logoTitle.classList.add('logo__title--closed');
    //     mainNavList.classList.add('main-nav__list--closed');
    //     mainNavList.classList.add('main-nav__list--hidden');
    //     navButton.classList.remove('main-nav__toggle--closed');
    //     navButton.classList.add('main-nav__toggle--opened');
    //     siteNav.classList.add('site-nav--closed');
    //     contacts.classList.add('contacts--closed');
    //     searchField.classList.remove('search__field--closed');
    //   } else {
    //     header.classList.remove('header--closed');
    //     logoTitle.classList.remove('logo__title--closed');
    //     mainNavList.classList.remove('main-nav__list--closed');
    //     mainNavList.classList.remove('main-nav__list--hidden');
    //     mainNavList.classList.remove('main-nav__list--fixed');
    //     navButton.classList.add('main-nav__toggle--closed');
    //     navButton.classList.remove('main-nav__toggle--opened');
    //     siteNav.classList.remove('site-nav--closed');
    //     contacts.classList.remove('contacts--closed');
    //     searchField.classList.add('search__field--closed');
    //     main.classList.add('main--full');
    //   }
    }

    scrollTop = newScrollTop;

    getSearchInputWidth();
    // setTimeout(getSearchInputWidth, 400);
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

var getFilterBlockHeight = function (form) {
  form.classList.add('filter__form--active');

  var headings = form.querySelectorAll('.filter__main  .filter__heading');
  var blocks = form.querySelectorAll('.filter__block');

  for (var i = 0; i < headings.length; i++) {
    blocks[i].style.transition = 'none';
    blocks[i].classList.add('filter__block--opened');
    var blockHeight = blocks[i].getBoundingClientRect().height;
    blocks[i].classList.remove('filter__block--opened');
    blocks[i].style.transition = '';

    filterHeadingsClickHandler(form, headings, blocks, blockHeight, i);
  }

  headings[0].classList.add('filter__heading--opened');
  blocks[0].classList.add('filter__block--opened');
  blocks[0].style.height = blocks[0].getBoundingClientRect().height + 'px';

  form.classList.remove('filter__form--active');
};

var filterHeadingsClickHandler = function (form, headings, blocks, blockHeight, i) {
  headings[i].addEventListener('click', function () {
    if (blocks[i].classList.contains('filter__block--opened')) {
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
    }
  });
};

var filterCapionsClickHandler = function (caption, select) {
  caption.addEventListener('click', function () {
    if (select.classList.contains('filter__select--opened')) {
      select.classList.remove('filter__select--opened');
      document.removeEventListener('click', filterSelectsCloseHandler);
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

var filterFormsSubmitHandler = function (form) {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
};

var bestsellersItemClickHandler = function (evt) {
  evt.preventDefault();
  window.location.href = '#';
};

var bestsellersItemMousedownHandler = function (evt) {
  evt.preventDefault();
  if (evt.which === 2) {
    window.open('#', '_blank');
    window.focus();
  }
};

var bestsellersItems = main.querySelectorAll('.item--bestsellers');
bestsellersItems.forEach(function (it) {
  it.addEventListener('click', bestsellersItemClickHandler);
  it.addEventListener('mousedown', bestsellersItemMousedownHandler);
});

var requestAnimationFrame = window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.msRequestAnimationFrame;

window.requestAnimationFrame = requestAnimationFrame;

var isScrollDown = true;
var requestId;
var x = 0;

var animation = function () {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    var brandsWidth = brands.getBoundingClientRect().width;
    x = isScrollDown ? x - 1 : x + 1;

    brandsLists.forEach(function (it) {
      if (x < -brandsWidth) {
        x = 0;
      } else if (x > 0) {
        x = -brandsWidth;
      }

      it.style.transform = 'translateX(' + x + 'px)';
    });

    requestId = requestAnimationFrame(animation);
  }
};

var cancelAnimation = function () {
  cancelAnimationFrame(requestId);
};

var isMoved = false;
var isClick = true;

var brandsImageClickHandler = function (evt) {
  if (!isClick) {
    evt.preventDefault();
  }
};

var brandsImageMouseDownHandler = function (evt) {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    evt.preventDefault();

    var brandsWidth = brands.getBoundingClientRect().width;

    var startCoords = {
      x: evt.clientX
    };

    isClick = true;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      cancelAnimation();

      x -= startCoords.x - moveEvt.x;

      brandsLists.forEach(function (it) {
        if (x < -brandsWidth) {
          x = 0;
        } else if (x > 0) {
          x = -brandsWidth;
        }

        it.style.transform = 'translateX(' + x + 'px)';
      });

      startCoords = {
        x: moveEvt.clientX
      };

      isMoved = true;
      isClick = false;
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      if (isMoved) {
        isMoved = false;
        animation();
      }

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler, true);
    };

    for (var i = 0; i < brandsImages.length; i++) {
      brandsImages[i].addEventListener('click', brandsImageClickHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, true);
  }
};

var animateBrandsLists = function () {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    var brandsScrollTop = brands.getBoundingClientRect().top;

    window.addEventListener('scroll', function () {
      var newbrandsScrollTop = brands.getBoundingClientRect().top;
      isScrollDown = brandsScrollTop >= newbrandsScrollTop;
      brandsScrollTop = newbrandsScrollTop;
    });

    requestAnimationFrame(animation);

    for (var i = 0; i < brandsImages.length; i++) {
      brandsImages[i].addEventListener('mousedown', brandsImageMouseDownHandler);
    }
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

  for (var i = 0; i < filterLinks.length; i++) {
    filterLinksClickHandler(filterLinks[i], filterForms[i]);
    filterFormsClickHandler(filterForms[i], filterPreview[i]);
    filterFormsSubmitHandler(filterForms[i]);
    getFilterBlockHeight(filterForms[i]);
  }

  filterForms[0].classList.add('filter__form--active');

  for (i = 0; i < filterCaptions.length; i++) {
    filterCapionsClickHandler(filterCaptions[i], filterSelects[i]);
  }

  for (i = 0; i < citiesFooter.length; i++) {
    citiesFooterClickHandler(citiesFooter[i], addressesFooter[i]);
  }

  setCatalogNumbersValue();
});

$(document).ready(function () {
  $('.banner__slides').on('init reInit afterChange', function (event, slick, currentSlide) {
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

  $(window).on('load resize', function () {
    if (innerWidth >= 1024) {
      $('.news__notes.slick-initialized').slick('unslick');
    } else {
      brandsLists.forEach(function (it) {
        it.style.transform = '';
      });

      if (!document.querySelector('.brands__list').classList.contains('slick-initialized')) {
        $('.brands__list').not('.brands__list--copy').slick({
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

  $(window).on('scroll resize', function () {
    if (window.innerWidth >= 1024) {
      if ($(window).scrollTop() !== 0) {
        $('.upward').fadeIn();
      } else {
        $('.upward').fadeOut();
      }
    } else {
      $('.upward').css({display: 'none'});
    }
  });

  $('.upward').click(function () {
    $('body,html').animate({scrollTop: 0}, 500);
  });

  var filterRange = $('.filter__range');
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
      var minValue = $('.filter__form--active  .filter__block--opened  .filter__value--min');
      var maxValue = $('.filter__form--active  .filter__block--opened  .filter__value--max');
      var minInput = $('.filter__form--active  .filter__block--opened  .filter__cost--min');
      var maxInput = $('.filter__form--active  .filter__block--opened  .filter__cost--max');

      minValue.text(Math.floor(ui.values[0] / step) + 'K');
      minValue.css({left: ((ui.values[0] - min) / (max - min) * 100 - 1) + '%'});
      minInput[0].value = ui.values[0];

      maxValue.text(Math.floor(ui.values[1] / step) + 'K');
      maxValue.css({left: ((ui.values[1] - min) / (max - min) * 100 - 1) + '%'});
      maxInput[0].value = ui.values[1];
    },
    stop: function () {
      var preview = main.querySelector('.filter__form--active  .filter__preview');
      var minInput = $('.filter__form--active  .filter__block--opened  .filter__cost--min');
      var maxInput = $('.filter__form--active  .filter__block--opened  .filter__cost--max');

      if (!!minInput[0].value || !!maxInput[0].value) {
        preview.classList.add('filter__preview--opened');
      }
    }
  });

  var min = filterRange.slider('option', 'min');
  var max = filterRange.slider('option', 'max');
  var step = filterRange.slider('option', 'step');
  var values = filterRange.slider('option', 'values');
  var minValue = $('.filter__value--min');
  var maxValue = $('.filter__value--max');


  minValue.text(Math.floor(values[0] / step) + 'K');
  minValue.css({left: ((values[0] - min) / (max - min) * 100 - 1) + '%'});

  maxValue.text(Math.floor(values[1] / step) + 'K');
  maxValue.css({left: ((values[1] - min) / (max - min) * 100 - 1) + '%'});

  $('.industry .slider__items').on('init reInit afterChange', function (event, slick, currentSlide) {
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
    autoplay: false,
    autoplaySpeed: 6000,
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
    autoplay: false,
    autoplaySpeed: 6000,
    pauseOnHover: false,
    speed: 500,
    slidesToShow: 1,
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
