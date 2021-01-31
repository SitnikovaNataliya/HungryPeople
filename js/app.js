// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
   for (let index = 0; index < sliders.length; index++) {
      let slider = sliders[index];
      if (!slider.classList.contains('swiper-bild')) {
         let slider_items = slider.children;
         if (slider_items) {
            for (let index = 0; index < slider_items.length; index++) {
               let el = slider_items[index];
               el.classList.add('swiper-slide');
            }
         }
         let slider_content = slider.innerHTML;
         let slider_wrapper = document.createElement('div');
         slider_wrapper.classList.add('swiper-wrapper');
         slider_wrapper.innerHTML = slider_content;
         slider.innerHTML = '';
         slider.appendChild(slider_wrapper);
         slider.classList.add('swiper-bild');
      }
   }
}

let slider_about = new Swiper('.slider-specialties', {

   grabCursor: true,
   parallax: true,
   loop: true,
   effect: 'fade',
   fadeEffect: {
      crossFade: true,
   },
   freeMode: true,
   autoplay: {
      delay: 3000,
      disableOnInteraction: false,
   },
   slidesPerView: 1,
   spaceBetween: 0,
   autoHeight: true,
   speed: 800,
   initialSlide: 1,
   // Dotts
   pagination: {
      el: '.slider-specialties__dotts',
      clickable: true,
   },
   on: {
      lazyImageReady: function () {
         ibg();
      },
   }
});
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
   }
};

function isIE() {
   ua = navigator.userAgent;
   var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
   return is_ie;
}
if (isIE()) {
   document.querySelector('body').classList.add('ie');
}
if (isMobile.any()) {
   document.querySelector('body').classList.add('_touch');
}

function testWebP(callback) {
   var webP = new Image();
   webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
   };
   webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
   if (support == true) {
      document.querySelector('body').classList.add('_webp');
   } else {
      document.querySelector('body').classList.add('_no-webp');
   }
});

function ibg() {
   if (isIE()) {
      let ibg = document.querySelectorAll("._ibg");
      for (var i = 0; i < ibg.length; i++) {
         if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
         }
      }
   }
}
ibg();

if (document.querySelector('.wrapper')) {
   setTimeout(function () {
      document.querySelector('.wrapper').classList.add('_loaded');
   }, 0)
}

let unlock = true;

//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
   let delay = 500;
   let menuBody = document.querySelector(".menu__body");
   iconMenu.addEventListener("click", function (e) {
      if (unlock) {
         body_lock(delay);
         iconMenu.classList.toggle("_active");
         menuBody.classList.toggle("_active");
      }
   });
};

function menu_close() {
   let iconMenu = document.querySelector(".icon-menu");
   let menuBody = document.querySelector(".menu__body");
   iconMenu.classList.remove("_active");
   menuBody.classList.remove("_active");
}
//=================
//BodyLock
function body_lock(delay) {
   let body = document.querySelector("body");
   if (body.classList.contains('_lock')) {
      body_lock_remove(delay);
   } else {
      body_lock_add(delay);
   }
}

function body_lock_remove(delay) {
   let body = document.querySelector("body");
   if (unlock) {
      let lock_padding = document.querySelectorAll("._lp");
      setTimeout(() => {
         for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = '0px';
         }
         body.style.paddingRight = '0px';
         body.classList.remove("_lock");
      }, delay);

      unlock = false;
      setTimeout(function () {
         unlock = true;
      }, delay);
   }
}

function body_lock_add(delay) {
   let body = document.querySelector("body");
   if (unlock) {
      let lock_padding = document.querySelectorAll("._lp");
      for (let index = 0; index < lock_padding.length; index++) {
         const el = lock_padding[index];
         el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
      }
      body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
      body.classList.add("_lock");

      unlock = false;
      setTimeout(function () {
         unlock = true;
      }, delay);
   }
}

//=================
//Tabs
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
   let tab = tabs[index];
   let tabs_items = tab.querySelectorAll("._tabs-item");
   let tabs_blocks = tab.querySelectorAll("._tabs-block");
   for (let index = 0; index < tabs_items.length; index++) {
      let tabs_item = tabs_items[index];
      tabs_item.addEventListener("click", function (e) {
         for (let index = 0; index < tabs_items.length; index++) {
            let tabs_item = tabs_items[index];
            tabs_item.classList.remove('_active');
            tabs_blocks[index].classList.remove('_active');
         }
         tabs_item.classList.add('_active');
         tabs_blocks[index].classList.add('_active');
         e.preventDefault();
      });
   }
}

