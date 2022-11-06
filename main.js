"use strict";


//Выпадающий список
const canculatorItems = document.querySelectorAll('.calculator_item');
const allSelectBoxes = document.querySelectorAll('.selectbox');
const rates = {};

getCurrencies();

async function getCurrencies(){
  const response = await fetch('db.json');//получили Json объект в response//fetch возвращает 
  //объект у которого есть метод json
  const data = await response.json();//превращаем JSON в js объект и записываем в data
rates.m = data.distance.m;
rates.sm = data.distance.sm;
rates.ft = data.distance.ft;
rates.yd = data.distance.yd;
rates.km = data.distance.km;
rates.mm = data.distance.mm;
rates.in = data.distance.in;
}

const data = {
  "distance" : {
       "m": 1000,
       "sm": 10,
       "ft": 304.8,
       "yd": 914.4,
       "km": 1000000,
       "mm": 1,
       "in": 25.4
  }
}


rates.m = data.distance.m;
rates.sm = data.distance.sm;
rates.ft = data.distance.ft;
rates.yd = data.distance.yd;
rates.km = data.distance.km; 
rates.mm = data.distance.mm;
rates.in = data.distance.in;



const selectedCurrency = ['m', 'sm'];
const values = [0, 0];

canculatorItems.forEach((itemBlock, calculatorItemIdx) => {

  //Функционал открытия/сворачивания выпадающих списков
  const selectbox = itemBlock.querySelector('.selectbox')
  const selectBoxSelected = itemBlock.querySelector('.selectbox_selected');
  const input = itemBlock.querySelector('.calculator_input');
  //  selectBoxSelected.onclick = (event) =>{
  //   console.log('привет');
  //  }
  selectbox.addEventListener('click', (e) => {
    if (!selectbox.classList.contains('selectbox_opened')) {

      allSelectBoxes.forEach(box => {
        box.classList.remove('selectbox_opened');//убираем все открытые selectbox
      });
      selectbox.classList.add('selectbox_opened');// и открываем новый
    } else {
      selectbox.classList.remove('selectbox_opened');
    }
  })

  //функционал выбора елементов из списка 

    selectbox.addEventListener('click', (e) => {
      const target = event.target;
      if (target.tagName == 'LI' && !target.classList.contains('active')) {
        allSelectBoxes.forEach(box => {
          box.classList.remove('selectbox_opened');//убираем все открытые selectbox
        });
        const currencyName = target.innerText;//текст по которому кликнули(напр. USD)

        selectbox.querySelectorAll('li').forEach(li => {
          li.classList.remove('active');
        });
        target.classList.add('active');
        selectBoxSelected.querySelector('span').innerText = currencyName;//присваиваем текст по которому кликнули в span
        selectedCurrency[calculatorItemIdx] = currencyName;
        currencyCalculate();
      }

    });
  

  //Отслеживание елементов в input
  //Функционал записи введенных числовых значений в массив values
  const reg = /^\d+$/;

  
    input.oninput = () => {
      const value = Number(input.value);
      if (reg.test(value) || value == '') {
        values[calculatorItemIdx] = value;
       
        currencyCalculate();
      } else {
        input.value = values[calculatorItemIdx];
      }

    }
  
  
  //Функция пересчета валют
  function currencyCalculate() {
    if (calculatorItemIdx) {//1 true
      
      const valueBottom = values[1] * rates[selectedCurrency[1]]
      const valueTop = valueBottom / rates[selectedCurrency[0]];
     canculatorItems[calculatorItemIdx ? 0 : 1].querySelector('.calculator_input').value = valueTop;
      values[0] = valueTop;//перезапись значения
    } else {// 0 - false
      
      const valueTop = values[0] * rates[selectedCurrency[0]]
      const valueBottom = valueTop / rates[selectedCurrency[1]];
      canculatorItems[calculatorItemIdx ? 0 : 1].querySelector('.calculator_input').value = valueBottom;   
      values[1] = valueBottom;//перезапись значения
    }
  }

})


























