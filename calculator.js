
// let runningTotal = 0;

// let buffer = "0"

// let previousOperator = null;


// const screens = document.querySelector('.screen')


// function handleSymbol(value) {
//     switch(value) {
//         case 'C':
//             buffer = "0";
//             runningTotal = 0;
//             previousOperator = null;
//             break;
//         case "=":
//             if(previousOperator === null){
//                 return;
//             }
//             flushOperation(parseInt(buffer));
//             previousOperator = null;
//             buffer = " " + runningTotal;
//             runningTotal = 0;
//             break;
//         case "←":
//             if (buffer.length === 1) {
//                 buffer = "0";
//             }else{
//                 buffer = buffer.substring(0, buffer.length - 1)
//             }
//             break;
//             default:
//             handleMath(value);
//     }
// }


// function handleMath(value) {
//     const intBuffer = parseInt(buffer);
//     if(runningTotal === 0) {
//         runningTotal = intBuffer
//     }else{
//         flushOperation(intBuffer)
//     }
//     previousOperator = value;

//     buffer = "0"
// }

// function flushOperation() {
//     if (previousOperator === "+") {
//         runningTotal += intBuffer
//     }else if (previousOperator === "−") {
//         runningTotal -= intBuffer
//     }else if (previousOperator === "✕") {
//         runningTotal *= intBuffer
//     }else {
//         runningTotal /= intBuffer
//     }
// }


// function rerender() {
//     screens.innerText = buffer;
// }

// function handleNumber(value) {
//     if (buffer === "0") {
//         buffer = value
//     }else{
//         buffer += value
//     }
// }

// function buttonClick(value) {
//     if (isNaN(parseInt(value))) {
//         handleSymbol(value)
//     }else {
//         handleNumber(value)
//     }
//     rerender();
// }

// document.querySelector('.calc-buttons').addEventListener('click', function(event) {
//     buttonClick(event.target.innerText)
// })



// This make it possible all the calculations
let runningTotal = 0;

// This keeps in track of what users type in...
let buffer = "0";
let previousOperator;
const screens = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    // do nothing
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "−") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "✕") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        // need two numbers to do math
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = +runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "−":
    case "✕":
    case "÷":
      handleMath(value);
      break;
  }
}

function rerender() {
  screens.innerText = buffer;
}

function init() {
  document.querySelector(".calc-buttons").addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
  });
}

init();

