const myCalc = calculator();

function CashRegister() {
  let cashRegister = {};
  let buffer = [];
  let balance = 0;
  let opState = [];

  //give the cash register a calculator
  cashRegister.calc = myCalc;

  //add each number pressed to a buffer
  cashRegister.bufferInput = function (input) {
    buffer.push(input);
  };

  //converts buffer of numbers in the display to a usable format
  cashRegister.convertInput = function() {
    if(buffer.length > 0) {
      return parseFloat(buffer.join("")) / 100;
    } else {
      return 0;
    }
  };

  //load the value in the buffer into the calculator
  cashRegister.load = function() {
    cashRegister.calc.load(cashRegister.convertInput());
    cashRegister.clearBuffer();
  };

  cashRegister.getTotal = function() {
    cashRegister.clearBuffer();
    buffer[0] = (cashRegister.calc.getTotal() * 100);
  };

  //add whatever is in our buffer to the calculator's total
  cashRegister.add = function() {
    cashRegister.load();
    opState.push('a');
  };

  //subtract whatever is in our buffer to the calculator's total
  cashRegister.subtract = function() {
    cashRegister.load();
    opState.push('s');
  };

  //multiply whatever is in our buffer to the calculator's total
  cashRegister.multiply = function() {
    cashRegister.load();
    opState.push('m');
  };

  //divide whatever is in our buffer to the calculator's total
  cashRegister.divide = function() {
    cashRegister.load();
    opState.push('d');
  };

  cashRegister.equals = function() {
    let num = cashRegister.convertInput();
    if(opState.length > 0) {
      for(let i = 0; i < opState.length; i++)
      {
        switch(opState[i]) {
          case 'a':
            cashRegister.calc.add(num);
            break;
          case 's':
            cashRegister.calc.subtract(num);
            break;
          case 'm':
            cashRegister.calc.multiply(num);
            break;
          case 'd':
            cashRegister.calc.divide(num);
            break;
          default:
            cashRegister.calc.load(0);
            break;
        }
      }
    }
    opState = [];
    cashRegister.getTotal();
  };

  //write what's in the display to the register's balance
  cashRegister.depositCash = function() {
    let balParse = document.getElementById('display').innerHTML.slice(1);
    balance += parseFloat(balParse);
    cashRegister.clearBuffer();
  };

  cashRegister.withdrawCash = function() {
    let balParse = document.getElementById('display').innerHTML.slice(1);
    balance -= parseFloat(balParse);
    cashRegister.clearBuffer();
  };

  cashRegister.getBalance = function() {
    cashRegister.clearBuffer();
    buffer[0] = balance * 100;
  };

  //write what's in the buffer to the display
  cashRegister.updateDisplay = function() {
    //'$' + toFixed()
    document.getElementById('display').innerHTML = ('$' + cashRegister.convertInput().toFixed(2));
  };

  //set buffer to 0
  cashRegister.clearBuffer = function() {
    buffer = [];
  };

  return cashRegister;
}

var reg = CashRegister();
reg.load();
setInterval(reg.updateDisplay, 100);

document.getElementById("equals").addEventListener("click", reg.equals);
document.getElementById("clear").addEventListener("click", reg.clearBuffer);
document.getElementById("add").addEventListener("click", reg.add);
document.getElementById("subtract").addEventListener("click", reg.subtract);
document.getElementById("multiply").addEventListener("click", reg.multiply);
document.getElementById("divide").addEventListener("click", reg.divide);
document.getElementById("getbalance").addEventListener("click", reg.getBalance);
document.getElementById("deposit").addEventListener("click", reg.depositCash);
document.getElementById("withdraw").addEventListener("click", reg.withdrawCash);
document.getElementById("one").addEventListener("click", function(){reg.bufferInput(1);});
document.getElementById("two").addEventListener("click", function(){reg.bufferInput(2);});
document.getElementById("three").addEventListener("click", function(){reg.bufferInput(3);});
document.getElementById("four").addEventListener("click", function(){reg.bufferInput(4);});
document.getElementById("five").addEventListener("click", function(){reg.bufferInput(5);});
document.getElementById("six").addEventListener("click", function(){reg.bufferInput(6);});
document.getElementById("seven").addEventListener("click", function(){reg.bufferInput(7);});
document.getElementById("eight").addEventListener("click", function(){reg.bufferInput(8);});
document.getElementById("nine").addEventListener("click", function(){reg.bufferInput(9);});
document.getElementById("zero").addEventListener("click", function(){reg.bufferInput(0);});
document.getElementById("doublezero").addEventListener("click", function(){reg.bufferInput(0); reg.bufferInput(0);});
document.getElementById("decimal").addEventListener("click", function(){reg.bufferInput('.');});