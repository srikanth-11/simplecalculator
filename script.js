var cal=document.createElement("div")
    cal.classList.add("calculator-grid")
document.body.append(cal)
var bt0=document.createElement("input")
    bt0.setAttribute("type","text")
    bt0.setAttribute("class","calculator-screen")
    bt0.setAttribute("value","")
    bt0.disabled=true
cal.append(bt0)
document.body.append(cal)
// created required buttons for the calculator
var bt1=document.createElement("button")
    bt1.classList.add("all-clear")
    bt1.innerHTML="AC"
    bt1.setAttribute("value","all-clear")
cal.append(bt1)
document.body.append(cal)

var bt3=document.createElement("button")
    bt3.classList.add("data-operation")
    bt3.innerHTML="/"
    bt3.setAttribute("value","/")
cal.append(bt3)
document.body.append(cal)
var bt4=document.createElement("button")
    bt4.classList.add("data-number")
    bt4.innerHTML="1"
    bt4.setAttribute("value","1")
cal.append(bt4)
document.body.append(cal)
var bt5=document.createElement("button")
    bt5.classList.add("data-number")
    bt5.innerHTML="2"
    bt5.setAttribute("value","2")
cal.append(bt5)
document.body.append(cal)
var bt6=document.createElement("button")
    bt6.classList.add("data-number")
    bt6.innerHTML="3"
    bt6.setAttribute("value","3")
cal.append(bt6)
document.body.append(cal)
var bt7=document.createElement("button")
    bt7.classList.add("data-operation")
    bt7.innerHTML="*"
    bt7.setAttribute("value","*")
cal.append(bt7)
document.body.append(cal)
var bt8=document.createElement("button")
    bt8.classList.add("data-number")
    bt8.innerHTML="4"
    bt8.setAttribute("value","4")
cal.append(bt8)
document.body.append(cal)
var bt9=document.createElement("button")
    bt9.classList.add("data-number")
    bt9.innerHTML="5"
    bt9.setAttribute("value","5")
cal.append(bt9)
document.body.append(cal)
var bt10=document.createElement("button")
    bt10.classList.add("data-number")
    bt10.innerHTML="6"
    bt10.setAttribute("value","6")
cal.append(bt10)
document.body.append(cal)
var bt11=document.createElement("button")
    bt11.classList.add("data-operation")
    bt11.innerHTML="+"
    bt11.setAttribute("value","+")
cal.append(bt11)
document.body.append(cal)
var bt12=document.createElement("button")
    bt12.classList.add("data-number")
    bt12.innerHTML="7"
    bt12.setAttribute("value","7")
cal.append(bt12)
document.body.append(cal)
var bt13=document.createElement("button")
    bt13.classList.add("data-number")
    bt13.innerHTML="8"
    bt13.setAttribute("value","8")
cal.append(bt13)
document.body.append(cal)
var bt14=document.createElement("button")
    bt14.classList.add("data-number")
    bt14.innerHTML="9"
    bt14.setAttribute("value","9")
cal.append(bt14)
document.body.append(cal)
var bt15=document.createElement("button")
    bt15.classList.add("data-operation")
    bt15.innerHTML="-"
    bt15.setAttribute("value","-")
cal.append(bt15)
document.body.append(cal)
var bt16=document.createElement("button")
    bt16.classList.add("decimal")
    bt16.innerHTML="."
    bt16.setAttribute("value",".")
cal.append(bt16)
document.body.append(cal)
var bt17=document.createElement("button")
    bt17.classList.add("data-number")
    bt17.innerHTML="0"
    bt17.setAttribute("value","0")
cal.append(bt17)
document.body.append(cal)
var bt18=document.createElement("button")
    bt18.classList.add("span-two")
    bt18.innerHTML="="
    bt18.setAttribute("value","=")
cal.append(bt18)
document.body.append(cal)
// created a calculator object to define a set of key pair values
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };
  
  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
  
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  }
  
  function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = "0."
      calculator.waitingForSecondOperand = false;
      return
    }
  
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  }
  
  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
    
    if (operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator;
      return;
    }
  
  
    if (firstOperand == null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
  
      calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
      calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
  }
  
  function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '*') {
      return firstOperand * secondOperand;
} else if (operator === '/') {
      return firstOperand / secondOperand;
    }
  
    return secondOperand;
  }
  
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }
  
  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
  }
  
  updateDisplay();
  
  const keys = document.querySelector('.calculator-grid');
  keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
      return;
    }
  
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        handleOperator(value);
        break;
      case '.':
        inputDecimal(value);
        break;
      case 'all-clear':
        resetCalculator();
        break;
      default:
        if (Number.isInteger(parseFloat(value))) {
          inputDigit(value);
        }
    }
  
    updateDisplay();
  });



