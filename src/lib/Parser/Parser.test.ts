import { operators, Parser } from './Parser';

const validTestExpressions: [string, number][] = [
  ['2.58', 2.58],
  ['2+2*0.2', 2.4],
  ['-2.12+2', -0.12],
  ['2*2+6/8-9', -4.25],
  ['2*2^5^(10/10+1)', 67108864],
  ['1/0', Infinity],
  ['-1/0', -Infinity],
  ['-2 ^ 2', -4],
  ['  2 + 2', 4],
  ['--8', 8],
  ['--6--5', 11],
  ['10*sqrt(2+2)', 20],
  ['-4%', -0.04],
  ['1+(2*2)%', 1.04],
  ['2.-1.', 1],
  ['.2', 0.2],
];

const invalidTestExpressions: [string, RegExp][] = [
  ['$2.58', /Unrecognized input/i],
  ['..2', /Unrecognized input/i],
  ['sin(0', /Unexpected end of input, expected "\)"/i],
  ['-)', /Unexpected token: "\)", expected "NUMBER"/i],
  ['', /Unexpected end of input, expected/i],
  ['exp(2)', /invalid operation/i],
];

describe('Parser', () => {
  const parser = new Parser(operators);

  describe('valid expressions', () => {
    test.for(validTestExpressions)('%s = %d', ([expression, expected]) => {
      const value = parser.parse(expression);
      expect(value).toBeCloseTo(expected, 10);
    });
  });

  describe('invalid expressions', () => {
    test.for(invalidTestExpressions)('%s', ([expression, err]) => {
      expect(() => parser.parse(expression)).toThrow(err);
    });
  });
});