//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
   target.style.transitionProperty = 'height, margin, padding';
   target.style.transitionDuration = duration + 'ms';
   target.style.height = target.offsetHeight + 'px';
   target.offsetHeight;
   target.style.overflow = 'hidden';
   target.style.height = 0;
   target.style.paddingTop = 0;
   target.style.paddingBottom = 0;
   target.style.marginTop = 0;
   target.style.marginBottom = 0;
   window.setTimeout(() => {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
   }, duration);
}
let _slideDown = (target, duration = 500) => {
   target.style.removeProperty('display');
   let display = window.getComputedStyle(target).display;
   if (display === 'none')
      display = 'block';

   target.style.display = display;
   let height = target.offsetHeight;
   target.style.overflow = 'hidden';
   target.style.height = 0;
   target.style.paddingTop = 0;
   target.style.paddingBottom = 0;
   target.style.marginTop = 0;
   target.style.marginBottom = 0;
   target.offsetHeight;
   target.style.transitionProperty = "height, margin, padding";
   target.style.transitionDuration = duration + 'ms';
   target.style.height = height + 'px';
   target.style.removeProperty('padding-top');
   target.style.removeProperty('padding-bottom');
   target.style.removeProperty('margin-top');
   target.style.removeProperty('margin-bottom');
   window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
   }, duration);
}
let _slideToggle = (target, duration = 500) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      if (window.getComputedStyle(target).display === 'none') {
         return _slideDown(target, duration);
      } else {
         return _slideUp(target, duration);
      }
   }
}
//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
   selects_init();
}

function selects_init() {
   for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      select_init(select);
   }
   document.addEventListener('click', function (e) {
      selects_close(e);
   });
   document.addEventListener('keydown', function (e) {
      if (e.code === 'Escape') {
         selects_close(e);
      }
   });
}

function selects_close(e) {
   const selects = document.querySelectorAll('.select');
   if (!e.target.closest('.select')) {
      for (let index = 0; index < selects.length; index++) {
         const select = selects[index];
         const select_body_options = select.querySelector('.select__options');
         select.classList.remove('_active');
         _slideUp(select_body_options, 100);
      }
   }
}

function select_init(select) {
   const select_parent = select.parentElement;
   const select_modifikator = select.getAttribute('class');
   const select_selected_option = select.querySelector('option:checked');
   select.setAttribute('data-default', select_selected_option.value);
   select.style.display = 'none';

   select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

   let new_select = select.parentElement.querySelector('.select');
   new_select.appendChild(select);
   select_item(select);
}

function select_item(select) {
   const select_parent = select.parentElement;
   const select_items = select_parent.querySelector('.select__item');
   const select_options = select.querySelectorAll('option');
   const select_selected_option = select.querySelector('option:checked');
   const select_selected_text = select_selected_option.text;
   const select_type = select.getAttribute('data-type');

   if (select_items) {
      select_items.remove();
   }

   let select_type_content = '';
   if (select_type == 'input') {
      select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
   } else {
      select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
   }

   select_parent.insertAdjacentHTML('beforeend',
      '<div class="select__item">' +
      '<div class="select__title">' + select_type_content + '</div>' +
      '<div class="select__options">' + select_get_options(select_options) + '</div>' +
      '</div></div>');

   select_actions(select, select_parent);
}

