import "./App.css";
import Calculator from "./Components/Calculator";

function App() {
  return (
    <div className="App">
      <div>
        <Calculator />
        <p>
          {/* <span style={{ color: "white" }}>Note: </span> this calculator
          supports up two operations */}
        </p>
      </div>
    </div>
  );
}

export default App;
