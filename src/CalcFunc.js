function calculator(str) {
  let operators = {
    "+": true,
    "-": true,
    "/": true,
    "*": true,
  };

  let brackets = {
    "(": true,
    ")": true,
  };

  if (!checkBrackets(str)) return "Syntax Error"; // invalid if brackets aren't balanced (see helper function below)

  // if there is a decimal point without an integer before (eg. .2) add a zero before it
  let array = str.split("");
  for (let i = 0; i < array.length; i++) {
    if (array[i] === "." && isNaN(array[i - 1])) {
      array[i] = "0.";
    }
  }
  str = array.join("");

  //convert str to array:
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char === " ") continue;

    if (
      // if number or '-' associated with negative number
      !isNaN(char) ||
      (char === "-" &&
        (i === 0 || (operators[str[i - 1]] && !isNaN(str[i + 1]))))
    ) {
      // if previous char is a number:
      if (!isNaN(arr[arr.length - 1])) return "Syntax Error";

      let num = parseFloat(str.slice(i)); // include the whole num, not just the first digit
      arr.push(num);
      i += num.toString().length - 1; // skip to the end of the num
    } else if (brackets[char]) {
      arr.push(char);
    } else if (operators[char]) {
      // if 2 or more operators in a row it is invalid (exception: '-' associated with neg number, already taken into account above)
      if (operators[arr[arr.length - 1]]) return "Syntax Error";
      arr.push(char);
    } else {
      return "Invalid Input";
    }
  }

  // if expression starts or ends with an operator it is invalid
  if (operators[arr[0]] || operators[arr[arr.length - 1]])
    return "Syntax Error";

  return calculate(arr);

  function calculate(arr) {
    let num = null;
    let stack = [];
    let operator = "+";

    for (let i = 0; i < arr.length; i++) {
      let char = arr[i];

      if (!isNaN(char)) {
        num = char;
      } else {
        if (arr[i] === "(") {
          // need to find closing bracket, while taking into account that there can be brackets nested within
          let openingIdx = i;
          let completed = 0;
          while (i < str.length) {
            if (arr[i] === "(") completed++;
            if (arr[i] === ")") completed--;
            if (completed === 0) break;
            i++;
          }
          let closingIdx = i;
          let innerArr = arr.slice(openingIdx + 1, closingIdx);

          // calculate result of inner expression and store it as num
          num = calculate(innerArr);
        } else {
          operator = char;
        }
      }

      if (num !== null) {
        // to take order of operations into account: process multiplication and division right away
        if (operator === "-") {
          stack.push(-num);
        } else if (operator === "+") {
          stack.push(num);
        } else if (operator === "*") {
          stack.push(stack.pop() * num);
        } else if (operator === "/") {
          stack.push(stack.pop() / num);
        }
      }

      num = null; // reset num to null
    }

    return stack.reduce((total, num) => {
      return total + num;
    }, 0);
  }
}

// Helper function - checks if brackets are balanced
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
