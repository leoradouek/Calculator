import { useState } from "react";
import calculator from "./CalcFunc";
import "./Calculator.css";

const Calculator = () => {
  // const [result, setResult] = useState("");
  const [expression, setExpression] = useState("");
  const [clear, setClear] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page from refreshing when clicking submit

    let sum = calculator(expression);
    // setResult(sum);
    setExpression(sum);
    setClear(true); // if user clicks '=', then the next number should clear and start again
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (clear) {
      // if user just summed the expression, then clear what's there and start again
      setExpression(e.target.value);
      setClear(false);
    } else {
      setExpression(expression + e.target.value);
    }
  };

  const handleClear = (e) => {
    setExpression("");
  };

  return (
    <div>
      <div className="calculator-container">
        {/* <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              required
              type="text"
              name="word"
              value={expression}
              onChange={(e) => setExpression(e.target.value)} // to keep track of value that is entered and store in state
            />
          </div>
        </form> */}
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setExpression(e.target.value)} // to allow user to type in input box directly
            type="text"
            value={expression}
          ></input>
        </form>

        <div className="button-container">
          <button onClick={handleClear} className="calculator-button clear">
            clear
          </button>
          <button
            onClick={handleClick}
            value="("
            className="calculator-button operator"
          >
            (
          </button>
          <button
            onClick={handleClick}
            value=")"
            className="calculator-button operator"
          >
            )
          </button>
          <button
            onClick={handleClick}
            value="/"
            className="calculator-button operator"
          >
            /
          </button>
          <button onClick={handleClick} value="7" className="calculator-button">
            7
          </button>
          <button onClick={handleClick} value="8" className="calculator-button">
            8
          </button>
          <button onClick={handleClick} value="9" className="calculator-button">
            9
          </button>
          <button
            onClick={handleClick}
            value="*"
            className="calculator-button operator "
          >
            x
          </button>
          <button onClick={handleClick} value="4" className="calculator-button">
            4
          </button>
          <button onClick={handleClick} value="5" className="calculator-button">
            5
          </button>
          <button onClick={handleClick} value="6" className="calculator-button">
            6
          </button>
          <button
            onClick={handleClick}
            value="-"
            className="calculator-button operator"
          >
            -
          </button>
          <button onClick={handleClick} value="1" className="calculator-button">
            1
          </button>
          <button onClick={handleClick} value="2" className="calculator-button">
            2
          </button>
          <button onClick={handleClick} value="3" className="calculator-button">
            3
          </button>
          <button
            onClick={handleClick}
            value="+"
            className="calculator-button operator"
          >
            +
          </button>
          <button
            onClick={handleClick}
            value="0"
            className="calculator-button zero"
          >
            0
          </button>
          <button onClick={handleClick} value="." className="calculator-button">
            .
          </button>
          <button onClick={handleSubmit} className="calculator-button operator">
            =
          </button>
        </div>
      </div>
      {/* <button type="submit">Submit</button> */}
    </div>
  );
};

export default Calculator;
