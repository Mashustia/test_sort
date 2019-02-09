'use strict';

(function () {
  var mockData = [
    {
      'name': 'product1',
      'description': 'text description product1',
      'price': '1000'
    },
    {
      'name': 'product2',
      'description': 'text description product2',
      'price': '1500'
    },
    {
      'name': 'product3',
      'description': 'text description product3',
      'price': '500'
    },
    {
      'name': 'product4',
      'description': 'text description product4',
      'price': '2000'
    },
    {
      'name': 'product5',
      'description': 'text description product5',
      'price': '1000'
    },
    {
      'name': 'product6',
      'description': 'text description product6',
      'price': '500'
    }];

  /**
   * Функция записывает в объект данные из массива.
   * @function
   * @param {Node} productTemplate template для catalog__item.
   * @param {number} productData элемент массива из которого берется информация о товаре.
   * @return {Node} элемент с заполненной разметкой.
   */
  var fillProductItem = function (productTemplate, productData) {
    productTemplate.querySelector('.product__title').textContent = productData.name;
    productTemplate.querySelector('.product__price').textContent = productData.price;
    productTemplate.querySelector('.product__description').textContent = productData.description;

    return productTemplate;
  };

  /**
   * Функция записывает элементы в фрагмент.
   * @function
   * @param {array} products массив из которого берется информация.
   * @param {object} productTemplate темплейт для товара.
   */
  var writeElements = function (products, productTemplate) {
    products.forEach(function (product) {
      fragment.appendChild(fillProductItem(productTemplate.cloneNode(true), product));
    });
  };

  /**
   * Функция находит сравнивает цену у priceA и priceB и выстраивает массив от максимума по цене к минимуму
   * @function
   * @param {object} pictureA
   * @param {object} pictureB
   * @return {number}
   */
  var maxToMin = function (priceA, priceB) {
    return priceB.price - priceA.price;
  };

  /**
   * Функция находит сравнивает цену у priceA и priceB и выстраивает массив от минимума по цене к максимуму
   * @function
   * @param {object} pictureA
   * @param {object} pictureB
   * @return {number}
   */
  var minToMax = function (priceA, priceB) {
    return priceA.price - priceB.price;
  };

  /**
   * Функция добавляет кнопке класс sort__button--active
   * @function
   * @param {event} evt
   */
  var addActiveButtonClass = function (evt) {
    var activeButton = document.querySelector('.sort__button--active');
    if (activeButton) {
      activeButton.classList.remove('sort__button--active');
    }
    evt.target.classList.add('sort__button--active');
  };

  /**
   * Функция удаляет из разметки фотографии товары .catalog__item
   * @function
   */
  var removeOldProducts = function () {
    var productArray = document.querySelectorAll('.product');

    Array.from(productArray).forEach(function (product) {
      product.remove();
    });
  };

  /**
   * Функция создает список товаров
   * @function
   * @param {array} products массив с данными о товарах, которые необходимо отрисовать
   * @param {event} button активная кнопка
   */
  var createProducts = function (products, button) {
    removeOldProducts();
    writeElements(products, productTemplate);
    catalogList.appendChild(fragment);
    addActiveButtonClass(button);
  };


  var productTemplate = document.querySelector('#catalog__item').content.querySelector('.catalog__item');
  var catalogList = document.querySelector('.catalog__list');
  var fragment = document.createDocumentFragment();

  var onLoad = function () {
    var increase = document.querySelector('.sort__button--increase');
    var decrease = document.querySelector('.sort__button--decrease');

    writeElements(mockData, productTemplate);
    catalogList.appendChild(fragment);

    decrease.addEventListener('click', window.debounce(function (increaseEvt) {
      var productsArray = mockData.slice().sort(maxToMin);
      createProducts(productsArray, increaseEvt);
    }));

    increase.addEventListener('click', window.debounce(function (increaseEvt) {
      var productsArray = mockData.slice().sort(minToMax);
      createProducts(productsArray, increaseEvt);
    }));
  };

  onLoad();
}) ();

