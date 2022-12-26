import Modal from './components/Modal.js';
import Header from './components/Header.js';
import Home   from './components/Home.js';
import Nav    from './components/Nav.js';

const root = document.getElementById('root');

const 
  modal   = new Modal({id: 'modal_container'}),
  nav     = new Nav({id: 'nav_container'}),
  header  = new Header({id: 'header_container'}),
  home    = new Home({id: 'home_container'});

let idInterval;

root.innerHTML = `
  ${header.render()}
  ${home.render()}
  ${nav.render()}
  ${modal.render()}
`;

document.getElementById('nav_container')
  .addEventListener('click', (e) => {
    nav.onClick(e) && modal.openModal(e.target.innerText);
  });
document.getElementById('home_container')
  .addEventListener('scroll', () => home.onScroll());
document.getElementById('modal_container')
  .addEventListener('click', (e) => modal.onClick(e));

window.addEventListener('resize', () => { 
  home.screenType = window.screen.orientation ? window.screen.orientation.type : home.getScreenType()
});

init();

function init() {
  setTimeout(() => {
    idInterval = setInterval(() => {
      home.animaLangs(1);
    }, 20);

    setTimeout(() => {
      clearInterval(idInterval);
    }, 6000);
  }, 2000);
}
