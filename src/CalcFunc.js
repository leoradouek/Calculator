function calculator(str) {
  str = str.replace(/\s+/g, ""); // remove whitespaces
  if (str.match(/[a-z]/g)) return "Invalid Input";
  if (!checkBrackets(str.split(""))) return "Invalid Input";

  function calc(str) {
    if (!str.split("").includes("(")) return calculate(str);

    for (let i = 0; i < str.length; i++) {
      console.log("recursion str", str);
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
        str = str.replace(`(${innerStr})`, calculate(innerStr));

        return calc(str);
      }
    }
  }
  //console.log(str);
  return calc(str);
}

function calculate(str) {
  // Separate the str input between nums and operators:
  let nums = [];
  let operators = [];

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (
      isNumber(char) ||
      (char === "-" && i === 0) ||
      (char === "-" && isOperator(str[i - 1]) && isNumber(str[i + 1]))
    ) {
      let currentNum = parseFloat(str.slice(i)); // include the whole num, not just the first digit
      nums.push(currentNum);
      i += currentNum.toString().length - 1; // skip to the end of the num
    } else if (isOperator(char)) {
      operators.push(char);
    }

    // else {
    //   return "Invalid Input2"; // invalid if includes character that is not a number of operator (eg. a letter)
    // }
    // Check for invalid inputs: 1. no operators, 2. more operators than numbers, 3. unbalanced brackets
    if (!operators.length && !checkBrackets(operators)) return "Invalid Input";

    //if (nums.length <= operators.length) return "Invalid Input4"; // invalid if more operators than numbers
  }

  function orderOfOps() {
    while (operators.includes("/")) {
      let idx = operators.indexOf("/");
      let result = nums[idx] / nums[idx + 1];
      nums.splice(idx, 2, result);
      operators.splice(idx, 1);
    }

    while (operators.includes("*")) {
      let idx = operators.indexOf("*");
      let result = nums[idx] * nums[idx + 1];
      nums.splice(idx, 2, result);
      operators.splice(idx, 1);
    }

    while (operators.includes("-")) {
      let idx = operators.indexOf("-");
      let result = nums[idx] - nums[idx + 1];
      nums.splice(idx, 2, result);
      operators.splice(idx, 1);
    }

    while (operators.includes("+")) {
      let idx = operators.indexOf("+");
      let result = nums[idx] + nums[idx + 1];
      nums.splice(idx, 2, result);
      operators.splice(idx, 1);
    }

    return nums[0];
  }

  return orderOfOps(nums, operators);
}

// Checks for balanced brackets
function checkBrackets(operators) {
  let brackets = [];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "(") {
      brackets.push(operators[i]);
    } else if (operators[i] === ")") {
      if (brackets.pop() !== "(") return false;
    }
  }
  if (brackets.length > 0) return false;
  return true;
}

// Checks if character is a number
function isNumber(character) {
  return character.match(/[0-9]/g) !== null;
}

// Checks if characters is an operator
function isOperator(character) {
  return character.match(/[-+/*]/g) !== null;
}

export default calculator;
/*





function calculator2(str) {
  str = str.replace(/\s+/g, ""); // remove whitespaces
  if (str.match(/[a-z]/g)) return "Invalid Input1";

  // Separate the str input between nums and operators:
  let nums = [];
  let operators = [];

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (
      isNumber(char) ||
      (char === "-" && i === 0) ||
      (char === "-" && isOperator(str[i - 1]) && isNumber(str[i + 1]))
    ) {
      let currentNum = parseFloat(str.slice(i)); // include the whole num, not just the first digit
      nums.push(currentNum);
      i += currentNum.toString().length - 1; // skip to the end of the num
    } else if (isOperator(char)) {
      operators.push(char);
    } else {
      return "Invalid Input2"; // invalid if includes character that is not a number of operator (eg. a letter)
    }
  }
  // Check for invalid inputs: 1. no operators, 2. more operators than numbers, 3. unbalanced brackets
  if (!operators.length && !checkBrackets(operators)) return "Invalid Input3";
  let opsLength = operators
    .filter((op) => op !== "(")
    .filter((op) => op !== ")").length;
  if (nums.length <= opsLength) return "Invalid Input4"; // invalid if more operators than numbers

  //recursiveBrackets(nums, operators);
  calculate(nums, operators);
  //return nums[0];
}

function calculator(str) {
  str = str.replace(/\s+/g, ""); // remove whitespaces
  function calc(str) {
    if (!str.split("").includes("(")) return str[0] + str[2];
    for (let i = 0; i < str.length; i++) {
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
        console.log(openingIdx, closingIdx);
        let innerStr = str.substring(openingIdx + 1, closingIdx);
        str = calc(innerStr);
      }
    }
  }
  return calc(str);
}

function calculate(nums, operators) {
  while (operators.includes("/")) {
    let idx = operators.indexOf("/");
    let result = nums[idx] / nums[idx + 1];
    nums.splice(idx, 2, result);
    operators.splice(idx, 1);
  }

  while (operators.includes("*")) {
    let idx = operators.indexOf("*");
    let result = nums[idx] * nums[idx + 1];
    nums.splice(idx, 2, result);
    operators.splice(idx, 1);
  }

  while (operators.includes("-")) {
    let idx = operators.indexOf("-");
    let result = nums[idx] - nums[idx + 1];
    nums.splice(idx, 2, result);
    operators.splice(idx, 1);
  }

  while (operators.includes("+")) {
    let idx = operators.indexOf("+");
    let result = nums[idx] + nums[idx + 1];
    nums.splice(idx, 2, result);
    operators.splice(idx, 1);
  }

  return nums[0];
}
// Checks if character is a number
function isNumber(character) {
  return character.match(/[0-9]/g) !== null;
}

// Checks if characters is an operator
function isOperator(character) {
  return character.match(/[-+/*()]/g) !== null;
}

// Checks for balanced brackets
function checkBrackets(operators) {
  let brackets = [];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "(") {
      brackets.push(operators[i]);
    } else if (operators[i] === ")") {
      if (brackets.pop() !== "(") return false;
    }
  }
  if (brackets.length > 0) return false;
  return true;
}

export default calculator;


*/
