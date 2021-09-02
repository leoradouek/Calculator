import { useState } from "react";
import calculator from "../CalcFunc";
import CalculatorDisplay from "./CalculatorDisplay";
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
      <div className="calculator-container">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleInputChange}
            type="text"
            value={displayValue}
            autoFocus
          ></input>
        </form>

        <CalculatorDisplay
          handleButton={handleButton}
          handleSubmit={handleSubmit}
          handleClear={handleClear}
        />
      </div>
    </div>
  );
};

export default Calculator;
