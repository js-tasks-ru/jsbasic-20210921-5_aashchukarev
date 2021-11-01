import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.quantity = this.steps - 1;
    
    //Создаем слайдер и указываем первоначальные параметры ползунка
    this.stepSlider = createElement(`<div class="slider">
      <div class="slider__thumb" style="left: ${(this.value / this.quantity) * 100}%;">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: ${(this.value / this.quantity) * 100}%;"></div>
      <div class="slider__steps">${'<span></span>'.repeat(this.steps)}</div>
    </div>`);
    
    //Выделяем первоначальную позицию ползунка
    this.sliderSteps = this.stepSlider.querySelector('.slider__steps');
    this.sliderSteps.children[this.value].classList.add('slider__step-active');
    
    //метод перемещения ползунка по клику
    this.thumb = this.stepSlider.querySelector('.slider__thumb');
    this.progress = this.stepSlider.querySelector('.slider__progress');
    this.sliderValue = this.stepSlider.querySelector('.slider__value');
    this.thumb.ondragstart = function() {
      return false;
    };
    this.thumb.style.touchAction = 'none';
    this.thumb.onpointerdown = (event) => {
      event.preventDefault();
      this.stepSlider.classList.add('slider_dragging');
      this.thumb.addEventListener('pointermove', this.onPointerMove);
      this.thumb.addEventListener('pointerup', this.onPointerUp);
    };
    this.stepSlider.onclick = (event) => {
      let newLeft = (event.clientX - this.sliderSteps.getBoundingClientRect().left) / this.sliderSteps.offsetWidth;
      this.setValue(Math.round(this.quantity * newLeft));
      let myEvent = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      });
      this.stepSlider.dispatchEvent(myEvent);

    };
  }

  onPointerMove = (event) => {
    event.preventDefault(); // предотвратить запуск выделения (действие браузера)
    this.thumb.style.touchAction = 'none';
    let newLeft = (event.clientX - this.sliderSteps.getBoundingClientRect().left) / this.sliderSteps.offsetWidth;
      
    // курсор вышел из слайдера => оставить бегунок в его границах.
    newLeft = (newLeft < 0) ? 0 : newLeft;
    newLeft = (newLeft > 1) ? 1 : newLeft;
    
    //Очищаем предыдущее значение ползунка
    for( let child of this.sliderSteps.children ) {
      if( child.classList.contains('slider__step-active') ) child.classList.remove('slider__step-active');
    }

    //Выясняем к какому шагу ближе находится клик мыши
    this.value = Math.round(newLeft * this.quantity);
    this.sliderValue.textContent = this.value;
    
    //подсвечиваем высчитанный шаг
    this.sliderSteps.children[this.value].classList.add('slider__step-active');
    
    //устанавливаем ползунок и полоску в соответствии с высчитанным процентом
    this.thumb.style.left = `${newLeft * 100}%`;
    this.progress.style.width = `${newLeft * 100}%`;
  }

  onPointerUp = (event) => {
    this.stepSlider.classList.remove('slider_dragging');
    
    //устанавливаем ползунок и полоску в соответствии с высчитанным процентом
    this.thumb.style.left = `${(this.value / this.quantity) * 100}%`;
    this.progress.style.width = `${(this.value / this.quantity) * 100}%`;

    //генерим пользовательское событие
    let myEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.stepSlider.dispatchEvent(myEvent);
    
    this.thumb.removeEventListener('pointermove', this.onPointerMove);
    this.thumb.removeEventListener('pointerup', this.onPointerUp);
    
  }

  setValue(value) {
    this.value = value;

    let valuePercents = (value / this.quantity) * 100;

    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;

    this.sliderValue.textContent = value;

    for( let child of this.sliderSteps.children ) {
      if( child.classList.contains('slider__step-active') ) child.classList.remove('slider__step-active');
    }

    this.sliderSteps.children[value].classList.add('slider__step-active');
  }

  get elem() {
    return this.stepSlider;
  }
}
