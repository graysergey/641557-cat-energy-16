// Реализует работу гамбургера переключения меню
const toggleButton = document.querySelector('.toggle-menu');
const menu = document.querySelector('.main-menu');
const KEY_ENTER = 13;

const toggleMenu = (evt) => {
  evt.preventDefault();
  if (evt.keyCode === KEY_ENTER) {
    menu.classList.toggle('main-menu--show');
    toggleButton.classList.toggle('toggle-menu--close');
  }
  if (evt.type === "click") {
    menu.classList.toggle('main-menu--show');
    toggleButton.classList.toggle('toggle-menu--close');
  }
}
toggleButton.addEventListener('click', toggleMenu);
toggleButton.addEventListener('keydown', toggleMenu);


// Реализует работу слайдера
const slider = document.querySelector('.slider');
const wrapperImage = slider.querySelector('.slider__before-wrapper');
const barElement = slider.querySelector('.slider-control__progress-bar');
const toggleElement = barElement.querySelector('.slider-control__toggle');
const sliderWidth = slider.offsetWidth;
const barWidth = barElement.offsetWidth;
const toggleWidth = toggleElement.offsetWidth;

const LOCATION_TOGGLE_MIN_X = 0;
const LOCATION_TOGGLE_MAX_X = barWidth;
const PERCENT = 100;
const ONE_PERCENT_WIDTH_IMAGE = PERCENT / sliderWidth;
const MIN_WIDTH_IMG = (sliderWidth - barWidth) / 2;
const TOGGLE_HALF_WIDTH = toggleWidth / 2;
const KEY_ARROW_LEFT = 37;
const KEY_ARROW_RIGHT = 39;

// обработчик перемещения ползунка
toggleElement.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  let startCoords = evt.clientX;

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    const shift = startCoords - moveEvt.clientX;
    startCoords = moveEvt.clientX;
    const newCoordsX = toggleElement.offsetLeft - shift;
    const minCoords = LOCATION_TOGGLE_MIN_X;
    const maxCoords = LOCATION_TOGGLE_MAX_X;
    if (newCoordsX < minCoords) {
      newCoordsX = minCoords;
    }
    if (newCoordsX > maxCoords) {
      newCoordsX = maxCoords;
    }
    toggleElement.style.left = newCoordsX + 'px';
    wrapperImage.style.width = MIN_WIDTH_IMG + newCoordsX + 'px';
  };

  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    slider.removeEventListener('mousemove', onMouseMove);
    slider.removeEventListener('mouseup', onMouseUp);
  };

  slider.addEventListener('mousemove', onMouseMove);
  slider.addEventListener('mouseup', onMouseUp);
});


// Обработчик на строку бара для перемещения ползунка
barElement.addEventListener('click', function (evt) {
  const element = evt.srcElement || evt.target;
  if (!element.classList.contains('slider-control__toggle')) {
    toggleElement.style.left = evt.offsetX + 'px';
    wrapperImage.style.width = MIN_WIDTH_IMG + evt.offsetX + 'px';
  }
});


// Обработчик перемещения ползунка стрелками (доступность)
toggleElement.addEventListener('keydown', function (evt) {
  console.log(evt);
  if (evt.keyCode === KEY_ARROW_LEFT) {
    evt.preventDefault();
    if (toggleElement.offsetLeft > TOGGLE_HALF_WIDTH) {
      toggleElement.style.left = toggleElement.offsetLeft - TOGGLE_HALF_WIDTH + 'px';
      wrapperImage.style.width = (MIN_WIDTH_IMG + toggleElement.offsetLeft + TOGGLE_HALF_WIDTH) - TOGGLE_HALF_WIDTH + 'px';
    }
  }
  if (evt.keyCode === KEY_ARROW_RIGHT) {
    evt.preventDefault();
    if (toggleElement.offsetLeft < LOCATION_TOGGLE_MAX_X - TOGGLE_HALF_WIDTH) {
      toggleElement.style.left = toggleElement.offsetLeft + TOGGLE_HALF_WIDTH + 'px';
      wrapperImage.style.width = (MIN_WIDTH_IMG + toggleElement.offsetLeft - TOGGLE_HALF_WIDTH) + TOGGLE_HALF_WIDTH + 'px';
    }
  }
})


// Реализует работу кнопок слайдера - было/стало
const buttonBefore = slider.querySelector('.slider-control__btn--before');
const buttonAfter = slider.querySelector('.slider-control__btn--after');

const setBeforeOptions = (evt) => {
  if (evt.keyCode === KEY_ENTER) {
    evt.preventDefault();
    toggleElement.style.left = LOCATION_TOGGLE_MIN_X + 'px';
    wrapperImage.style.width = MIN_WIDTH_IMG + 'px';
  }
  if (evt.type === "click") {
    evt.preventDefault();
    toggleElement.style.left = LOCATION_TOGGLE_MIN_X + 'px';
    wrapperImage.style.width = MIN_WIDTH_IMG + 'px';
  }
}

const setAfterOptions = (evt) => {
  if (evt.keyCode === KEY_ENTER) {
    evt.preventDefault();
    toggleElement.style.left = LOCATION_TOGGLE_MAX_X + 'px';
    wrapperImage.style.width = MIN_WIDTH_IMG + LOCATION_TOGGLE_MAX_X + 'px';
  }
  if (evt.type === "click") {
    evt.preventDefault();
    toggleElement.style.left = LOCATION_TOGGLE_MAX_X + 'px';
    wrapperImage.style.width = MIN_WIDTH_IMG + LOCATION_TOGGLE_MAX_X + 'px';
  }
}

buttonBefore.addEventListener('click', setBeforeOptions);
buttonBefore.addEventListener('keydown', setBeforeOptions);
buttonAfter.addEventListener('click', setAfterOptions);
buttonAfter.addEventListener('keydown', setAfterOptions);