function select_actions(original, select) {
   const select_item = select.querySelector('.select__item');
   const select_body_options = select.querySelector('.select__options');
   const select_options = select.querySelectorAll('.select__option');
   const select_type = original.getAttribute('data-type');
   const select_input = select.querySelector('.select__input');

   select_item.addEventListener('click', function () {
      let selects = document.querySelectorAll('.select');
      for (let index = 0; index < selects.length; index++) {
         const select = selects[index];
         const select_body_options = select.querySelector('.select__options');
         if (select != select_item.closest('.select')) {
            select.classList.remove('_active');
            _slideUp(select_body_options, 100);
         }
      }
      _slideToggle(select_body_options, 100);
      select.classList.toggle('_active');
   });

   for (let index = 0; index < select_options.length; index++) {
      const select_option = select_options[index];
      const select_option_value = select_option.getAttribute('data-value');
      const select_option_text = select_option.innerHTML;

      if (select_type == 'input') {
         select_input.addEventListener('keyup', select_search);
      } else {
         if (select_option.getAttribute('data-value') == original.value) {
            select_option.style.display = 'none';
         }
      }
      select_option.addEventListener('click', function () {
         for (let index = 0; index < select_options.length; index++) {
            const el = select_options[index];
            el.style.display = 'block';
         }
         if (select_type == 'input') {
            select_input.value = select_option_text;
            original.value = select_option_value;
         } else {
            select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
            original.value = select_option_value;
            select_option.style.display = 'none';
         }
      });
   }
}

function select_get_options(select_options) {
   if (select_options) {
      let select_options_content = '';
      for (let index = 0; index < select_options.length; index++) {
         const select_option = select_options[index];
         const select_option_value = select_option.value;
         if (select_option_value != '') {
            const select_option_text = select_option.text;
            select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
         }
      }
      return select_options_content;
   }
}

function select_search(e) {
   let select_block = e.target.closest('.select ').querySelector('.select__options');
   let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
   let select_search_text = e.target.value.toUpperCase();

   for (let i = 0; i < select_options.length; i++) {
      let select_option = select_options[i];
      let select_txt_value = select_option.textContent || select_option.innerText;
      if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
         select_option.style.display = "";
      } else {
         select_option.style.display = "none";
      }
   }
}

function selects_update_all() {
   let selects = document.querySelectorAll('select');
   if (selects) {
      for (let index = 0; index < selects.length; index++) {
         const select = selects[index];
         select_item(select);
      }
   }
}

//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
   if (inputs.length > 0) {
      for (let index = 0; index < inputs.length; index++) {
         const input = inputs[index];
         const input_g_value = input.getAttribute('data-value');
         input_placeholder_add(input);
         if (input.value != '' && input.value != input_g_value) {
            input_focus_add(input);
         }
         input.addEventListener('focus', function (e) {
            if (input.value == input_g_value) {
               input_focus_add(input);
               input.value = '';
            }
            if (input.getAttribute('data-type') === "pass") {
               input.setAttribute('type', 'password');
            }

            form_remove_error(input);
         });
         input.addEventListener('blur', function (e) {
            if (input.value == '') {
               input.value = input_g_value;
               input_focus_remove(input);
               if (input.classList.contains('_mask')) {
                  input_clear_mask(input, input_g_value);
               }
               if (input.getAttribute('data-type') === "pass") {
                  input.setAttribute('type', 'text');
               }
            }
         });

         if (input.classList.contains('_date')) {
            datepicker(input, {
               customDays: ["Su", "Mo", "Tu", "We", "Th", "Fb", "Sa"],
               customMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
               formatter: (input, date, instance) => {
                  const value = date.toLocaleDateString()
                  input.value = value
               },
               onSelect: function (input, instance, date) {
                  input_focus_add(input.el);
               }
            });
         }
      }
   }
}

function input_placeholder_add(input) {
   const input_g_value = input.getAttribute('data-value');
   if (input.value == '' && input_g_value != '') {
      input.value = input_g_value;
   }
}

function input_focus_add(input) {
   input.classList.add('_focus');
   input.parentElement.classList.add('_focus');
}

function input_focus_remove(input) {
   input.classList.remove('_focus');
   input.parentElement.classList.remove('_focus');
}

function input_clear_mask(input, input_g_value) {
   input.inputmask.remove();
   input.value = input_g_value;
   input_focus_remove(input);
}
let scr_body = document.querySelector('body');
let scr_blocks = document.querySelectorAll('._scr-sector');
let scr_items = document.querySelectorAll('._scr-item');
// let scr_fix_block = document.querySelectorAll('._side-wrapper');
let scr_min_height = 750;

let scrolling = true;
let scrolling_full = true;

let scrollDirection = 0;

//ScrollOnScroll
window.addEventListener('scroll', scroll_scroll);

