export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    if( findProduct.count == 1 && amount == -1 ) this.cartItems.splice(index, 1);
    else findProduct.count += amount;
    
    this.onProductUpdate(this.cartItems);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

