import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


function App() {
  let [output, setOutput] = useState('0');
  let [formula, setFormula] = useState('');
  

  const handleClear = ()=>{
    setOutput('0');
    setFormula('');
  }

  const handleNumber = (e) => {
    const value = e.target.value;
    if (output === '0' && value === '0') return;
    if (output === '0' || /[+\-x/]$/.test(output)) {
      setOutput(value);
    } else {
      setOutput(output + value);
    }
    setFormula(formula + value);
  };

  const handleOperator = (e) => {
    const value = e.target.value;
    const lastChar = formula.slice(-1);

    if (/[+\-x/]$/.test(lastChar)) {
      if (lastChar === '-' && /[+\-x/]$/.test(formula.slice(-2, -1))) {
        setFormula(formula.slice(0, -2) + value);
      } else {
        if (value === '-') {
          setFormula(formula + value);
        } else {
          setFormula(formula.slice(0, -1) + value);
        }
      }
    } else {
      setFormula(formula + value);
    }
    setOutput(value);
  };

  const handleDecimal = () => {
    if (!output.includes('.')) {
      setOutput(output + '.');
      setFormula(formula + '.');
    }
  };

  const handleEquals = () => {
    try {
      let evalFormula = formula.replace(/x/g, '*');
      let result = eval(evalFormula).toString();
      setOutput(result);
      setFormula(result);
    } catch (e) {
      setOutput('Error');
      setFormula('');
    }
  };
  return (
    <div id="calculator">
      <div id="screen">
        <div id="formula-screen">{formula}</div>
        <div id="display">{output}</div>
      </div>
      <div id="pad-container">
        <div className="row gx-0">
          <div className="col-6"><button id="clear" style={{backgroundColor: "rgb(172, 57, 57)"}} onClick={handleClear}>AC</button></div>
          <div className="col-3"><button id="divide" value='/' style={{backgroundColor: "rgb(102,102,102)"}} onClick={handleOperator}>/</button></div>
          <div className="col-3"><button id="multiply" value='x' style={{backgroundColor: "rgb(102,102,102)"}} onClick={handleOperator}>x</button></div>
        </div>
        <div className="row gx-0">
          <div className="col"><button id="seven" value={7} onClick={handleNumber}>7</button></div>
          <div className="col"><button id="eight" value={8} onClick={handleNumber}>8</button></div>
          <div className="col"><button id="nine" value={9} onClick={handleNumber}>9</button></div>
          <div className="col"><button id="subtract" value='-' style={{backgroundColor: "rgb(102,102,102)"}} onClick={handleOperator}>-</button></div>
        </div>
        <div className="row gx-0">
          <div className="col"><button id="four" value={4} onClick={handleNumber}>4</button></div>
          <div className="col"><button id="five" value={5} onClick={handleNumber}>5</button></div>
          <div className="col"><button id="six" value={6} onClick={handleNumber}>6</button></div>
          <div className="col"><button id="add" value='+' style={{backgroundColor: "rgb(102,102,102)"}} onClick={handleOperator}>+</button></div>
        </div>
        <div className="row gx-0">
          <div className="col-9">
            <div className="row gx-0">
              <div className="col"><button id="one" value={1} onClick={handleNumber}>1</button></div>
              <div className="col"><button id='two' value={2} onClick={handleNumber}>2</button></div>
              <div className='col'><button id='three' value={3} onClick={handleNumber}>3</button></div>
            </div>
            <div className="row gx-0">
              <div className='col-8'><button id='zero' value={0} onClick={handleNumber}>0</button></div>
              <div className='col'><button id='decimal' onClick={handleDecimal}>.</button></div>
            </div>
          </div>
          <div className="col"><button id="equals" style={{backgroundColor: "rgb(0,68,102)",height:'100%'}} onClick={handleEquals}>=</button></div>
        </div>
      </div>
    </div>
    ); 
}

export default App;
