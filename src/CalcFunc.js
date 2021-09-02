function calculator(str) {
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

  recursiveBrackets(nums, operators);

  return nums[0];
}

function recursiveBrackets(nums, operators) {
  console.log(nums, operators);
  if (!operators.includes("(")) return calculate(nums, operators);

  for (let i = operators.length - 1; i >= 0; i--) {
    let op = operators[i];
    let openingIdx = null;
    let closingIdx = null;
    if (op === ")") closingIdx = i;
    if (op === "(") {
      openingIdx = i;
      closingIdx = operators.indexOf(")");
      let numsSlice = nums.slice(openingIdx, closingIdx + 1);
      let opsSlice = operators.slice(openingIdx + 1, closingIdx);
      let subExpression = calculate(numsSlice, opsSlice);
      nums.splice(openingIdx, closingIdx, subExpression);
      operators.splice(openingIdx, closingIdx);
      recursiveBrackets(nums, operators);
    }
  }
  return calculate(nums, operators);
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
