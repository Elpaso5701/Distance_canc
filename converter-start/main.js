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





// //получаем елементы со страницы 
// const SelectBoxesSelected = document.querySelectorAll('.selectbox_selected'),
// SelectBoxes = document.querySelectorAll('.selectbox'),
// CancItems = document.querySelectorAll('.calculator_item');
// const li = document.querySelectorAll('li');

// CancItems.forEach((CancItems, CanItemIdx) =>{
// const SelectBox = CancItems.querySelector('.selectbox'),
// SelectBoxSelected = CancItems.querySelector('.selectbox_selected');


// SelectBoxSelected.addEventListener('click', (e) =>{
//   if(!SelectBox.classList.contains('selectbox_opened')){
//     SelectBoxes.forEach(element => {
//       element.classList.remove('selectbox_opened');
//     });
//     SelectBox.classList.add('selectbox_opened');
//   }else{
//   SelectBox.classList.remove('selectbox_opened');
//   }
// SelectBox.addEventListener('click', (e) =>{
// let target = event.target;
// if(target.tagName == 'LI' && !target.classList.contains('active')){
// li.forEach(li=>{
//   li.classList.remove('active');
// });
// SelectBoxes.forEach(element => {
//   element.classList.remove('selectbox_opened');
// });
// target.classList.add('active');


// }

// });
// });
// });



















// function makeNegative(num) {
//     if(num >= 0){
//         return num;
//       }else{
//      return -num *(-1)
//       }
//   }
//   console.log(makeNegative(1)) === -1
//   console.log(makeNegative(-5)) === -5
//   console.log(makeNegative(0)) === 0
//   console.log(makeNegative(0.12)) === -0.12  


//   function fakeBin(input) {
//     let res = '';
//     for(let i = 0; i<input.length; i++){
//         if(input[i] <'5'){
//             res+= '0'
//         }else{
//             res+= '1'
//         }
        
//     }
//     return res;
//   }

// console.log(fakeBin("4538"))// === "0101";
// console.log(fakeBin("12345")) === "00001";
// console.log(fakeBin("5678")) === "1111";


// function takeOddNumbers(arr) {
//     return arr.filter((item)=>item %2==1);
//   }
  


 
























// function add(a, b) {
//     a = a.split("").reverse().join("");//329
   
//     b = b.split("").reverse().join("");//54
  
//     la = a.length;//3
//     lb = b.length;//2
//     let temp = [];
//     let bit = 0;
//     let cur = 0;
//     for(let i = 0; i < Math.max(la,lb); i++){
//       if(i>=la){
//         cur= Number(b[i]);
//       // console.log(cur);
//       }else if(i>=lb){
//         cur=Number(a[i]);//9
//         console.log(cur);
//       }else{
//         cur= Number(a[i]) + Number(b[i]);//86
//        console.log(cur);
//       }     
      
//       temp.push((cur+bit)%10);
//     console.log(temp);
//       bit = Math.floor((cur+bit)/10);

//     }
//     if(bit==1){
//       temp.push(1);
//     }  
//     var ans = "";
//     for(var i=temp.length-1; i>=0; i--){
//       ans+=temp[i];
//     }
    
//   }
  


//   console.log(add("923", "45"));//1373


//   function add(a, b) {
//     let cur = 0;
//     la = a.length;//3
//     lb = b.length;//2
// arr=[];
// for(let i = 0; i < Math.max(la,lb); i++){
//   if(i>=la){
//     cur= Number(b[i]);
//   // console.log(cur);
//   }else if(i>=lb){
//     cur=Number(a[i]);//
//     console.log(cur);
//   }else{
//     cur= Number(a[i]) + Number(b[i]);
   
//   }    
//   arr.push(cur);
//   }   
//   return +arr.join('');
// }

// console.log(typeof(add("923", "45")));