function scroll_scroll() {
   //scr_body.setAttribute('data-scroll', pageYOffset);
   let src_value = pageYOffset;
   let header = document.querySelector('header.header');
   if (header !== null) {
      if (src_value > 1) {
         header.classList.add('_scroll');
      } else {
         header.classList.remove('_scroll');
      }
   }
   if (scr_blocks.length > 0) {
      for (let index = 0; index < scr_blocks.length; index++) {
         let block = scr_blocks[index];
         let block_offset = offset(block).top;
         let block_height = block.offsetHeight;

         if ((pageYOffset > block_offset - window.innerHeight / 1.5) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
            block.classList.add('_scr-sector_active');
         } else {
            if (block.classList.contains('_scr-sector_active')) {
               block.classList.remove('_scr-sector_active');
            }
         }
         if ((pageYOffset > block_offset - window.innerHeight / 2) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
            if (!block.classList.contains('_scr-sector_current')) {
               block.classList.add('_scr-sector_current');
            }
         } else {
            if (block.classList.contains('_scr-sector_current')) {
               block.classList.remove('_scr-sector_current');
            }
         }
      }
   }
   if (scr_items.length > 0) {
      for (let index = 0; index < scr_items.length; index++) {
         let scr_item = scr_items[index];
         let scr_item_offset = offset(scr_item).top;
         let scr_item_height = scr_item.offsetHeight;


         let scr_item_point = window.innerHeight - (window.innerHeight - scr_item_height / 3);
         if (window.innerHeight > scr_item_height) {
            scr_item_point = window.innerHeight - scr_item_height / 3;
         }

         if ((src_value > scr_item_offset - scr_item_point) && src_value < (scr_item_offset + scr_item_height)) {
            scr_item.classList.add('_active');
            scroll_load_item(scr_item);
         } else {
            scr_item.classList.remove('_active');
         }
         if (((src_value > scr_item_offset - window.innerHeight))) {
            if (scr_item.querySelectorAll('._lazy').length > 0) {
               scroll_lazy(scr_item);
            }
         }
      }
   }
   scrollDirection = src_value <= 0 ? 0 : src_value;
}
setTimeout(function () {
   scroll_scroll();
}, 100);

function scroll_lazy(scr_item) {
   let lazy_src = scr_item.querySelectorAll('*[data-src]');
   if (lazy_src.length > 0) {
      for (let index = 0; index < lazy_src.length; index++) {
         const el = lazy_src[index];
         if (!el.classList.contains('_loaded')) {
            el.setAttribute('src', el.getAttribute('data-src'));
            el.classList.add('_loaded');
         }
      }
   }
   let lazy_srcset = scr_item.querySelectorAll('*[data-srcset]');
   if (lazy_srcset.length > 0) {
      for (let index = 0; index < lazy_srcset.length; index++) {
         const el = lazy_srcset[index];
         if (!el.classList.contains('_loaded')) {
            el.setAttribute('srcset', el.getAttribute('data-srcset'));
            el.classList.add('_loaded');
         }
      }
   }
}

function scroll_load_item(scr_item) {
   if (scr_item.classList.contains('_load-map') && !scr_item.classList.contains('_loaded-map')) {
      let map_item = document.getElementById('map');
      if (map_item) {
         scr_item.classList.add('_loaded-map');
         map();
      }
   }
}

//FullScreenScroll
if (scr_blocks.length > 0 && !isMobile.any()) {
   disableScroll();
   window.addEventListener('wheel', full_scroll);
}

