/* <script>
  var navMain = document.querySelector('.main-nav');
  var navToggle = document.querySelector('.main-nav__toggle');

  navMain.classList.remove('main-nav--nojs');

  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
    } else {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
    }
  });
</script> */

var menu = document.querySelector('.page-header');
var button = document.querySelector('.navigation__button');

var onMenuButtonClick = function(evt) {
  evt.preventDefault();
  button.classList.toggle('navigation__button--opened');
  menu.classList.toggle('page-header--menu-opened');
}

button.addEventListener('click', onMenuButtonClick);

