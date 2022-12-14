import samples from "../pages/samples.js";

async function getJson() {
  return await fetch('./json/pages.json')
    .then(resp => resp.json())
    .catch(err => console.log(err));
}

const data = await getJson();

function Modal({id}) {

  this.page  = '';
  this.status   = 'close';

  this.render = function() {
    return (`
      <section id="${id}">
        <div id="modal_content">${this.page}</div>
        <img id="modal_close" alt="close" src="./icons/xmark-solid.svg" width="24" height="24" />
    `);
  }

  this.onClick = function(e) {
    if (e.target.id === 'modal_close') this.closeModal();
  }

  this.update = async function() {
    document.getElementById(id).children.modal_content.innerHTML = await this.getPage();
  }

  this.getPage = async function() {
    if (!this.page) return '';

    if (this.page === 'samples') return samples(data.samples);

    let html = await fetch(`./pages/${this.page}.html`)
      .then(resp => resp.text())
      .then(text => text)
      .catch(error => console.log(error));
    return html;
  }

  this.toogleModal = function(page) {
    this.status === 'close' ?
      this.openModal(page) :
      this.closeModal();
  }

  this.openModal = function(page) {
    this.page = page;
    this.update();
    document.getElementById(id).classList.remove(this.status);
    this.status = 'open';
    document.getElementById(id).classList.add(this.status);
  }

  this.closeModal = function() {
    document.getElementById(id).classList.remove(this.status);
    this.status = 'close';
    document.getElementById(id).classList.add(this.status);
    this.page = '';
    setTimeout(() => this.update(), 500);
  }
}

export default Modal;