import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    const modalWindow = createElement(`<div class="modal">
      <div class="modal__overlay"></div>
        <div class="modal__inner">
        <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
        </div>
      </div>`);

    this._elem = modalWindow;
    let button = this._elem.querySelector('.modal__close');
    button.addEventListener('click', this.mclose);
    document.addEventListener('keydown', this.kclose);
  }

  open() {
    document.body.append(this._elem);
    document.body.classList.add('is-modal-open');
  }

  setTitle(title) {
    let modalTitle = this._elem.querySelector('.modal__title');
    modalTitle.textContent = title;
  }

  setBody(node) {
    let modalBody = this._elem.querySelector('.modal__body');
    modalBody.append(node);
  }

  mclose = (event) => {
    let target = event.target;
    if( target ) this.close();
    else return;
  }
  
  close() {
    document.body.classList.remove('is-modal-open');
    document.body.remove(this._elem);
    document.removeEventListener('keydown', this.kclose);
  }

  kclose = (event) => {
    if( event.code === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }

  get elem() {
    return this._elem;
  }
}
