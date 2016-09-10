const calculator = (function() {
  let _memory;
  let _total;

  let calculator = {};

  calculator.load = function(x) {
    this._total = x;
    if(typeof this._total !== 'number') {
      throw new Error('Type mismatch');
    }
    return this._total;
  };

  calculator.getTotal = function() {
    if(this._total === undefined) {
      this._total = 0;
    }
    return this._total;
  };

  calculator.add = function (x) {
    if(typeof x === 'number') {
      this._total += x;
    } else {
      throw new Error('Type mismatch');
    }
  };

  calculator.subtract = function (x) {
    if(typeof x === 'number') {
      this._total -= x;
    } else {
      throw new Error('Type mismatch');
    }
  };

  calculator.multiply = function (x) {
    if(typeof x === 'number') {
      this._total *= x;
    } else {
      throw new Error('Type mismatch');
    }
  };

  calculator.divide = function (x) {
    if(typeof x === 'number') {
      this._total /= x;
    } else {
      throw new Error('Type mismatch');
    }
  };

  calculator.recallMemory = function () {
    if(typeof this._memory !== 'number') {
      this._memory = 0;
    }
    return this._memory;
  };

  calculator.saveMemory = function() {
    this._memory = this._total;
  };

  calculator.clearMemory = function () {
    this._memory = 0;
  };

  return calculator;
});
