import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    let carousel = document.createElement('div');
    carousel.className = "carousel";
    carousel.innerHTML = `<div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner"></div>`;
    let carouselInner = carousel.querySelector('.carousel__inner');  
    for( let slide of this.slides ) {
      let carouselSlide = createElement(`<div class="carousel__slide" data-id="penang-shrimp">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
        </div>
      </div>`);
      carouselInner.append(carouselSlide);
    }
    this._elem = carousel;
  }

  get elem() {
    return this._elem;
  }
  
}
