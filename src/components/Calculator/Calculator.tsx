import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import './Calculator.css';
import { Numpad } from './components/Numpad/Numpad';
import { CalculatorInput } from './components/CalculatorInput/CalculatorInput';

function Calculator() {
  const [value, setValue] = useState('');
  const [history, setHistory] = useState('');
  const clearInput = (): void => {
    setValue('');
  };

  const appendValue = (val: string): void => {
    setValue((v) => v + val);
  };

  const evaluateExpression = (exp: string): number => {
    setHistory(exp);
    return 0;
  };

  const handleNumpadClick: (val: string) => void = (buttonValue) => {
    console.log(buttonValue);

    switch (buttonValue) {
      case 'equals':
        evaluateExpression(value);
        clearInput();
        break;
      case 'clear':
        clearInput();
        break;
      case 'add':
        appendValue('+');
        break;
      case 'subtract':
        appendValue('-');
        break;
      case 'multiply':
        appendValue('*');
        break;
      case 'divide':
        appendValue('/');
        break;
      case 'percent':
        appendValue('%');
        break;
      case 'sqrt':
        setValue((v) => 'sqrt(' + v);
        break;
      default:
        appendValue(buttonValue);
        break;
    }
  };

  const handleInputChange: ChangeEventHandler = (event) => {
    const input = event.target as HTMLInputElement;
    setValue(input.value);
  };

  const handleKeyUp: KeyboardEventHandler = (event) => {
    switch (event.key) {
      case 'Enter':
        evaluateExpression(value);
        clearInput();
        break;
      case 'Escape':
        clearInput();
        break;
      default:
        break;
    }
  };

  return (
    <div className='Calculator' onKeyUp={handleKeyUp} data-testid='Calculator'>
      <div className='Calculator__body'>
        <p className='Calculator__history' data-testid='Calculator__history'>
          {history}
        </p>
        <CalculatorInput value={value} handleInputChange={handleInputChange} />
        <div className='Calculator__divider'></div>
        <Numpad handleNumpadClick={handleNumpadClick} />
      </div>
    </div>
  );
}

export default Calculator;
