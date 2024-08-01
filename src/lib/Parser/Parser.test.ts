import { operators, Parser } from './Parser';

type ParserTestCase = [string, number | RegExp];
const singleNumber: ParserTestCase[] = [
  ['10 000', 10],
  ['2.58', 2.58],
  ['2.', 2],
  ['.2', 0.2],
  ['-.2', -0.2],
  ['0', 0],
  ['-0', 0],
  [`${Number.MAX_SAFE_INTEGER}`, Number.MAX_SAFE_INTEGER],
  [`${Number.MIN_SAFE_INTEGER}`, Number.MIN_SAFE_INTEGER],
  ['$2.58', /Unrecognized input/i],
  ['..2', /Unrecognized input/i],
];

const basicOperations: ParserTestCase[] = [
  ['2.12+2', 4.12],
  ['2.12-2', 0.12],
  ['2.12*2', 4.24],
  ['2.12/2', 1.06],

  ['-2.12+-2', -4.12],
  ['-2.12--2', -0.12],
  ['-2.12*-2', 4.24],
  ['-2.12/-2', 1.06],

  ['2.12+2+10', 14.12],
  ['2.12-2-1', -0.88],
  ['2.12*2*10', 42.4],
  ['2.12/2/10', 0.106],

  ['2.12+2+10', 14.12],
  ['2.12-2--1', 1.12],
  ['2.12*2*-10', -42.4],
  ['2.12/-2/10', -0.106],

  ['2+2*0.2', 2.4],
  ['2*2+6/8-9', -4.25],

  ['1+0', 1],
  ['-1+0', -1],
  ['1-0', 1],
  ['-1-0', -1],

  ['1*0', 0],
  ['-1*0', 0],

  ['1/0', Infinity],
  ['-1/0', -Infinity],
];

const exponentTest: ParserTestCase[] = [
  ['2^2', 4],
  ['-2^2', -4],
  ['2^-2', 0.25],
  ['2^-2^2', 0.0625],

  ['2^0', 1],
  ['0^2', 0],
  ['0^0', 0 ** 0],

  ['2*2^5^(10/10+1)', 67108864],

  ['5^^2', /Unexpected token: /i],
  ['^2', /Unexpected token: /i],
];

const percentTest: ParserTestCase[] = [
  ['5%', 0.05],
  ['-4%', -0.04],
  ['100%%', 0.01],
  ['2%+100%', 1.02],
  ['100%+100%+100%', 3],
  ['2%*50%', 0.01],
  ['2%/50%', 0.04],

  ['2%^2', 0.0004],
  ['2%^100%', 0.02],
  ['(2+2%)^2', 4.0804],

  ['%2', /Unexpected token: /i],
  ['2% 1+1', /Unexpected token: /],
];

const functionTest: ParserTestCase[] = [
  ['sqrt(1)', 1],
  ['sqrt(-1)', Math.sqrt(-1)],
  ['sqrt(0)', 0],
  ['10*sqrt(2+2)', 20],

  ['exp(2)', /invalid operation/i],
  ['sin(0', /Unexpected end of input, expected "\)"/i],
];

const validTestExpressions: ParserTestCase[] = [
  ['  2 +    2', 4],
  ['--8', 8],
  ['--6--5', 11],
];

const invalidTestExpressions: [string, RegExp][] = [
  ['-)', /Unexpected token: "\)", expected "NUMBER"/i],
  ['', /Unexpected end of input, expected/i],
];

describe('Parser', () => {
  const parser = new Parser(operators);

  describe('valid expressions', () => {
    describe('parsing numbers', () => {
      parserTester(parser, singleNumber);
    });

    describe('testing + - * /', () => {
      parserTester(parser, basicOperations);
    });

    describe('testing ^', () => {
      parserTester(parser, exponentTest);
    });

    describe('testing %', () => {
      parserTester(parser, percentTest);
    });

    describe('testing function', () => {
      parserTester(parser, functionTest);
    });

    parserTester(parser, validTestExpressions);
  });

  describe('invalid expressions', () => {
    parserTester(parser, invalidTestExpressions);
  });
});

function parserTester(parser: Parser, testCases: ParserTestCase[]) {
  test.for(testCases)('%#) %s = %s', ([expression, expected]) => {
    if (typeof expected === 'number') {
      const value = parser.parse(expression);
      if (Number.isNaN(expected)) {
        expect(value).toBeNaN();
      } else {
        expect(value).toBeCloseTo(expected, 13);
      }
    } else {
      expect(() => parser.parse(expression)).toThrow(expected);
    }
  });
}
