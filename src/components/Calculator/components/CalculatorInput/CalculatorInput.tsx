import { ChangeEventHandler } from 'react';

interface CalculatorInputProps {
  value: string;
  handleInputChange: ChangeEventHandler;
}
export function CalculatorInput({ value, handleInputChange }: CalculatorInputProps) {
  return (
    <input
      className='Calculator__input'
      type='numeric'
      value={value}
      onChange={handleInputChange}
      data-testid='Calculator__input'
    />
  );
}
