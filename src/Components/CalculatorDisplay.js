const CalculatorDisplay = ({ handleClear, handleButton, handleSubmit }) => {
  return (
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
  );
};

export default CalculatorDisplay;
