const myCalc = calculator();

function CashRegister() {
  let cashRegister = {};
  let buffer = [];
  let opState = {
    add: 'add',
    subtract: 'subtract',
    multiply: 'multiply',
    divide: 'divide'
  };
  let operationToPerform = null;
  let clearFlag = false;
  let opsPressed = 0;
  let isUpdateStopped = false;

  //give the cash register a calculator
  cashRegister.calc = myCalc;

  //add each number pressed to a buffer
  cashRegister.bufferInput = function (input) {
    if(isUpdateStopped) {
      isUpdateStopped = false;
      displayUpdateInterval = setInterval(reg.updateDisplay, 100);
    }
    if(clearFlag) {
      cashRegister.clearBuffer();
      clearFlag = false;
    }
    buffer.push(input);
  };

  //converts buffer of numbers in the display to a usable format
  cashRegister.convertInput = function() {
    if(buffer.length > 0) {
      return parseFloat(buffer.join('')) / 100;
    } else {
      return 0;
    }
  };

  //load the value in the buffer into the calculator
  cashRegister.load = function() {
    cashRegister.calc.load(cashRegister.convertInput());
    clearFlag = true;
  };

  cashRegister.getTotal = function() {
    buffer.splice(1, 64);
    buffer[0] = (cashRegister.calc.getTotal() * 100);
  };

  //add whatever is in our buffer to the calculator's total
  cashRegister.add = function() {
    if(isUpdateStopped) {
      isUpdateStopped = false;
      displayUpdateInterval = setInterval(reg.updateDisplay, 100);
    }
    opsPressed++;
    if(opsPressed > 1) {
      cashRegister.calc.add(cashRegister.convertInput());
      cashRegister.getTotal();
      clearFlag = true;
    } else {
      cashRegister.load();
    }
    operationToPerform = opState.add;
  };

  //subtract whatever is in our buffer to the calculator's total
  cashRegister.subtract = function() {
    if(isUpdateStopped) {
      isUpdateStopped = false;
      displayUpdateInterval = setInterval(reg.updateDisplay, 100);
    }
    opsPressed++;
    if(opsPressed > 1) {
      cashRegister.calc.subtract(cashRegister.convertInput());
      cashRegister.getTotal();
      clearFlag = true;
    } else {
      cashRegister.load();
    }
    operationToPerform = opState.subtract;
  };

  //multiply whatever is in our buffer to the calculator's total
  cashRegister.multiply = function() {
    if(isUpdateStopped) {
      isUpdateStopped = false;
      displayUpdateInterval = setInterval(reg.updateDisplay, 100);
    }
    cashRegister.clearDisplay('×');
    opsPressed++;
    if(opsPressed > 1) {
      cashRegister.calc.multiply(cashRegister.convertInput() * 100);
      cashRegister.clearBuffer();
    } else {
      cashRegister.load();
    }
    operationToPerform = opState.multiply;
  };

  //divide whatever is in our buffer to the calculator's total
  cashRegister.divide = function() {
    if(isUpdateStopped) {
      isUpdateStopped = false;
      displayUpdateInterval = setInterval(reg.updateDisplay, 100);
    }
    cashRegister.clearDisplay('÷');
    opsPressed++;
    if(opsPressed > 1) {
      cashRegister.calc.divide(cashRegister.convertInput() * 100);
      cashRegister.clearBuffer();
    } else {
      cashRegister.load();
    }
    operationToPerform = opState.divide;
  };

  cashRegister.updateQueue = function() {

  };

  cashRegister.equals = function() {
    if(isUpdateStopped) {
      isUpdateStopped = false;
      displayUpdateInterval = setInterval(reg.updateDisplay, 100);
    }
    let num = cashRegister.convertInput();
    if(operationToPerform !== null) {
      if(operationToPerform === opState.multiply ||
        operationToPerform === opState.divide) {
        num *= 100;
      }
      cashRegister.calc[operationToPerform](num);
    }
    operationToPerform = null;
    cashRegister.getTotal();
    clearFlag = true;
    opsPressed = 0;
  };

  //write what's in the display to the register's balance
  cashRegister.depositCash = function() {
    let balParse = parseFloat(document.getElementById('display').innerHTML.slice(1));
    balParse = (cashRegister.calc.recallMemory()) + balParse;
    cashRegister.calc.load(balParse);
    cashRegister.calc.saveMemory();
    cashRegister.clearBuffer();
  };

  //remove the amount that's in the display from the saved balance
  cashRegister.withdrawCash = function() {
    let balParse = parseFloat(document.getElementById('display').innerHTML.slice(1));
    currentBal = cashRegister.calc.recallMemory();
    balParse = (currentBal - balParse);
    if(balParse >= 0) {
      cashRegister.calc.load(balParse);
    } else {
      clearInterval(displayUpdateInterval);
      document.getElementById('display').innerHTML = 'Insufficient funds';
      setTimeout(function() {displayUpdateInterval = setInterval(reg.updateDisplay, 100);}, 1000);
    }
    cashRegister.calc.saveMemory();
    cashRegister.clearBuffer();
  };

  cashRegister.getBalance = function() {
    cashRegister.clearBuffer();
    buffer[0] = cashRegister.calc.recallMemory() * 100;
    clearFlag = true;
  };

  //write what's in the buffer to the display
  cashRegister.updateDisplay = function() {
    //'$' + toFixed()
    let startChar = '$';
    let displayedNumber = cashRegister.convertInput();
    let displayedNumberToFixed = displayedNumber.toFixed(2);
    let displayField = document.getElementById('display');

    if(operationToPerform !== null) {
      switch(operationToPerform) {
        case opState.add:
          startChar = '+$';
          displayField.innerHTML = (startChar + displayedNumberToFixed);
          break;
        case opState.subtract:
          startChar = '-$';
          displayField.innerHTML = (startChar + displayedNumberToFixed);
          break;
        case opState.multiply:
          startChar = '× ';
          displayField.innerHTML = (startChar + (displayedNumber * 100));
          break;
        case opState.divide:
          startChar = '÷ ';
          displayField.innerHTML = (startChar + (displayedNumber * 100));
          break;
      }
    } else {
      startChar = '$';
      displayField.innerHTML = (startChar + displayedNumberToFixed);
    }
  };

  //set buffer to 0
  cashRegister.clearBuffer = function() {
    buffer = [];
  };

  //set display to 0
  cashRegister.clearDisplay = function(opChar) {


    let displayField = document.getElementById('display');
    clearInterval(displayUpdateInterval);
    displayField.innerHTML = opChar;
    isUpdateStopped = true;

  };

  cashRegister.clearButton = function() {
    if(isUpdateStopped) {
      isUpdateStopped = false;
      displayUpdateInterval = setInterval(reg.updateDisplay, 100);
    }
    operationToPerform = null;
    cashRegister.clearBuffer();
  };

  return cashRegister;
}

