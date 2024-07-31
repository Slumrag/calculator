import { Tokenizer } from './Tokenizer';

const validTestExpressions: [string, string[]][] = [
  ['-2.123456789+2', ['-', '2.123456789', '+', '2']],
  ['2*2+6/8-9', ['2', '*', '2', '+', '6', '/', '8', '-', '9']],
  ['2*(2+6)*9/5^1', ['2', '*', '(', '2', '+', '6', ')', '*', '9', '/', '5', '^', '1']],
  ['sqrt(2*2+6%)', ['sqrt', '(', '2', '*', '2', '+', '6', '%', ')']],
  ['  2 + 2', ['2', '+', '2']],
  ['max(2,3)', ['max', '(', '2', ',', '3', ')']],
];

describe('Tokenizer', () => {
  const tokenizer = new Tokenizer();

  test.for(validTestExpressions)('%s', ([expression, expected]) => {
    tokenizer.read(expression);

    const tokens: string[] = [];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of expression) {
      const e = tokenizer.next()?.value;
      e && tokens.push(e);
    }
    expect(tokens).toEqual(expected);
  });

  it('should throw error for unrecognized token', () => {
    tokenizer.read('=');
    expect(() => tokenizer.next()).toThrow(/Unrecognized input/i);
  });
});
