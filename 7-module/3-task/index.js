export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    let stride = Math.round(100 / this.steps);
    
    //Создаем слайдер и указываем первоначальные параметры ползунка
    let stepSlider = document.createElement('div');
    stepSlider.classList.add('slider');
    stepSlider.innerHTML = `<div class="slider__thumb" style="left: ${this.value * stride}%;">
      <span class="slider__value">${this.value}</span>
    </div>
    <div class="slider__progress" style="width: ${this.value * stride}%;"></div>
    <div class="slider__steps"></div>`;
    
    //Наполняем слайдер шагами
    let sliderSteps = stepSlider.querySelector('.slider__steps');
    for( let i = 0; i < this.steps; i++ ) {
      let step = document.createElement('span');
      if( i == this.value ) step.classList.add('slider__step-active');
      sliderSteps.append(step);
    }
    this._elem = stepSlider;
    this.stepsSlider = sliderSteps.querySelectorAll('span');
    
    //вешаем обработчик переключения ползунка
    stepSlider.addEventListener('click', this.change);
  }

  change = (event) => {
    let sliderSteps = this._elem.querySelector('.slider__steps');
    
    //Кол-во отрезков в слайдере
    let quantity = this.steps - 1;
    
    //Очищаем предыдущее значение ползунка
    for( let child of this.stepsSlider ) {
      if( child.classList.contains('slider__step-active') ) child.classList.remove('slider__step-active');
    }
    
    //Получаем координаты слайдера относительно окна браузера и координаты клика мыши
    let sliderStepscoords = sliderSteps.getBoundingClientRect();
    let leftOut = (event.clientX - sliderStepscoords.left) / sliderSteps.offsetWidth;
    
    //Выясняем к какому шагу ближе находится клик мыши
    let stride = Math.round(leftOut * quantity);
    let sliderValue = this._elem.querySelector('.slider__value');
    sliderValue.innerHTML = stride;
    
    //подсвечиваем высчитанный шаг
    this.stepsSlider[stride].classList.add('slider__step-active');
    
    //находим ползунок и полоску, расчитываем процент
    let thumb = this._elem.querySelector('.slider__thumb');
    let progress = this._elem.querySelector('.slider__progress');
    let percents = Math.round(100 / quantity);
    
    //устанавливаем ползунок и полоску в соответствии с высчитанным процентом
    thumb.style.left = `${stride * percents}%`;
    progress.style.width = `${stride * percents}%`;
    
    //генерим пользовательское событие
    let myEvent = new CustomEvent('slider-change', {
      detail: stride,
      bubbles: true
    });
    this._elem.dispatchEvent(myEvent);
  }

  get elem() {
    return this._elem;
  }
}