var reg = CashRegister();
reg.load();
var displayUpdateInterval = setInterval(reg.updateDisplay, 100);

document.getElementById('equals').addEventListener('click', reg.equals);
document.getElementById('clear').addEventListener('click', reg.clearButton);
document.getElementById('add').addEventListener('click', reg.add);
document.getElementById('subtract').addEventListener('click', reg.subtract);
document.getElementById('multiply').addEventListener('click', reg.multiply);
document.getElementById('divide').addEventListener('click', reg.divide);
document.getElementById('getbalance').addEventListener('click', reg.getBalance);
document.getElementById('deposit').addEventListener('click', reg.depositCash);
document.getElementById('withdraw').addEventListener('click', reg.withdrawCash);
document.getElementById('one').addEventListener('click', function() {reg.bufferInput(1);});
document.getElementById('two').addEventListener('click', function() {reg.bufferInput(2);});
document.getElementById('three').addEventListener('click', function() {reg.bufferInput(3);});
document.getElementById('four').addEventListener('click', function() {reg.bufferInput(4);});
document.getElementById('five').addEventListener('click', function() {reg.bufferInput(5);});
document.getElementById('six').addEventListener('click', function() {reg.bufferInput(6);});
document.getElementById('seven').addEventListener('click', function() {reg.bufferInput(7);});
document.getElementById('eight').addEventListener('click', function() {reg.bufferInput(8);});
document.getElementById('nine').addEventListener('click', function() {reg.bufferInput(9);});
document.getElementById('zero').addEventListener('click', function() {reg.bufferInput(0);});
document.getElementById('doublezero').addEventListener('click', function() {reg.bufferInput(0); reg.bufferInput(0);});
