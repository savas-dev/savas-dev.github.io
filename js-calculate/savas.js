

const calcTitle = document.querySelector('h1');
const buttons = document.querySelectorAll('button');
const resetButton = document.getElementById('reset');


let initialValue = 0;
let operatorValue = '';
let isWaiting = false;

function SendNumberValue(number){

    if(isWaiting){
        calcTitle.textContent = number;
        isWaiting = false;
    }else{
        const displayValue = calcTitle.textContent;
        calcTitle.textContent = displayValue === '0' ? number : displayValue+number;
    }

}

function ResetNumber(){
    calcTitle.textContent = '0';
    initialValue = 0;
    operatorValue = '';
    if(isWaiting){
        isWaiting = false;
    }
}

function AddDecimal(){
    if(!calcTitle.textContent.includes('.')){
        calcTitle.textContent = `${calcTitle.textContent}.`;
    }
}

function UseOperator(operator){
    const currentValue = Number(calcTitle.textContent);

    if(operatorValue && isWaiting){
        operatorValue = operator;
        return;
    }

    if(!initialValue){
        initialValue = currentValue;
    }else{
        const equal = calc[operatorValue](initialValue, currentValue);
        calcTitle.textContent = equal;
        initialValue = calc;
    }

    isWaiting = true;
    operatorValue = operator;
}

const calc = {
    '/': (firstNumber, secondNumber) => firstNumber/secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber*secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber+secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber-secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
}

buttons.forEach((button) => {
    if(button.classList.length === 0){
        button.addEventListener('click', ()=> SendNumberValue(button.value))
    }else if(button.classList.contains('operator')){
        button.addEventListener('click', () => UseOperator(button.value))
    }else if(button.classList.contains('decimal')){
        button.addEventListener('click', () => AddDecimal())
    }else if(button.classList.contains('reset')){
        button.addEventListener('click', () => ResetNumber());
    }
});

