function CashRegister() {
  let cashRegister = {};
  let buffer = [];
  let balance = 0;

  //give the cash register a calculator
  cashRegister.calc = Calculator();

  //add each number pressed to a buffer
  cashRegister.bufferInput = function (input) {
    if(typeof input === 'number') {
      buffer.push(input);
    }
  };

  //converts buffer of numbers in the display to a usable format
  cashRegister.convertInput = function() {
    if(buffer.length > 0) {
      return parseInt(buffer.join(""));
    } else {
      return 0;
    }
  };

  //load the value in the buffer into the calculator
  cashRegister.load = function() {
    this.calc.load(this.convertInput());
  };

  //add whatever is in our buffer to the calculator's total
  cashRegister.add = function() {
    this.calc.add(this.convertInput());
  };

  //subtract whatever is in our buffer to the calculator's total
  cashRegister.subtract = function() {
    this.calc.subtract(this.convertInput());
  };

  cashRegister.equals = function() {
    this.updateDisplayByInput(this.calc.getTotal());
  };

  //write what's in the display to the register's balance
  cashRegister.depositCash = function() {
    balance += parseInt(document.getElementById('display').innerHTML);
  };

  cashRegister.withdrawCash = function() {
    balance -= parseInt(document.getElementById('display').innerHTML);
  };

  //write what's in the buffer to the display
  cashRegister.updateDisplay = function() {
    //'$' + toFixed()
    document.getElementById('display').innerHTML = ('$' + this.convertInput().toFixed(2));
  };

  //write what's in a value to the display (overloaded)
  cashRegister.updateDisplayByInput = function(input) {
    //'$' + toFixed()
    document.getElementById('display').innerHTML = ('$' + input.toFixed(2));
  };

  //set display to 0
  cashRegister.clearDisplay = function() {
    document.getElementById('display').innerHTML = '$0.00';
  };

  return cashRegister;
}

var reg = CashRegister();
setInterval(reg.updateDisplay(), 1000);

document.getElementById("add").addEventListener("click", reg.add);
document.getElementById("subtract").addEventListener("click", reg.subtract);