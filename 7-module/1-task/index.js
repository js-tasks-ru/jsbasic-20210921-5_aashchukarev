import createElement from '../../assets/lib/create-element.js';
import arrows from './arrows.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    const ribbon = createElement(`<div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner"></nav>
    </div>`);
    const ribbonInner = ribbon.querySelector('.ribbon__inner');
    let allRibbon = createElement(`<a href="#" class="ribbon__item ribbon__item_active" data-id="${categories[0].id}">${categories[0].name}</a>`);
    ribbonInner.append(allRibbon);
    let counter = categories.length;
    for( let i = 1; i < counter; i++ ) {
      let ribbonCategory = createElement(`<a href="#" class="ribbon__item" data-id="${categories[i].id}">${categories[i].name}</a>`)
      ribbonInner.append(ribbonCategory);
    }
    ribbon.append(createElement(`<button class="ribbon__arrow ribbon__arrow_right ">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`));

    const clicker = arrows(ribbon);
    if( clicker ) clicker();
    this._elem = ribbon;
    ribbonInner.addEventListener('click', this.select);
  } 

  select = (event) => {
    event.preventDefault();
    let target = event.target;
    let ribbonInner = target.closest('.ribbon__inner');
    let allCategories = ribbonInner.querySelectorAll('.ribbon__item');
    for( let category of allCategories ) {
      if( category.classList.contains('ribbon__item_active') ) category.classList.remove('ribbon__item_active');
    }

    if( target.closest('.ribbon__item') ) {
      target.classList.add('ribbon__item_active');
      let id = target.closest('[data-id]').dataset.id;
      let myEvent = new CustomEvent('ribbon-select', {
        detail:  id, 
        bubbles: true
      });
      this._elem.dispatchEvent(myEvent);
  }
}

  get elem() {
    return this._elem;
  }
}
