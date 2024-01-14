const bill = document.getElementById('bill')
const numberOfPeople =document.getElementById('people')
const errorMsg= document.querySelector('.error');
const allTip=document.querySelectorAll('.btn');
const customTip=document.querySelector('#custom');
const tipContainer = document.querySelector('.tipContainer');
const labelTotal = document.querySelector('#total');
const labelTip = document.querySelector('#tipAmount');
let selectedTip;
let totalPeople;
let currentBill;
const resetBtn = document.querySelector('#reset');



const getStringWithNumbersOnly = (str) => [...str].filter((v) => Number.isInteger(+v) && v !== ' ').join('');
//check number of people
function checkPeople(value ){
    if(value === 0 ){
        errorMsg.innerHTML="Can't be zero"
        errorMsg.classList.add('show')
        return false
    }
    else if(value < 0){
        errorMsg.innerHTML="Oops! wrong value"
        errorMsg.classList.add('show')
        return false
    }
    else{
        errorMsg.classList.remove('show')
        return true
    }
}
numberOfPeople.addEventListener('input',(e)=>{
    numberOfPeople.value=getStringWithNumbersOnly(e.target.value)
    totalPeople = +numberOfPeople.value
    checkPeople(totalPeople) && calculate(currentBill,selectedTip,totalPeople)
})

const evn = ['click','input']
evn.forEach((evn)=>{

    tipContainer.addEventListener(evn,function(e){
        if(e.target.classList.contains('btn')){
            // check if selected input is button or not
            customTip.value=''
            allTip.forEach(tip=>{
                if(tip !== e.target){
                 tip.classList.remove('active')
                }
            })
            e.target.classList.add('active')
            selectedTip=+e.target.innerHTML.slice(0, -1)
           
        }
        else if(e.target.classList.contains('selected')){
            customTip.value=getStringWithNumbersOnly(e.target.value)
            selectedTip=+customTip.value
            allTip.forEach(tip=>{
                tip.classList.remove('active')
            })
    
        }
        calculate(currentBill,selectedTip,totalPeople)
    })
})

bill.addEventListener('input',function(e){
    bill.value = getStringWithNumbersOnly(e.target.value)
    currentBill=parseFloat(bill.value);
    calculate(currentBill,selectedTip,totalPeople)
})

function calculate(currentBill,selectedTip,totalPeople){
    if(currentBill && selectedTip && totalPeople){
        let tipInDollars=currentBill * (selectedTip / 100 )
        const subTotal = parseFloat(currentBill + tipInDollars)
        const total = subTotal / totalPeople;
        const tipPerPerson = tipInDollars / totalPeople;
        if(tipPerPerson.toFixed(2).toString().length >=8){
          
            labelTip.parentElement.classList.add('small-text')
           
        }else{
            labelTip.parentElement.classList.remove('small-text')
        }
        if(total.toFixed(2).toString().length >=8){
            labelTotal.parentElement.classList.add('small-text')
           
        }else{
            labelTotal.parentElement.classList.remove('small-text')
        }
        labelTip.innerHTML = tipPerPerson.toFixed(2)
        labelTotal.innerHTML = total.toFixed(2);
    }
    else{
        labelTip.innerHTML = '0.00';
        labelTotal.innerHTML = '0.00';
    }   
}
// reset 
resetBtn.addEventListener('click',function(){
    allTip.forEach(tip=>{
        tip.classList.remove('active')
    })
    labelTip.innerHTML = '0.00';
    labelTotal.innerHTML = '0.00';
    numberOfPeople.value='';
    bill.value=''
    customTip.value=''
    if(labelTotal.parentElement.classList.contains('small-text')){

        labelTotal.parentElement.classList.remove('small-text')
    }
    if(labelTip.parentElement.classList.contains('small-text')){

        labelTip.parentElement.classList.remove('small-text')
    }
})