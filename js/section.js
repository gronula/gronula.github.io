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
var productsButton = main.querySelector('.products__button');
var productsItems = main.querySelector('.products__items');
var filter = main.querySelector('.filter');
var filterButton = filter.querySelector('.filter__toggle');
var filterCaptions = filter.querySelectorAll('.filter__caption');
var filterSelects = filter.querySelectorAll('.filter__select');
var filterButtonsView = filter.querySelectorAll('.filter__view  .filter__button');
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
var recentlyViewed = main.querySelector('.recently-viewed');
var recentlyViewedProducts = recentlyViewed.querySelectorAll('.recently-viewed__products');
var recentlyViewedItems = recentlyViewed.querySelectorAll('.recently-viewed  .item');
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

var productsButtonClickHandler = function () {
  if (window.matchMedia('(max-width: 1023px)').matches) {
    document.body.classList.add('no-scroll');
    filter.classList.add('filter--opened');

    sidebar.classList.add('sidebar--closed');

    filterButton.addEventListener('click', filterButtonClickHandler);
  }
};

var filterButtonClickHandler = function () {
  document.body.classList.remove('no-scroll');
  filter.classList.remove('filter--opened');

  sidebar.classList.remove('sidebar--closed');

  filterButton.removeEventListener('click', filterButtonClickHandler);
};

var getFilterBlockHeight = function () {
  filter.classList.add('filter--opened');

  if (window.matchMedia('(max-width: 1023px)').matches) {
    var headings = filter.querySelectorAll('.filter__heading');
    var blocks = filter.querySelectorAll('.filter__block');
  } else {
    headings = filter.querySelectorAll('.filter__main  .filter__heading:not(.filter__heading--mobile)');
    blocks = filter.querySelectorAll('.filter__main  .filter__block:not(.filter__block--categories)');
  }

  for (var i = 0; i < headings.length; i++) {
    blocks[i].style.transition = 'none';
    blocks[i].classList.add('filter__block--opened');
    var blockHeight = blocks[i].getBoundingClientRect().height;
    blocks[i].classList.remove('filter__block--opened');
    blocks[i].style.transition = '';

    filterHeadingsClickHandler(headings, blocks, blockHeight, i);
  }

  headings[0].classList.add('filter__heading--opened');
  blocks[0].classList.add('filter__block--opened');
  blocks[0].style.height = blocks[0].getBoundingClientRect().height + 'px';

  filter.classList.remove('filter--opened');
};

var filterHeadingsClickHandler = function (headings, blocks, blockHeight, i) {
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
  caption.addEventListener('click', function (evt) {
    if (select.classList.contains('filter__select--opened')) {
      select.classList.remove('filter__select--opened');
      document.removeEventListener('click', filterSelectsCloseHandler);
    } else {
      filterSelects.forEach(function (it) {
        it.classList.remove('filter__select--opened');
      });

      select.classList.add('filter__select--opened');

      document.addEventListener('click', filterSelectsCloseHandler);

      var dropDownItems = evt.target.parentElement.querySelectorAll('.filter__drop-down  .filter__label');
      dropDownItems.forEach(function (it) {
        it.addEventListener('click', dropDownItemClickHandler);
      });
    }
  });
};

var filterSelectsCloseHandler = function (evt) {
  if (!evt.target.classList.contains('filter__caption') &&
      !evt.target.classList.contains('filter__label')) {
    var openedSelect = main.querySelector('.filter__select--opened');
    openedSelect.classList.remove('filter__select--opened');
    document.removeEventListener('click', filterSelectsCloseHandler);
  }
};

var dropDownItemClickHandler = function (evt) {
  evt.preventDefault();
  var dropDownList = evt.target.parentElement.parentElement;
  var dropDownItems = dropDownList.querySelectorAll('.filter__drop-down  .filter__label');
  dropDownItems.forEach(function (it) {
    it.removeEventListener('click', dropDownItemClickHandler);
  });
  var select = filter.querySelector('.filter__select--opened');
  var choice = select.querySelector('.filter__choice');

  select.classList.remove('filter__select--opened');
  choice.textContent = evt.target.textContent;

  document.removeEventListener('click', filterSelectsCloseHandler);
};

