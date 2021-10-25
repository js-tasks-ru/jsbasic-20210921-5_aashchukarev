import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.productGrid = createElement(`<div class="products-grid">
      <div class="products-grid__inner"></div>
    </div>`);
    this.productInner = this.productGrid.querySelector('.products-grid__inner');
    this.renderProduct();
  }

  renderProduct() {
    
    for( let product of this.products ) {
      let card = new ProductCard(product);
      this.productInner.append(card.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters); 
    let productsFilter = this.products;

    for( let property in this.filters ) {

      if( property == 'noNuts' && this.filters[property] ) {
        productsFilter = productsFilter.filter( item => ( item['nuts'] == false || !item.nuts ) );
      }

      if( property == 'vegeterianOnly' && this.filters[property] ) {
        productsFilter = productsFilter.filter( item => item['vegeterian'] );
      }

      if( property == 'maxSpiciness' ) {
        productsFilter = productsFilter.filter( item => item['spiciness'] <= this.filters[property] );
      }

      if( property == 'category' && this.filters[property] != '' ) {
        productsFilter = productsFilter.filter( item => item['category'] == this.filters[property] );
      }
      
    }
    this.productInner.innerHTML = '';
    this.renderFilterProduct(productsFilter);
  }

  renderFilterProduct(config) {
    for( let product of config ) {
      let card = new ProductCard(product);
      this.productInner.append(card.elem);
    }
  }
  

  get elem() {
    return this.productGrid;
  }
}
