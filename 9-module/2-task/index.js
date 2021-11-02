import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    
    this.carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(this.carousel._elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu._elem);
    let ribbonMenuActive = this.ribbonMenu._elem.querySelector('.ribbon__item_active');
    this.ribbonMenu.value = ribbonMenuActive.innerHTML;

    this.stepSlider = new StepSlider({steps: 5, value: 3});
    document.querySelector('[data-slider-holder]').append(this.stepSlider.stepSlider);

    this.cartIcon = new CartIcon(categories);
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    async function getProducts() {
      let response = await fetch('products.json');
      let result =  await response.json();
      return result;
    }

    this.products = await getProducts();
    this.producstGrid = new ProductsGrid(this.products);
    document.querySelector('[data-products-grid-holder]').innerHTML = '';
    document.querySelector('[data-products-grid-holder]').append(this.producstGrid.productGrid);

    this.producstGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener('product-add', (event) => this.productAdd(event));
    this.stepSlider.stepSlider.addEventListener('slider-change', (event) => this.changeSpisiness(event));
    this.ribbonMenu._elem.addEventListener('ribbon-select', (event) => this.changeCategory(event));
    document.getElementById('nuts-checkbox').addEventListener('change', (event) => this.noNuts(event));
    document.getElementById('vegeterian-checkbox').addEventListener('change', (event) => this.isVegetarian(event));

  }

  productAdd(event) {
    let product = this.products.find( item => item.id == event.detail );
    this.cart.addProduct(product);
  }

  changeSpisiness(event) {
    this.producstGrid.updateFilter({
      maxSpiciness: event.detail
    });
  }

  changeCategory(event) {
    this.producstGrid.updateFilter({
      category: event.detail
    });
  }

  noNuts(event) {
    let status = event.target.checked;
    this.producstGrid.updateFilter({
      noNuts: status
    }); 
  }

  isVegetarian(event) {
    let status = event.target.checked;
    this.producstGrid.updateFilter({
      vegeterianOnly: status
    }); 
  }

}
