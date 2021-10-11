function initCarousel() {
  //Получаем элемент контейнер-карусель
  let carousel = document.querySelector('.carousel');

  //ссылки на струлки
  let arrowRight = carousel.querySelector('.carousel__arrow_right');
  let arrowLeft = carousel.querySelector('.carousel__arrow_left');
  
  //элемент в котором будут отображаться слайды
  let carouselInner = carousel.querySelector('.carousel__inner');
  let lengthCarouselInner = carouselInner.querySelectorAll('.carousel__slide').length;
  
  //ширина элементы в котором отображаются слайды - шаг 
  let step = carouselInner.offsetWidth;
  
  //первоначальная позиция
  let position = 1;
  arrowLeft.style.display = 'none';
  arrowRight.style.display = '';

  carousel.onclick = function(event) {
    let target = event.target;
    
    if( target == arrowRight.querySelector('img') ) {
      position += 1;
      position = Math.min(position, lengthCarouselInner);
      carouselInner.style.transform += `translateX(-${step}px)`;
    }
    
    if( target == arrowLeft.querySelector('img') ) {
      position -= 1;
      position = Math.max(position, 1);
      carouselInner.style.transform += `translateX(${step}px)`;
    }

    //переключатель отображения стрелок
    switch (position) {
      case 1:
        arrowLeft.style.display = 'none';
        arrowRight.style.display = '';
        break;
        
      case lengthCarouselInner:
        arrowLeft.style.display = '';
        arrowRight.style.display = 'none';
        break;
      
      default:
        arrowLeft.style.display = '';
        arrowRight.style.display = '';
    }

  };

}
