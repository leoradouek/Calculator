function calculator(str) {
  // Separate the str input between nums and operators.
  let nums = [];
  let operators = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") continue; // skip the spaces
    if (str[i].match(/[a-z]/g)) return "Invalid Input"; // invalid if input is a letter
    // is the character a number or a '-' that isn't an operator (ie. negative number)
    if (
      str[i].match(/[0-9]/g) ||
      (str[i].match(/[-]/g) &&
        !str[i - 1].match(/[0-9]/g) &&
        str[i + 1].match(/[0-9]/g))
    ) {
      let currentNum = parseFloat(str.slice(i)); // include the whole num, not just the first digit
      nums.push(currentNum);
      i += currentNum.toString().length - 1; // skip to the end of the num
    } else {
      operators.push(str[i]);
    }
  }

  if (!operators.length) return nums[0]; // if no operator, return the num

  // Checking for invalid inputs:

  if (!operators.length > 2) return "Invalid Input"; // calculator supports max 2 operators in a series

  if (!checkBrackets(operators)) return "Invalid Input"; // if there are any brackets, check if valid (see function below)

  let opsLength = operators
    .filter((op) => op !== "(")
    .filter((op) => op !== ")").length;
  if (nums.length > opsLength) return "Invalid Input"; // if there are more operators (not including brackets) than nums then it's invalid

  // brackets
  while (operators.includes("(")) {
    let idx = operators.indexOf("(");
    let result = 0;
    if (operators[idx] === "*") {
      result = nums[idx] * nums[idx + 1];
    } else if (operators[idx + 1] === "/") {
      result = nums[idx + 1] / nums[idx + 1];
    } else if (operators[idx + 1] === "+") {
      result = nums[idx] + nums[idx + 1];
    } else if (operators[idx + 1] === "-") {
      result = nums[idx] - nums[idx + 1];
    } else if (operators[idx + 1] === "(") {
      console.log("nesting brackets"); //////////////// COME BACK TO THIS
    }
    nums.splice(idx, 2, result);
    operators.splice(idx, 3);
  }

  while (operators.includes("*")) {
    let idx = operators.indexOf("*");
    let result = nums[idx] * nums[idx + 1];
    nums.splice(idx, 2, result);
    operators.splice(idx, 1);
  }

  while (operators.includes("/")) {
    let idx = operators.indexOf("/");
    let result = nums[idx] / nums[idx + 1];
    nums.splice(idx, 2, result);
    operators.splice(idx, 1);
  }

  while (operators.includes("+")) {
    let idx = operators.indexOf("+");
    let result = nums[idx] + nums[idx + 1];
    nums.splice(idx, 2, result);
    operators.splice(idx, 1);
  }

  while (operators.includes("-")) {
    let idx = operators.indexOf("-");
    let result = nums[idx] - nums[idx + 1];
    nums.splice(idx, 2, result);
    operators.splice(idx, 1);
  }

  if (nums.length > 1) return "Error";
  return nums[0];
}

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

function nestedBrackets(nums, operators) {
  if (operators.includes("(")) {
    let idx = operators.indexOf("(");
    let result = 0;
    if (operators[idx] === "*") {
      result = nums[idx] * nums[idx + 1];
    } else if (operators[idx + 1] === "/") {
      result = nums[idx + 1] / nums[idx + 1];
    } else if (operators[idx + 1] === "+") {
      result = nums[idx] + nums[idx + 1];
    } else if (operators[idx + 1] === "-") {
      result = nums[idx] - nums[idx + 1];
    } else if (operators[idx + 1] === "(") {
      operators.splice(idx + 2, 1);
      operators.splice(idx, 1);
      nestedBrackets(nums, operators);
    }
    nums.splice(idx, 2, result);
    operators.splice(idx, 3);
  }
}

export default calculator;