function full_scroll(e) {
   let viewport_height = window.innerHeight;
   if (viewport_height >= scr_min_height) {
      if (scrolling_full) {
         // ВЫЧИСЛИТЬ!!!
         let current_scroll = pageYOffset;
         //
         let current_block = document.querySelector('._scr-sector._scr-sector_current');
         let current_block_pos = offset(current_block).top;
         let current_block_height = current_block.offsetHeight;
         let current_block_next = current_block.nextElementSibling;
         let current_block_prev = current_block.previousElementSibling;
         let block_pos;
         if (e.keyCode == 40 || e.keyCode == 34 || e.deltaX > 0 || e.deltaY < 0) {
            if (current_block_prev) {
               let current_block_prev_height = current_block_prev.offsetHeight;
               block_pos = offset(current_block_prev).top;
               if (current_block_height <= viewport_height) {
                  if (current_block_prev_height >= viewport_height) {
                     block_pos = block_pos + (current_block_prev_height - viewport_height);
                     full_scroll_to_sector(block_pos);
                  }
               } else {
                  enableScroll();
                  if (current_scroll <= current_block_pos) {
                     full_scroll_to_sector(block_pos);
                  }
               }
            } else {
               full_scroll_pagestart();
            }
         } else if (e.keyCode == 38 || e.keyCode == 33 || e.deltaX < 0 || e.deltaY > 0) {
            if (current_block_next) {
               block_pos = offset(current_block_next).top;
               if (current_block_height <= viewport_height) {
                  full_scroll_to_sector(block_pos);
               } else {
                  enableScroll();
                  if (current_scroll >= block_pos - viewport_height) {
                     full_scroll_to_sector(block_pos);
                  }
               }
            } else {
               full_scroll_pageend();
            }
         }
      } else {
         disableScroll();
      }
   } else {
      enableScroll();
   }
}

function full_scroll_to_sector(pos) {
   disableScroll();
   scrolling_full = false;
   _goto(pos, 800);

   let scr_pause = 500;
   if (navigator.appVersion.indexOf("Mac") != -1) {
      scr_pause = 1000;
   };
   setTimeout(function () {
      scrolling_full = true;
   }, scr_pause);
}


//ScrollOnClick (Navigation)
let link = document.querySelectorAll('._goto-block');
if (link) {
   let blocks = [];
   for (let index = 0; index < link.length; index++) {
      let el = link[index];
      let block_name = el.getAttribute('href').replace('#', '');
      if (block_name != '' && !~blocks.indexOf(block_name)) {
         blocks.push(block_name);
      }
      el.addEventListener('click', function (e) {
         if (document.querySelector('.menu__body._active')) {
            menu_close();
            body_lock_remove(500);
         }
         let target_block_class = el.getAttribute('href').replace('#', '');
         let target_block = document.querySelector('.' + target_block_class);

         let targetH = offset(target_block).top - window.innerHeight / 4.5;
         _goto(targetH, 500);
         e.preventDefault();
      })
   }

   window.addEventListener('scroll', function (el) {
      let old_current_link = document.querySelectorAll('._goto-block._active');

      if (old_current_link) {
         for (let index = 0; index < old_current_link.length; index++) {
            let el = old_current_link[index];
            el.classList.remove('_active');
         }
      }
      for (let index = 0; index < blocks.length; index++) {
         let block = blocks[index];
         let block_item = document.querySelector('.' + block);
         if (block_item) {
            let block_offset = offset(block_item).top;
            let block_height = block_item.offsetHeight;
            if ((pageYOffset > block_offset - window.innerHeight / 3) && pageYOffset < (block_offset + block_height) - window.innerHeight / 3) {
               let current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');
               for (let index = 0; index < current_links.length; index++) {
                  let current_link = current_links[index];
                  current_link.classList.add('_active');
               }
            }
         }
      }
   })
}


function _goto(target_block, speed, offset = 0) {
   let header = '';
   let options = {
      speedAsDuration: true,
      speed: speed,
      header: header,
      offset: offset,
      easing: 'easeOutQuad',
   };
   let scr = new SmoothScroll();
   scr.animateScroll(target_block, '', options);
}

//SameFunctions
function offset(el) {
   var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
   return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
   }
}

function disableScroll() {
   if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
   document.addEventListener('wheel', preventDefault, {
      passive: false
   }); // Disable scrolling in Chrome
   window.onwheel = preventDefault; // modern standard
   window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
   window.ontouchmove = preventDefault; // mobile
   document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
   if (window.removeEventListener)
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
   document.removeEventListener('wheel', preventDefault, {
      passive: false
   }); // Enable scrolling in Chrome
   window.onmousewheel = document.onmousewheel = null;
   window.onwheel = null;
   window.ontouchmove = null;
   document.onkeydown = null;
}

function preventDefault(e) {
   e = e || window.event;
   if (e.preventDefault)
      e.preventDefault();
   e.returnValue = false;
}

let new_pos = pageYOffset;

