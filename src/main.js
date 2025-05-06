let display = document.getElementById("display");
let expressionDisplay = document.getElementById("expression");

let currentInput = "0";
let previousInput = null;
let operator = null;
let expression = "";

function updateDisplay() {
    display.textContent = currentInput;
    expressionDisplay.textContent = expression;
}

function inputDigit(digit) {
    if (currentInput === "0") {
        currentInput = digit;
    } else {
        currentInput += digit;
    }
    updateDisplay();
}

function inputDecimal() {
    if (!currentInput.includes(".")) {
        currentInput += ".";
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = "0";
    previousInput = null;
    operator = null;
    expression = "";
    updateDisplay();
}

function inputOperator(op) {
    if (operator && previousInput !== null) {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    expression = `${currentInput} ${getOperatorSymbol(op)}`;
    currentInput = "0";
    updateDisplay();
}

function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function percentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

function calculate() {
    if (previousInput === null || operator === null) return;

    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);
    let result;

    switch (operator) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/": result = b !== 0 ? a / b : "Error"; break;
        default: return;
    }

    expression = `${previousInput} ${getOperatorSymbol(operator)} ${currentInput}`;
    currentInput = String(result);
    previousInput = null;
    operator = null;
    updateDisplay();
}

function getOperatorSymbol(op) {
    return {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷"
    }[op] || op;
}
