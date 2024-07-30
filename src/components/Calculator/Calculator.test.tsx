import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calculator from './Calculator';

describe('Calculator', () => {
  it('should match snapshot', () => {
    render(<Calculator />);
    expect(screen.getByTestId('Calculator')).toMatchSnapshot();
  });

  describe('numpad interactions', () => {
    it('should input correct values on numpad click', async () => {
      const user = userEvent.setup();
      render(<Calculator />);
      const input: HTMLInputElement = screen.getByTestId('Calculator__input');
      const numpad = screen.getAllByRole('button');
      screen.debug(numpad);
      await user.click(numpad[4]);
      expect(input.value).toBe('7');
    });

    it('should clear input on clicking C', async () => {
      const user = userEvent.setup();
      render(<Calculator />);
      const input: HTMLInputElement = screen.getByTestId('Calculator__input');
      await user.type(input, '123');
      // screen.debug(numpad);
      await user.click(screen.getByTestId('clear'));
      expect(input.value).toBe('');
    });

    it.todo('should evaluate expression clicking =');
  });

  describe('input interactions', () => {
    it.todo('should clear input on pressing Escape');
    it.todo('should evaluate input on pressing Enter');
  });
  describe('history interaction', () => {
    it.todo('should display equation after evaluation');
  });
});