var filterButtonViewClickHandler = function (button) {
  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    filterButtonsView.forEach(function (it) {
      it.classList.toggle('filter__button--active');
    });
    if (button.classList.contains('filter__button--grid')) {
      productsItems.classList.add('products__items--grid');
      productsItems.classList.remove('products__items--row');
    } else if (button.classList.contains('filter__button--row')) {
      productsItems.classList.remove('products__items--grid');
      productsItems.classList.add('products__items--row');
    }
  });
};

var filterSectionTop = filter.querySelector('.filter__top');
var filterSectionTopWidth = filterSectionTop.getBoundingClientRect().width;
var filterWidth = filter.getBoundingClientRect().width;

var animateFilterTop = function () {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    if (filterSectionTopWidth > filterWidth) {
      filterSectionTop.addEventListener('click', filterSectionTopClickHandler);
      filterSectionTop.addEventListener('mousedown', filterSectionTopMousedownHandler);
      filterSectionTop.addEventListener('wheel', filterSectionTopWheelHandler);
    }
  }
};

var isClick = true;

var filterSectionTopClickHandler = function (evt) {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    if (!isClick) {
      evt.preventDefault();
    }
  }
};

var x = 0;

var filterSectionTopMousedownHandler = function (evt) {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    evt.preventDefault();

    filterSectionTop.style.transition = '';

    var startCoords = {
      x: evt.clientX
    };

    isClick = true;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      if (x > 0) {
        x -= (startCoords.x - moveEvt.x) * 0.3;
      } else if (x < -filterSectionTopWidth + filterWidth - 50) {
        x -= (startCoords.x - moveEvt.x) * 0.3;
        filter.classList.add('filter--full');
      } else {
        x -= startCoords.x - moveEvt.x;
        filter.classList.remove('filter--full');
      }

      filterSectionTop.style.transform = 'translateX(' + x + 'px)';

      startCoords = {
        x: moveEvt.clientX
      };
    };

    isClick = false;

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      if (x > 0) {
        x = 0;
      } else if (x < -filterSectionTopWidth + filterWidth) {
        x = -filterSectionTopWidth + filterWidth;
      }

      filterSectionTop.style.transition = 'all 0.2s cubic-bezier(0.77, 0, 0.175, 1)';
      filterSectionTop.style.transform = 'translateX(' + x + 'px)';

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler, true);
    };

    filterSectionTop.addEventListener('click', filterSectionTopClickHandler);

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, true);
  }
};

var filterSectionTopWheelHandler = function (evt) {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    evt.preventDefault();

    if (evt.deltaY < 0) {
      x -= 40;
    } else {
      x += 40;
    }

    if (x > 0) {
      x = 0;
    } else if (x <= -filterSectionTopWidth + filterWidth) {
      x = -filterSectionTopWidth + filterWidth;
      filter.classList.add('filter--full');
    } else {
      filter.classList.remove('filter--full');
    }

    filterSectionTop.style.transition = '';
    filterSectionTop.style.transform = 'translateX(' + x + 'px)';
  }
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

var requestAnimationFrame = window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.msRequestAnimationFrame;

window.requestAnimationFrame = requestAnimationFrame;

var isScrollDown = true;
var requestId;
var coord = 0;

var animation = function () {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    var recentlyViewedProductsWidth = recentlyViewedProducts[0].getBoundingClientRect().width;
    coord = isScrollDown ? coord - 1 : coord + 1;

    recentlyViewedProducts.forEach(function (it) {
      if (coord < -recentlyViewedProductsWidth) {
        coord = 0;
      } else if (coord > 0) {
        coord = -recentlyViewedProductsWidth;
      }

      it.style.transform = 'translateX(' + coord + 'px)';
    });

    requestId = requestAnimationFrame(animation);
  }
};

var cancelAnimation = function () {
  cancelAnimationFrame(requestId);
};

var isMoved = false;
// var isClick = true;

