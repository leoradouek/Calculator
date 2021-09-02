import { useState } from "react";
import calculator from "./CalcFunc";
import "./Calculator.css";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(" "); // set as whitespace (rather than empty string) bc had trouble displaying result of 0 otherwise

  const displayValue = expression ? expression : result;

  const handleSubmit = (e) => {
    e.preventDefault();
    let total = calculator(expression);
    setExpression("");
    setResult(total);
  };

  const handleButton = (e) => {
    e.preventDefault();
    if (result !== " ") {
      setResult(" "); // set to empty string so that it will switch to displaying the expression in the input field
    }
    setExpression(expression + e.target.value);
  };

  const handleInputChange = (e) => {
    result !== " " ? setResult(" ") : setExpression(e.target.value);
  };

  const handleClear = () => {
    setExpression("");
    setResult(" ");
  };

  return (
    <div id="main-calc-container">
      <div id="explanation">
        <p>Enter here</p>
        <p>Or click the buttons</p>
      </div>
      <div className="calculator-container">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleInputChange}
            type="text"
            value={displayValue}
            autoFocus
          ></input>
        </form>

        <div className="button-container">
          <button onClick={handleClear} className="calc-button clear">
            clear
          </button>
          <button onClick={handleButton} value="(" className="calc-button op">
            (
          </button>
          <button onClick={handleButton} value=")" className="calc-button op">
            )
          </button>
          <button onClick={handleButton} value="/" className="calc-button op">
            /
          </button>
          <button onClick={handleButton} value="7" className="calc-button">
            7
          </button>
          <button onClick={handleButton} value="8" className="calc-button">
            8
          </button>
          <button onClick={handleButton} value="9" className="calc-button">
            9
          </button>
          <button onClick={handleButton} value="*" className="calc-button op ">
            *
          </button>
          <button onClick={handleButton} value="4" className="calc-button">
            4
          </button>
          <button onClick={handleButton} value="5" className="calc-button">
            5
          </button>
          <button onClick={handleButton} value="6" className="calc-button">
            6
          </button>
          <button onClick={handleButton} value="-" className="calc-button op">
            -
          </button>
          <button onClick={handleButton} value="1" className="calc-button">
            1
          </button>
          <button onClick={handleButton} value="2" className="calc-button">
            2
          </button>
          <button onClick={handleButton} value="3" className="calc-button">
            3
          </button>
          <button onClick={handleButton} value="+" className="calc-button op">
            +
          </button>
          <button onClick={handleButton} value="0" className="calc-button zero">
            0
          </button>
          <button onClick={handleButton} value="." className="calc-button">
            .
          </button>
          <button onClick={handleSubmit} className="calc-button op">
            =
          </button>
        </div>
      </div>
      {/* <button type="submit">Submit</button> */}
    </div>
  );
};

export default Calculator;