function scroll_animate(event) {
   let window_height = window.innerHeight;
   let content_height = document.querySelector('.wrapper').offsetHeight;
   let start_position = pageYOffset;
   let pos_add = 100;

   if (event.keyCode == 40 || event.keyCode == 34 || event.deltaX > 0 || event.deltaY < 0) {
      new_pos = new_pos - pos_add;
   } else if (event.keyCode == 38 || event.keyCode == 33 || event.deltaX < 0 || event.deltaY > 0) {
      new_pos = new_pos + pos_add;
   }
   if (new_pos > (content_height - window_height)) new_pos = content_height - window_height;
   if (new_pos < 0) new_pos = 0;

   if (scrolling) {
      scrolling = false;
      _goto(new_pos, 1000);

      let scr_pause = 100;
      if (navigator.appVersion.indexOf("Mac") != -1) {
         scr_pause = scr_pause * 2;
      };
      setTimeout(function () {
         scrolling = true;
         _goto(new_pos, 1000);
      }, scr_pause);
   }
}
/********************************************/
window.onbeforeunload = function () {
   window.scrollTo(0, 0);
};


//********************************************/

// Button Down
let buttonDown = document.querySelector('.button-down');

if (buttonDown) {
   buttonDown.addEventListener("click", function (e) {
      e.preventDefault();

      let headerActive = document.querySelector('.header');
      let headerH = headerActive.offsetHeight;

      let intro = document.querySelector('.intro');
      let introH = intro.offsetHeight;

      let targetH = introH - headerH;
      window.scrollBy({
         top: targetH,
         behavior: 'smooth'
      });
   });
}

// Btn Boot Table

let buttonBookTable = document.querySelector('.btn_bookTable');
if (buttonBookTable) {
   buttonBookTable.addEventListener("click", function (e) {
      e.preventDefault();

      let bookTableBlock = document.querySelector('.book-table');
      let bookTableBlockTop = offset(bookTableBlock).top;

      let headerActive = document.querySelector('.header');
      let headerH = headerActive.offsetHeight;

      let targetH = bookTableBlockTop - headerH;
      window.scrollBy({
         top: targetH,
         behavior: 'smooth'
      });
   });
}

//Placeholders Phone

let inputsPhone = document.querySelectorAll('.input_phone');

if (inputsPhone.length > 0) {
   for (let i = 0; i < inputsPhone.length; i++) {
      const input = inputsPhone[i];
      input.classList.add('_mask');
      Inputmask("+38(999) 999 9999", {
         clearIncomplete: true,
         clearMaskOnLostFocus: true,
         "placeholder": "+38(___) ____ __ __",
         showMaskOnHover: false,
      }).mask(input);
   }
};


let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

let fieldsEmail = document.querySelectorAll('.input_mail');
let btnsBook = document.querySelectorAll('.btn-book');
let forms = document.querySelectorAll('form');

if (btnsBook.length > 0) {
   for (let i = 0; i < btnsBook.length; i++) {
      const btn = btnsBook[i];
      btn.addEventListener("click", function (e) {
         e.preventDefault();
         let emailAddress = fieldsEmail[i].value;
         if (reg.test(emailAddress) == false) {
            fieldsEmail[i].style.cssText = "border: 1px solid red";
         } else {
            fieldsEmail[i].style.cssText = "border: none";
            forms[i].reset();
         }
      });
   }
}


/* -----------------------AOS js -------------------- */
/* https://github.com/michalsnik/aos */

AOS.init({
   // disable: 'mobile', // accepts following values: false, 'tablet', 'phone', boolean, expression or function
   disable: function () {
      let maxWidth = 800;
      return window.innerWidth < maxWidth;
   },
   startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
   initClassName: 'aos-init', // class applied after initialization
   animatedClassName: 'aos-animate', // class applied on animation
   useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
   disableMutationObserver: false, // disables automatic mutations' detections (advanced)
   debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
   throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


   // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
   offset: 80, // offset (in px) from the original trigger point
   delay: 0, // values from 0 to 3000, with step 50ms
   duration: 800, // values from 0 to 3000, with step 50ms
   easing: 'ease', // default easing for AOS animations
   once: false, // whether animation should happen only once - while scrolling down
   mirror: false, // whether elements should animate out while scrolling past them
   anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});