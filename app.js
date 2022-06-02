const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const previousTextElement = document.querySelector("[data-previous]");
const currentTextElement = document.querySelector("[data-current]");
const clearButton = document.querySelector("[data-clear]");

class Calculator {
  constructor(previousTextElement, currentTextElement) {
    this.previousTextElement = previousTextElement;
    this.currentTextElement = currentTextElement;
    this.clear();
  }
  calculate() {
    let result;

    const _previousOperandFloat = parseFloat(this.previousOperand);
    const _currentOperandFloat = parseFloat(this.currentOperand);

    if (isNaN(_previousOperandFloat) || isNaN(_currentOperandFloat)) return;

    switch (this.operation) {
      case "+":
        result = _previousOperandFloat + _currentOperandFloat;
        break;
      case "-":
        result = _previousOperandFloat - _currentOperandFloat;
        break;
      case "x":
        result = _previousOperandFloat * _currentOperandFloat;
        break;
      case "÷":
        result = _previousOperandFloat / _currentOperandFloat;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  chooseOperation(operation) {
    if (this.operation != "") {
      this.calculate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return;

    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = " ";
    this.operation = undefined;
  }

  updateDisplay() {
    this.previousTextElement.innerText = `${this.previousOperand}${
      this.operation || ""
    }`;
    this.currentTextElement.innerText = this.currentOperand;
  }
}

const calculator = new Calculator(previousTextElement, currentTextElement);

for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}
for (const operatorButton of operatorButtons) {
  operatorButton.addEventListener("click", () => {
    calculator.chooseOperation(operatorButton.innerText);
    calculator.updateDisplay();
  });
}

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});
