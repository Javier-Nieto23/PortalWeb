import React, { useState } from 'react';
import '../styles/Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const handleNumberClick = (num) => {
    if (display === '0') setDisplay(String(num));
    else setDisplay(display + num);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) setDisplay(display + '.');
  };

  const handleOperation = (op) => {
    // append current display and operator to expression, reset display
    setExpression((prev) => prev + display + op);
    setDisplay('0');
  };

  const handleEquals = () => {
    if (!expression) return;
    const fullExpression = expression + display;
    try {
      const result = Function('"use strict"; return (' + fullExpression + ')')();
      setDisplay(String(result));
      setExpression('');
    } catch (e) {
      setDisplay('Error');
      setExpression('');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleBackspace = () => {
    if (display.length > 1) setDisplay(display.slice(0, -1));
    else setDisplay('0');
  };

  const displayValue = expression + display;

  return (
    <div className="calculator-container">
      <div className="calculator-wrapper">
        <h2>Calculadora</h2>

        <div className="calculator-content">
          <div className="calculator">
            <div className="display">{displayValue}</div>

            <div className="calculator-grid">
              <button className="btn btn-clear" onClick={handleClear}>C</button>
              <button className="btn btn-operation" onClick={handleBackspace}>DEL</button>
              <button className="btn btn-operation" onClick={() => handleOperation('/')}>/</button>
              <button className="btn btn-operation" onClick={() => handleOperation('*')}>*</button>

              <button className="btn" onClick={() => handleNumberClick(7)}>7</button>
              <button className="btn" onClick={() => handleNumberClick(8)}>8</button>
              <button className="btn" onClick={() => handleNumberClick(9)}>9</button>
              <button className="btn btn-operation" onClick={() => handleOperation('-')}>-</button>

              <button className="btn" onClick={() => handleNumberClick(4)}>4</button>
              <button className="btn" onClick={() => handleNumberClick(5)}>5</button>
              <button className="btn" onClick={() => handleNumberClick(6)}>6</button>
              <button className="btn btn-operation" onClick={() => handleOperation('+')}>+</button>

              <button className="btn" onClick={() => handleNumberClick(1)}>1</button>
              <button className="btn" onClick={() => handleNumberClick(2)}>2</button>
              <button className="btn" onClick={() => handleNumberClick(3)}>3</button>
              <button className="btn btn-equals" onClick={handleEquals}>=</button>

              <button className="btn btn-zero" onClick={() => handleNumberClick(0)}>0</button>
              <button className="btn" onClick={handleDecimal}>.</button>
            </div>
          </div>

          <aside className="calculator-info" aria-label="Información calculadora">
            <h3>Cómo funciona</h3>
            <p>He creado esta calculadora basica usando JavaScript y esta mostrara el resultado de la operacion cuando pulses <strong>=</strong>.</p>
            <ul>
              <li>Ingresa números y operadores en secuencia.</li>
              <li>Usa <strong>C</strong> para reiniciar y <strong>DEL</strong> para borrar el último dígito.</li>
              <li>Presiona <strong>=</strong> para calcular el resultado de la expresión acumulada.</li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
