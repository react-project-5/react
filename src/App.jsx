import React, { Component } from 'react';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: '0',
      prevValue: null,
      operator: null,
      waitingForOperand: false,
    };
  }

  inputDigit = (digit) => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit,
      });
    }
  };

  inputDecimal = () => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: '0.',
        waitingForOperand: false,
      });
    } else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.',
      });
    }
  };

  clearInput = () => {
    this.setState({
      displayValue: '0',
      prevValue: null,
      operator: null,
      waitingForOperand: false,
    });
  };



  performOperation = (nextOperator) => {
    const { displayValue, operator, prevValue } = this.state;
    const inputValue = parseFloat(displayValue);

    if (prevValue === null) {
      this.setState({
        prevValue: inputValue,
        waitingForOperand: true,
        operator: nextOperator,
      });
    } else {
      const result = this.calculate(prevValue, inputValue, operator);

      this.setState({
        displayValue: String(result),
        prevValue: result,
        waitingForOperand: true,
        operator: nextOperator,
      });
    }
  };

  calculate = (prevValue, nextValue, operator) => {
    switch (operator) {
      case '+':
        return prevValue + nextValue;
      case '-':
        return prevValue - nextValue;
      case '*':
        return prevValue * nextValue;
      case '/':
        return prevValue / nextValue;
      case '^':
        return Math.pow(prevValue, nextValue);
      case '√':
        return Math.sqrt(prevValue);
      default:
        return nextValue;
    }
  };

  handleButtonClick = (event) => {
    const { value } = event.target;

    switch (value) {
      case 'C':
        this.clearInput();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
      case '^':
      case '√':
        this.performOperation(value);
        break;
      case '=':
        if (this.state.prevValue !== null) {
          this.performOperation(value);
        }
        break;
      case '.':
        this.inputDecimal();
        break;
      default:
        if (Number.isInteger(parseFloat(value))) {
          this.inputDigit(value);
        }
    }
  };

  render() {
    return (
      <div className="calculator">
       <div className='display'> <input className="display" type="text" value={this.state.displayValue} readOnly /></div>
       <div className='buttonbox'>
        <div className="buttons">
          <div className="row">
            <button className='operators' onClick={this.handleButtonClick} value="/">/</button>
            <button className='operators' onClick={this.handleButtonClick} value="*">*</button>
            <button className="operators" onClick={this.handleButtonClick} value="-">-</button>
            <button className="operators" onClick={this.handleButtonClick} value="+">+</button>
            
            
            
            
          </div>
          <div className="row">
            <button onClick={this.handleButtonClick} value="7">7</button>
            <button onClick={this.handleButtonClick} value="8">8</button>
            <button onClick={this.handleButtonClick} value="9">9</button>
            <button className='operators' onClick={this.handleButtonClick} value="√">√</button>
            
          </div>
          <div className="row">
            <button onClick={this.handleButtonClick} value="4">4</button>
            <button onClick={this.handleButtonClick} value="5">5</button>
            <button onClick={this.handleButtonClick} value="6">6</button>
            <button className='operators' onClick={this.handleButtonClick} value="^">^</button>
            
          </div>
          <div className="row">
            <button onClick={this.handleButtonClick} value="1">1</button>
            <button onClick={this.handleButtonClick} value="2">2</button>
            <button onClick={this.handleButtonClick} value="3">3</button>
            <button className='operators' onClick={this.handleButtonClick} value="C">DEL</button>
            
            
          </div>
          <div className="row">
            <button onClick={this.handleButtonClick} value="0">0</button>
            <button onClick={this.handleButtonClick} value=".">.</button>
            <button className='operators1' onClick={this.handleButtonClick} value="=">=</button> 
          </div>
          </div>
          </div>

        </div>
    );
  }
}

export default Calculator;
