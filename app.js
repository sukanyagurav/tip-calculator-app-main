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
//check number of people
function checkPeople(value ){
    if(value === 0 ){
        errorMsg.innerHTML="Can't be zero"
        errorMsg.classList.add('show')
        return false
    }
    else if(value < 0){
        errorMsg.innerHTML="Must be greater than 0"
        errorMsg.classList.add('show')
        return false
    }
    else{
        errorMsg.classList.remove('show')
        return true
    }
}
numberOfPeople.addEventListener('change',(e)=>{
    totalPeople = +e.target.value
    checkPeople(totalPeople) && calculate(currentBill,selectedTip,totalPeople)
})
customTip.addEventListener('change',function(e){
    selectedTip=+e.target.value
})
tipContainer.addEventListener('click',function(e){
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
        allTip.forEach(tip=>{
            tip.classList.remove('active')
        })
        selectedTip=+e.target.value
    }
    calculate(currentBill,selectedTip,totalPeople)
})

bill.addEventListener('change',function(e){
    currentBill=parseFloat(e.target.value);
    calculate(currentBill,selectedTip,totalPeople)
})

function calculate(currentBill,selectedTip,totalPeople){
    if(currentBill && selectedTip && totalPeople){
        let tipInDollars=currentBill * (selectedTip / 100 )
        const subTotal = parseFloat(currentBill + tipInDollars)
        const total = subTotal / totalPeople;
        const tipPerPerson = tipInDollars / totalPeople;
        labelTip.innerHTML = tipPerPerson.toFixed(2);
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
})