/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.data = rows;

    //создаем таблицу  
    let table = document.createElement('table');

    //создаем строку заголовок таблицы и добавляем ее в таблицу
    let theadTable = document.createElement('thead');
    theadTable.innerHTML = '<tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr>';
    table.append(theadTable);
    
    //создаем тело таблицы и добавляем его в таблицу
    let tBody = document.createElement('tbody');
    
    //перебираем массив объектов-пользователей
    for( let item of this.data ) {
   
      //создаем строку
      let trTable = document.createElement('tr');
      
      //перебираем свойства-данные у объекта-пользователя
      for( let key in item ) {
        
        //создаем ячейку и помещаем в нее значение свойства объекта-пользователя, затем добавляем ячейку в строку таблицы
        let tdTr = document.createElement('td');
        tdTr.innerHTML = item[key];
        trTable.append(tdTr);
      }

      //в строке создаем ячейку с кнопкой
      trTable.innerHTML += `<td><button>X</button></td>`;
      tBody.append(trTable);
    }
    table.append(tBody);

    //помещаем таблицу в сво-во элем объекта
    this._elem = table;

    //вешаем обработчик на кнопку
    table.addEventListener('click', this.close);
      
  }

  //геттер возвращает ссылку на элемент таблицу
  get elem() {
    return this._elem;
  }

  //функция для обработчика удаляющая строку в таблице
  close(event) {
    let target = event.target;
    if( target.tagName != "BUTTON" ) return;
    target.closest('tr').remove();
  }
}
