function calculate(str) {
  let ops = { "+": true, "-": true, "*": true, "/": true };
  // Separate the str input between nums and operators.
  let nums = [];
  let operators = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") continue; // skip the spaces

    // Input string is invalid if it 1) includes a letter, 2) has more than 2 operators in a row
    if (
      (ops[str[i]] && ops[str[i + 1]] && ops[str[i + 2]]) ||
      str[i].match(/[a-z]/g)
    )
      return "Invalid Input";

    // is the character a number or a '-' that isn't an operator (ie. negative number)
    if (
      str[i].match(/[0-9]/g) ||
      i === 0 ||
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
  console.log(nums, operators);
  if (!operators.length && nums.length === 1) return nums[0]; // if no operator, return the num (but also check that user didn't input eg. 9 8 8 7)

  // Checking for invalid inputs:

  if (!checkBrackets(operators)) return "Invalid Input"; // if there are any brackets, check if valid (see function below)

  let opsLength = operators
    .filter((op) => op !== "(")
    .filter((op) => op !== ")").length;
  if (nums.length <= opsLength) return "Invalid Input"; // invalid if more operators than numbers

  // brackets
  while (operators.includes("(")) {
    let idx = operators.indexOf("(");
    let result = 0;

    if (operators[idx + 1] === ")") {
      // if there is only a single number within the brackets (eg. 1+(9))
      result = nums[idx];
      operators.splice(idx, 2);
      continue;
    }

    if (operators[idx + 1] === "*") {
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
    nums.splice(idx, 2, result); // remove the two numbers and replace with the result
    operators.splice(idx, 3); // remove the brackets and the operator
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

  if (nums.length > 1) return "Invalid Input";

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

export default calculate;
