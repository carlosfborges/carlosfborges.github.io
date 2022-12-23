function Modal({id, nav}) {

  this.content  = '';
  this.status   = 'close';

  this.render = function() {
    return (`
      <section id="${id}">
        <div id="modal_content">${this.content}</div>
        <button id="modal_close">Close</button>
    `);
  }

  this.onClick = function(e) {
    if (e.target.id === 'modal_close') this.closeModal();
  }

  this.update = function() {
    document.getElementById(id).children.modal_content.innerHTML = this.content;
  }

  this.toogleModal = function(text) {
    this.status === 'close' ?
      this.openModal(text) :
      this.closeModal();
  }

  this.openModal = function(text) {
    this.content = text;
    this.update();
    document.getElementById(id).classList.remove(this.status);
    this.status = 'open';
    document.getElementById(id).classList.add(this.status);
  }

  this.closeModal = function() {
    document.getElementById(id).classList.remove(this.status);
    this.status = 'close';
    document.getElementById(id).classList.add(this.status);
    this.content = '';
  }
}

export default Modal;