import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if( !product || product === null ) return;
   
    let rezult = this.cartItems.find( item => item.product.id == product.id );
    if( rezult ) rezult.count += 1;
    else this.cartItems.push({product: product, count: 1});

    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    let findProduct = this.cartItems.find( item => item.product.id == productId );
    let index = this.cartItems.indexOf(findProduct);
  
    if( findProduct.count == 1 && amount == -1 ) {
      let product = this.fromBody.querySelector(`[data-product-id="${productId}"]`);
      product.remove();
      let infoPrice = this.fromBody.querySelector('.cart-buttons__info-price');
      this.cartItems.splice(index, 1);
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      if( this.cartItems.isEmpty ) this.modalWindow.close();
    } else {
      findProduct.count += amount;
      console.log(findProduct);
      
      this.onProductUpdate(findProduct);
    }
  }

  isEmpty() {
    if( this.cartItems.length != 0 ) return false;
    else return true;
  }

  getTotalCount() {
    let totalCount = this.cartItems.reduce((sum, current) => sum + current.count, 0);
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = this.cartItems.reduce((sum, current) => sum + current.product.price * current.count, 0);
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modalWindow = new Modal();
    this.modalWindow.setTitle('Your order');
    this.fromBody = document.createElement('div');
    for( let product of this.cartItems ) {
      let item = this.renderProduct(product.product, product.count);
      this.fromBody.append(item);
    }
    this.fromBody.append(this.renderOrderForm());
    
    this.modalWindow.setBody(this.fromBody);
    
    this.modalWindow.open();

    this.fromBody.addEventListener('click', (event) => {
      let target = event.target;
      const product = target.closest('.cart-product');
      console.log(product);
      let idProduct = product.dataset.productId;
      console.log(idProduct);
      let amount = 0;
      if( target.closest('.cart-counter__button_minus') ) amount -= 1;
      if( target.closest('.cart-counter__button_plus') ) amount += 1;
    
      this.updateProductCount(idProduct, amount);
    });

    let form = this.fromBody.querySelector('.cart-form');
    form.addEventListener('submit', this.onSubmit);

  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if( !document.body.classList.contains('is-modal-open') ) return;
    let productId = cartItem.product.id;
    let productCount = this.fromBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
    let productPrice = this.fromBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
    
    
    let infoPrice = this.fromBody.querySelector('.cart-buttons__info-price');

    productCount.innerHTML = cartItem.count;

    productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
    
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    
  }

  onSubmit = (event) => {
    event.preventDefault();
    let target = event.target;
    let modalWind = target.closest('.modal');
    let modalTitle = modalWind.querySelector('.modal__title');
    let form = target.closest('.cart-form');
    let button = target.querySelector('button');
    let carItems = this.cartItems;
    let bodyModalWind = modalWind.querySelector('.modal__body');
    if( !button.hasAttribute('type') ) return;
    
    button.classList.add('is-loading');
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form)
    })
    .then( function(response) {
      
      if( response.ok ) {

        modalTitle.innerHTML = 'Success!';
        carItems.splice(0, carItems.length);
        bodyModalWind.innerHTML = `<div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>`;
      }

      else alert(`HTTP - Error: ${response.status}`);
    });
    
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

}

