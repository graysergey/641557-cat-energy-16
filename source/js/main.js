const toggleButton = document.querySelector('.toggle-menu');
const menu = document.querySelector('.main-menu');

const toggleMenu = (evt) => {
  evt.preventDefault();
  if (evt.keyCode === 13) {
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

