const display = document.querySelector(".calculator-input");
const buttons = document.querySelector(".calculator-buttons");

//* Defined the value to appear
let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingSecondValue = false;

updateDisplay();
//* Updating value appear
function updateDisplay() {

    display.value = displayValue;

}

buttons.addEventListener("click", function (e) {
    const externalSpace = e.target;
    if (!externalSpace.matches("button")) {
        return;
    };

    if (externalSpace.classList.contains("operator")) {
        // console.log("operator", externalSpace.value); //! Test logs
        handleOperator(externalSpace.value);
        updateDisplay();
        return;
    }
    if (externalSpace.classList.contains("decimal")) {
        // console.log("decimal", externalSpace.value); //! Test logs
        inputDecimal();
        updateDisplay();
        return;
    }
    if (externalSpace.classList.contains("clear")) {
        // console.log("clear", externalSpace.value); //! Test logs
        clear();
        updateDisplay();
        return;
    }
    //console.log("number", externalSpace.value); //! Test logs
    inputNumber(externalSpace.value);
    updateDisplay();
});

function inputNumber(num) {
    if (waitingSecondValue) {
        displayValue = num;
        waitingSecondValue = false;
    }
    else {
        displayValue = displayValue === "0" ? num : displayValue + num;
    }

    console.log(displayValue, firstValue, operator, waitingSecondValue);
}

function inputDecimal() {
    if (!displayValue.includes(".")) {
        displayValue += ".";
    }
};

function clear() {
    displayValue = "0";
};

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if (operator && waitingSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    }
    else if (operator) {
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(6))}`
        firstValue = result;
    }
    waitingSecondValue = true;
    operator = nextOperator;

    console.log(displayValue, firstValue, operator, waitingSecondValue);

}

function calculate(first, second, operator) {
    if (operator === "+") {
        return first + second;
    }
    else if (operator === "-") {
        return first - second;
    }
    else if (operator === "*") {
        return first * second;
    }
    else if (operator === "/") {
        return first / second;
    }

    return second;
}