var recentlyViewedItemClickHandler = function (evt) {
  if (!isClick) {
    evt.preventDefault();
  }
};

var recentlyViewedItemMouseDownHandler = function (evt) {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    evt.preventDefault();

    var recentlyViewedProductsWidth = recentlyViewedProducts[0].getBoundingClientRect().width;

    var startCoords = {
      x: evt.clientX
    };

    isClick = true;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      cancelAnimation();

      coord -= startCoords.x - moveEvt.x;

      recentlyViewedProducts.forEach(function (it) {
        if (coord < -recentlyViewedProductsWidth) {
          coord = 0;
        } else if (coord > 0) {
          coord = -recentlyViewedProductsWidth;
        }

        it.style.transform = 'translateX(' + coord + 'px)';
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

    for (var i = 0; i < recentlyViewedItems.length; i++) {
      recentlyViewedItems[i].addEventListener('click', recentlyViewedItemClickHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, true);
  }
};

var animateRecentlyViewedProducts = function () {
  if (!window.matchMedia('(max-width: 1023px)').matches) {
    var recentlyViewedScrollTop = recentlyViewed.getBoundingClientRect().top;

    window.addEventListener('scroll', function () {
      var newRecentlyViewedScrollTop = recentlyViewed.getBoundingClientRect().top;
      isScrollDown = recentlyViewedScrollTop >= newRecentlyViewedScrollTop;
      recentlyViewedScrollTop = newRecentlyViewedScrollTop;
    });

    requestAnimationFrame(animation);

    for (var i = 0; i < recentlyViewedItems.length; i++) {
      recentlyViewedItems[i].addEventListener('mousedown', recentlyViewedItemMouseDownHandler);
    }
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
  }
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

    filterButtonClickHandler();

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

    setTimeout(function () {
      $('.recently-viewed__products.slick-initialized').not('.recently-viewed__products--copy').slick('unslick');
    }, 50);

    cancelAnimation();
    animateRecentlyViewedProducts();
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

  animateFilterTop();

  getFilterBlockHeight();

  for (var i = 0; i < filterCaptions.length; i++) {
    filterCapionsClickHandler(filterCaptions[i], filterSelects[i]);
  }

  for (i = 0; i < filterButtonsView.length; i++) {
    filterButtonViewClickHandler(filterButtonsView[i]);
  }

  for (i = 0; i < citiesFooter.length; i++) {
    citiesFooterClickHandler(citiesFooter[i], addressesFooter[i]);
  }

  productsButton.addEventListener('click', productsButtonClickHandler);

  setCatalogNumbersValue();
});

$(document).ready(function () {
  $(window).on('load resize', function () {
    if (innerWidth >= 1024) {
      $('.recently-viewed__products.slick-initialized').slick('slickUnfilter');
      $('.recently-viewed__products.slick-initialized').slick('unslick');
    } else {
      if (!document.querySelector('.recently-viewed__products').classList.contains('slick-initialized')) {
        $('.recently-viewed__products').not('.recently-viewed__products--copy').slick({
          dots: true,
          arrows: true,
          infinite: true,
          appendArrows: $('.controls'),
          prevArrow: $('.recently-viewed  .controls__button--previous'),
          nextArrow: $('.recently-viewed  .controls__button--next'),
        });
      }
    }
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
      var minValue = $('.filter__block--opened  .filter__value--min');
      var maxValue = $('.filter__block--opened  .filter__value--max');
      var minInput = $('.filter__block--opened  .filter__cost--min');
      var maxInput = $('.filter__block--opened  .filter__cost--max');

      minValue.text(Math.floor(ui.values[0] / step) + 'K');
      minValue.css({left: ((ui.values[0] - min) / (max - min) * 100 - 1) + '%'});
      minInput[0].value = ui.values[0];

      maxValue.text(Math.floor(ui.values[1] / step) + 'K');
      maxValue.css({left: ((ui.values[1] - min) / (max - min) * 100 - 1) + '%'});
      maxInput[0].value = ui.values[1];
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
});
