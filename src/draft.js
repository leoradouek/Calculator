// var calculate = function (str) {
//   //1. init values
//   str = str.replace(/\s+/g, ""); //remove spaces
//   const stack = []; //stack to store the block value
//   let i = 0; //moving start index
//   let sign = "+"; //init as positive

//   //2. loop through all element in string
//   for (let i = 0; i < str.length; i++) {
//     let char = str[i];

//     if (char === "(") {
//       // find the closed block use it to recursivly calculate the value inside

//       let left_block = 1;
//       let index = i + 1;

//       while (index < s.length && left_block > 0) {
//         //until the block is close which means left_block reduce to zero
//         if (s[index] === "(") left_block++;
//         else if (s[index] === ")") left_block--;
//         index++;
//       }

//       let innerValue = calculate(s.substring(i + 1, index - 1)); //include all elements in the closed block recursively

//       i = index; //place the i to the position after close block
//       //get back from recursive result and add to current stack

//       operation(innerValue, sign, stack); //DO the operation process
//     } else if (c.match(/\d/)) {
//       // if it is a number

//       let index = i;
//       let num = 0;

//       while (index < s.length && s[index].match(/\d/)) {
//         // loop to the end to get the entire number
//         //parse all digit string to number
//         num = num * 10 + parseInt(s[index++]);
//       }

//       i = index;

//       operation(num, sign, stack); // do the operation process
//     } else {
//       //if not () or number it must be sign
//       sign = c;
//       i++;
//     }
//   }

//   function operation(num, sign, stack) {
//     //base on the operation

//     if (sign == "+") {
//       stack.push(num); //+ just add value to stack
//     } else if (sign === "-") {
//       stack.push(-num); //- add - value to stack
//     } else if (sign === "*") {
//       // since the * have piority pop previous number and do * then push back
//       stack.push(stack.pop() * num);
//     } else if (sign === "/") {
//       // since the * have piority pop previous number and do * then push back
//       stack.push(stack.pop() / num);
//     }
//   }

//   let result = 0;
//   while (stack.length !== 0) result += stack.pop(); //add all value in stack together since it only +/-

//   return Math.floor(result);
// };

// export default calculate;

//////////ORIGINAL CODE . splitting nums and ops
// // Input string is invalid if it 1) includes a letter, 2) has more than 2 operators in a row
// if (ops[str[i]] && ops[str[i + 1]] && ops[str[i + 2]])
//   return "Invalid Input";

// // is the character a number or a '-' that isn't an operator (ie. negative number)
// //////// NEED TO TAKE INTO ACCOUNT SPACES IN FRONT 1 + 10           -5////////////
// if (
//   str[i].match(/[0-9]/g) ||
//   i === 0 ||
//   (str[i].match(/[-]/g) &&
//     !str[i - 1].match(/[0-9]/g) &&
//     str[i + 1].match(/[0-9]/g))
// ) {
//   let currentNum = parseFloat(str.slice(i));
//   nums.push(currentNum);
//   i += currentNum.toString().length - 1;
// } else {
//   operators.push(str[i]);
// }

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

// // brackets
// while (operators.includes("(")) {
//   let idx = operators.indexOf("(");
//   let result = 0;

//   if (operators[idx + 1] === ")") {
//     // if there is only a single number within the brackets (eg. 1+(9))
//     result = nums[idx];
//     operators.splice(idx, 2);
//     continue;
//   }

//   if (operators[idx + 1] === "*") {
//     result = nums[idx] * nums[idx + 1];
//   } else if (operators[idx + 1] === "/") {
//     result = nums[idx + 1] / nums[idx + 1];
//   } else if (operators[idx + 1] === "+") {
//     result = nums[idx] + nums[idx + 1];
//   } else if (operators[idx + 1] === "-") {
//     result = nums[idx] - nums[idx + 1];
//   } else if (operators[idx + 1] === "(") {
//     console.log("nesting brackets"); //////////////// COME BACK TO THIS
//   }
//   nums.splice(idx, 2, result); // remove the two numbers and replace with the result
//   operators.splice(idx, 3); // remove the brackets and the operator
// }
