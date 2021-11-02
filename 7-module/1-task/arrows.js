export default function(element) {
  //Получаем элемент ленту
  let ribbon = element;
  
  //ссылки на стрелки
  let arrowRight = ribbon.querySelector('.ribbon__arrow_right');
  let arrowLeft = ribbon.querySelector('.ribbon__arrow_left');
  
  //элемент в котором будут отображаться категории
  let ribbonInner = ribbon.querySelector('.ribbon__inner');
  
  //первоначальная позиция
  arrowRight.classList.add('ribbon__arrow_visible');

  ribbon.onclick = function(event) {
    let target = event.target;

    //шаг, ширина полосы прокрутки, видимая часть элемента, скрытые области слева и справа
    let step = 350;
    let scrollWidth = ribbonInner.scrollWidth;
    let scrollLeft = ribbonInner.scrollLeft;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    
    if( target.closest('.ribbon__arrow_right') ) {
      ribbonInner.scrollBy(step, 0);
      arrowLeft.classList.add('ribbon__arrow_visible');
      if( scrollLeft > 0 && !arrowLeft.classList.contains('ribbon__arrow_visible') ) arrowLeft.classList.add('ribbon__arrow_visible');
      if( scrollRight < 1 ) arrowRight.classList.remove('ribbon__arrow_visible');
    }
    
    if( target.closest('.ribbon__arrow_left') ) {
      ribbonInner.scrollBy(-step, 0);
      arrowRight.classList.add('ribbon__arrow_visible');
      if( scrollRight > 0 && !arrowRight.classList.contains('ribbon__arrow_visible') ) arrowRight.classList.add('ribbon__arrow_visible');
      if( scrollLeft < 1 ) arrowLeft.classList.remove('ribbon__arrow_visible');
    }
  }
  
};