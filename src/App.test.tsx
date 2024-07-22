import { render } from '@testing-library/react';
import App from './App';

test('app is running', () => {
  expect(true).toBe(true);
  render(<App></App>);
});
