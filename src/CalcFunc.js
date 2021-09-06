function calculator(str) {
  str = str.replace(/\s+/g, ""); // remove whitespaces

  if (!checkBrackets(str)) return "Invalid Input"; // invalid if brackets aren't balanced

  return calculate(str);

  function calculate(str) {
    let num = 0;
    let stack = []; // create a stack to store nums
    let operator = "+";

    for (let i = 0; i < str.length; i++) {
      let char = str[i];

      // check if invalid char (eg. letter)
      if (!isOperator(char) && !isNumber(char) && char !== "(" && char !== ")")
        return "Invalid Input";

      // if char is a number or '-' associated with negative number
      if (
        isNumber(char) ||
        (char === "-" && i === 0) ||
        (char === "-" && isOperator(str[i - 1]) && isNumber(str[i + 1]))
      ) {
        num = parseFloat(str.slice(i)); // include the whole num, not just the first digit
        i += num.toString().length - 1; // skip to the end of the num
      } else if (isOperator(char)) {
        if (isOperator(str[i - 1])) return "Invalid Input"; // cannot have 2 operators in a row (can have with negative but already took care of it)
      }

      // if char is operator or bracket
      if (isNaN(char) || i === str.length - 1) {
        if (str[i] === "(") {
          // need to find closing bracket, while taking into account that there can be brackets nested within
          let openingIdx = i;
          let completed = 0;
          while (i < str.length) {
            if (str[i] === "(") completed++;
            if (str[i] === ")") completed--;
            if (completed === 0) break;
            i++;
          }
          let closingIdx = i;
          let innerStr = str.substring(openingIdx + 1, closingIdx);
          num = calculate(innerStr);
        }

        // to support order of operations: process multiplication and division as we go, waiting until the end to process addition and subtra
        if (operator === "-") {
          stack.push(-num);
        }

        if (operator === "+") {
          stack.push(num);
        }

        if (operator === "*") {
          stack.push(stack.pop() * num);
        }

        if (operator === "/") {
          stack.push(stack.pop() / num);
        }
        // reset:
        num = 0;
        operator = char;
      }
    }

    return stack.reduce((total, num) => {
      return total + num;
    }, 0);
  }
}

// Helper Functions:
// Checks if character is a number
function isNumber(character) {
  return character.match(/[0-9]/g) !== null;
}

// Checks if characters is an operator
function isOperator(character) {
  return character.match(/[-+/*]/g) !== null;
}

// Checks if brackets are balanced
function checkBrackets(str) {
  let brackets = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") {
      brackets.push(str[i]);
    } else if (str[i] === ")") {
      if (brackets.pop() !== "(") return false;
    }
  }
  if (brackets.length > 0) return false;
  return true;
}

export default calculator;
