import { render, screen } from '@testing-library/react';
import { Numpad } from './Numpad';

describe('Numpad', () => {
  it('should match snapshot', () => {
    render(<Numpad></Numpad>);

    expect(screen.getByTestId('Calculator__numpad')).toMatchSnapshot();
  });
});
