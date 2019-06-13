import '../scss/index.scss';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCList } from '@material/list';
import { MDCDrawer } from '@material/drawer';
import { MDCMenuSurface, Corner } from '@material/menu-surface';
import MobileDetect from 'mobile-detect';
import { MDCRipple } from '@material/ripple';
import { MDCTextField } from '@material/textfield';
import { MDCFloatingLabel } from '@material/floating-label';
import { MDCLinearProgress } from '@material/linear-progress';

new MDCFloatingLabel(document.querySelector('.mdc-floating-label'));

[].map.call(document.querySelectorAll('.mdc-text-field'), el => {
  return new MDCTextField(el);
});

const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
[].map.call(document.querySelectorAll(selector), function(el) {
  return new MDCRipple(el);
});

let menuSurface = document.querySelector('#user-list.mdc-menu-surface');
console.log(menuSurface);
if (menuSurface) {
  menuSurface = new MDCMenuSurface(
    document.querySelector('#user-list.mdc-menu-surface')
  );
  menuSurface.hoistMenuToBody();
  menuSurface.setAnchorCorner(Corner.BOTTOM_START);
}

const list = MDCList.attachTo(document.querySelector('.mdc-list'));
list.wrapFocus = true;
// drawer.open = true;

const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});

const progressBar = document.querySelector('.sign-up-progress');
if (progressBar) {
  const signUpProgress = new MDCLinearProgress(progressBar);
  signUpProgress.open();
  signUpProgress.progress = parseFloat($(progressBar).data('progress'));
}

/* Accordion Toggle
 *********************************/
function accordionFixed() {
  $('.mdc-accordion .accordion-fixed').click(function(e) {
    e.preventDefault();

    var $this = $(this);

    if ($this.next().hasClass('active')) {
      $this.next().toggleClass('active');
      $this.next().slideToggle(350);
    } else {
      $this.next().toggleClass('active');
      $this.next().slideToggle(350);
    }
  });
}

/* Accordion Toggle
 *********************************/
function accordionToggle() {
  $('.mdc-accordion .accordion-toggle').click(function(e) {
    e.preventDefault();

    var $this = $(this);
    if ($this.find('.mdc-list-item__meta').text() === 'add') {
      $('.mdc-list-item__meta').text('add');
      $this.find('span').text('remove');
    } else {
      $this.find('span').text('add');
    }
    if ($this.next().hasClass('active')) {
      $this.next().removeClass('active');
      $this.next().slideUp(350);
    } else {
      $this
        .parent()
        .parent()
        .find('.accordion-container')
        .removeClass('active');
      $this
        .parent()
        .parent()
        .find('.accordion-container')
        .slideUp(350);
      $this.next().toggleClass('active');
      $this.next().slideToggle(350);
    }
  });
}

$(() => {
  $('#menu-surface-button').on('click', e => {
    e.preventDefault();
    menuSurface.open = !menuSurface.open;
  });

  const md = new MobileDetect(window.navigator.userAgent);
  if (md.mobile()) {
    drawer.open = false;
  }

  $(window).resize(e => {
    drawer.open = $(window).width() >= 479;
  });

  // cloneThis();
  // cloneThat();
  accordionFixed();
  accordionToggle();
});
