// Select necessary DOM elements
const result = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");

// Variables to track the calculator's state
let currentOperand = "";
let previousOperand = "";
let operation = "";

// Attach click event listeners to all buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => handleInput(button.dataset.key));
});

// Handle button input
function handleInput(input) {
    switch (input) {
        case "clear":
            clearAll();
            break;
        case "ce":
            deleteLast();
            break;
        case "+/-":
            toggleSign();
            break;
        case "=":
            calculateResult();
            break;
        default:
            appendInput(input);
            break;
    }
}

// Handle keyboard input
document.addEventListener("keydown", (e) => {
    const keyMap = {
        Enter: "=",
        Backspace: "ce",
        Delete: "clear",
        "/": "/",
        "*": "*",
        "-": "-",
        "+": "+",
        "%": "%",
        ".": ".",
    };

    const key = e.key;
    const input = keyMap[key] || (/\d/.test(key) ? key : null);

    if (input) {
        handleInput(input);
    }
});

// Append numbers or operators to the input
function appendInput(input) {
    if (isNaN(input) && isNaN(currentOperand)) {
        return; // Prevent consecutive operators
    }
    if (isNaN(input) && currentOperand === "") {
        return; // Prevent operator at the beginning
    }

    if (!isNaN(input) || input === ".") {
        currentOperand += input;
    } else {
        if (previousOperand !== "") {
            calculateResult();
        }
        operation = input;
        previousOperand = currentOperand;
        currentOperand = "";
    }
    updateDisplay();
}

// Clear the calculator
function clearAll() {
    currentOperand = "";
    previousOperand = "";
    operation = "";
    updateDisplay();
}

// Delete the last character
function deleteLast() {
    currentOperand = currentOperand.slice(0, -1);
    updateDisplay();
}

// Toggle the sign of the current number
function toggleSign() {
    if (currentOperand !== "") {
        currentOperand = String(-parseFloat(currentOperand));
        updateDisplay();
    }
}

// Perform the calculation
function calculateResult() {
    if (previousOperand === "" || currentOperand === "" || operation === "") {
        return;
    }

    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);
    let resultValue = 0;

    switch (operation) {
        case "+":
            resultValue = prev + curr;
            break;
        case "-":
            resultValue = prev - curr;
            break;
        case "*":
            resultValue = prev * curr;
            break;
        case "/":
            resultValue = curr !== 0 ? prev / curr : "Error";
            break;
        case "%":
            resultValue = prev % curr;
            break;
        default:
            return;
    }

    currentOperand = String(resultValue);
    previousOperand = "";
    operation = "";
    updateDisplay();
}

// Update the calculator's display
function updateDisplay() {
    result.value = currentOperand || previousOperand || "0";
}
