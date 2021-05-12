$(function () {
    $("[data-toggle]").on("click", function () {
        let id = $(this).data("toggle");
        $(id).toggleClass("hidden")
    });
    $(".js-video-popup").magnificPopup({
        type: "iframe",
        iframe: {
            patterns: {
                youtube: {
                    src: "https://www.youtube.com/embed/%id%?autoplay=1"
                }
            }
        }
    });
    $("[data-jump]").on("click", function () {
        var href = $(this).attr("href");
        Jump(href)
    });
    $('[data-toggle="order"]').magnificPopup({
        type: "inline",
        showCloseBtn: false
    });
    $('[data-toggle="modal"]').on("click", function () {
        $.magnificPopup.close()
    });



});


    //Ymap start
    var spinner = $('.ymap-container').children('.loader');
    var check_if_load = 0;
    var myMapTemp, myPlacemarkTemp;
    
    
    function init () {
      var myMapTemp = new ymaps.Map("map-yandex", {
        center: [55.730138, 37.594238],
        zoom: 7,
        controls: ['zoomControl', 'fullscreenControl']
      });
    
      var myPlacemarkTemp = new ymaps.Placemark([55.730138, 37.594238], {
          balloonContent: "Здесь может быть ваш адрес",
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#imageWithContent',
          // Своё изображение иконки метки.
          iconImageHref: 'img/map-marker.png',
          // Размеры метки.
          iconImageSize: [50, 50],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-25, -50],
      });
      
      myMapTemp.geoObjects.add(myPlacemarkTemp);
    
      //Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
      var layer = myMapTemp.layers.get(0).get(0);
    
      //Решение по callback-у для определния полной загрузки карты: http://ru.stackoverflow.com/questions/463638/callback-загрузки-карты-yandex-map
      waitForTilesLoad(layer).then(function() {
        //Скрываем
        spinner.removeClass('is-active');
      });
    }
    
    function waitForTilesLoad(layer) {
      return new ymaps.vow.Promise(function (resolve, reject) {
        var tc = getTileContainer(layer), readyAll = true;
        tc.tiles.each(function (tile, number) {
          if (!tile.isReady()) {
            readyAll = false;
          }
        });
        if (readyAll) {
          resolve();
        } else {
          tc.events.once("ready", function() {
            resolve();
          });
        }
      });
    }
    
    function getTileContainer(layer) {
      for (var k in layer) {
        if (layer.hasOwnProperty(k)) {
          if (
            layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
            || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
          ) {
            return layer[k];
          }
        }
      }
      return null;
    }
    
    function loadScript(url, callback){
    
      var script = document.createElement("script");
    
      if (script.readyState){  //IE
        script.onreadystatechange = function(){
          if (script.readyState == "loaded" ||
                  script.readyState == "complete"){
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {  //Другие браузеры
        script.onload = function(){
          callback();
        };
      }
    
      script.src = url;
      document.getElementsByTagName("head")[0].appendChild(script);
    }
    
    var ymap = function() {
      $('.ymap-container').mouseenter(function(){
          if (check_if_load == 0) {
            check_if_load = 1;
    
            spinner.addClass('is-active');
    
            loadScript("https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A7427e9ad1236b0037a5fae3166979d9cfb466f7de8aa6aaf2371d66610fb5beb&amp;width=100%25&amp;height=360&amp;lang=ru_RU&amp;scroll=true", function(){
               ymaps.load(init);
            });         

                    // Здесь ваша загрузка карты. Ниже допишем строки.

        /* Поймаем событие завершения загрузки карты. */
        // Сначала мы получаем первый экземпляр коллекции слоев, потом первый слой коллекции.
        var layer = myMap.layers.get(0).get(0);
        // Отслеживаем событие окончания отрисовки тайлов.
        waitForTilesLoad(layer).then(function() {
            // Вызываем, например, печать документа window.print();
            alert('Карта загружена');
        });
    }

    // Получить слой, содержащий тайлы.
    function getTileContainer(layer) {
        for (var k in layer) {
            if (layer.hasOwnProperty(k)) {
                if (
                    layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
                    || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
                ) {
                    return layer[k];
                }
            }
        }
        return null;
    }

    // Определить, все ли тайлы загружены. Возвращает Promise.
    function waitForTilesLoad(layer) {
        return new ymaps.vow.Promise(function (resolve, reject) {
            var tc = getTileContainer(layer), readyAll = true;
            tc.tiles.each(function (tile, number) {
                if (!tile.isReady()) {
                    readyAll = false;
                }
            });
            if (readyAll) {
                resolve();
            } else {
                tc.events.once("ready", function() {
                    resolve();
                });
            }
        });
    }
              
    $(function() {
    
      //Map Yandex
      ymap();
    
    });





! function (o, n) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : o.Jump = n()
}(this, function () {
    "use strict";
    var o = function (o, n, t, e) {
            return o /= e / 2, o < 1 ? t / 2 * o * o + n : (o--, -t / 2 * (o * (o - 2) - 1) + n)
        },
        n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
            return typeof o
        } : function (o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o
        },
        t = function () {
            function t() {
                return window.scrollY || window.pageYOffset
            }

            function e(o) {
                return o.getBoundingClientRect().top + c
            }

            function i(o) {
                b || (b = o), p = o - b, v = s(p, c, y, m), window.scrollTo(0, v), p < m ? window.requestAnimationFrame(i) : r()
            }

            function r() {
                window.scrollTo(0, c + y), d && l && (d.setAttribute("tabindex", "-1"), d.focus()), "function" == typeof w && w(), b = !1
            }

            function u(r) {
                var u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                switch (m = u.duration || 1e3, a = u.offset || 0, w = u.callback, s = u.easing || o, l = u.a11y || !1, c = t(), "undefined" == typeof r ? "undefined" : n(r)) {
                    case "number":
                        d = void 0, l = !1, f = c + r;
                        break;
                    case "object":
                        d = r, f = e(d);
                        break;
                    case "string":
                        d = document.querySelector(r), f = e(d)
                }
                switch (y = f - c + a, n(u.duration)) {
                    case "number":
                        m = u.duration;
                        break;
                    case "function":
                        m = u.duration(y)
                }
                window.requestAnimationFrame(i)
            }
            var d = void 0,
                c = void 0,
                f = void 0,
                a = void 0,
                s = void 0,
                l = void 0,
                y = void 0,
                m = void 0,
                b = void 0,
                p = void 0,
                v = void 0,
                w = void 0;
            return u
        },
        e = t();
    return e
});
}