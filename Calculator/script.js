let currentInput = '0';
let previousInput = '';
let operation=null;
let resetScreen = false;
let showOperation=false;

const display = document.getElementById('disp');

function updateDisplay(){
    const maxDisplayLength = 10;
    display.textContent = showOperation ? `${previousInput} ${operation}` : currentInput;

    if (displayText.length > maxDisplayLength) {
        display.style.fontSize = '1.5em'; 
        display.style.overflow = 'hidden';
        display.style.textOverflow = 'ellipsis';
    } else {
        display.style.fontSize = '2em';
        display.style.overflow = 'visible';
    }
    display.textContent = displayText;
}

function appendToDisplay(number){
    const maxInputLength = 15;
    if(currentInput === '0' || resetScreen){
        currentInput = '';
        resetScreen = false;
        showOperation = false;
    }
    if(number === '.' && currentInput.includes('.'))return;
    
    if(number === '0' && currentInput === '0')return;
    if (currentInput.length >= maxInputLength) return;
    currentInput += number;
    updateDisplay();
}

function handleOperator(op){
    if(currentInput === '' && previousInput === '')return;

    if(operation !== null && !resetScreen){
        calculate(false);
    } 
    previousInput = currentInput;
    operation = op;
    resetScreen = true;
    showOperation = true;
    updateDisplay();
}

function calculate(completeCalculation = true){
    if(operation === null)return;
    if(currentInput === '' && previousInput !== ''){
        currentInput = previousInput;
    }

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if(isNaN(prev)) return;
    if(isNaN(current)) return;

    switch(operation){
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero!");
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
 
    }
    result = formatNumber(result);

    if (completeCalculation){
        showOperation = false; 
        operation = null;
    }

    currentInput = result.toString();
    resetScreen = true;
    updateDisplay();
}

function formatNumber(num) {
    if (Math.abs(num) > 999999999 || (Math.abs(num) < 0.0000001 && num !== 0)) {
        return num.toExponential(6);
    }
    return parseFloat(num.toFixed(10));
}

function clearLastEntry(){
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function clearDisplay(){
    currentInput = '0';
    previousInput = '';
    operation = null;
    resetScreen = false;
    showOperation = false; 
    updateDisplay();
}

updateDisplay();