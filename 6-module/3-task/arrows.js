export default function(element) {
  //Получаем элемент контейнер-карусель
  let carousel = element;
  
  //ссылки на стрелки
  let arrowRight = carousel.querySelector('.carousel__arrow_right');
  let arrowLeft = carousel.querySelector('.carousel__arrow_left');
  
  //элемент в котором будут отображаться слайды
  let carouselInner = carousel.querySelector('.carousel__inner');
  let lengthCarouselInner = carouselInner.querySelectorAll('.carousel__slide').length;
  
  //первоначальная позиция
  let position = 1;
  arrowLeft.style.display = 'none';

  carousel.onclick = function(event) {
    let target = event.target;

    //ширина элементы в котором отображаются слайды - шаг
    let step = carouselInner.offsetWidth;
    
    if( target.closest('.carousel__arrow_right') ) {
      carouselInner.style.transform = `translateX(-${step*position}px)`;
      position += 1;
    }
    
    if( target.closest('.carousel__arrow_left') ) {
      carouselInner.style.transform = `translateX(-${step*(position-2)}px)`;
      position -= 1;
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
  
};