import { TokenMatcher } from '../types/TokenMatcher';
import { TokenTypes } from './TokenTypes';
export const allowedTokens: TokenMatcher[] = [
  {
    type: null,
    matcher: /^\s+/,
  },
  {
    type: TokenTypes.NUMBER,
    matcher: /^(?:\d+(?:\.\d*)?|\.\d+)/,
  },
  {
    type: TokenTypes.IDENTIFIER,
    matcher: /^[a-zA-Z]+/,
  },
  {
    type: TokenTypes.ADDITION,
    matcher: /^\+/,
  },
  {
    type: TokenTypes.SUBTRACTION,
    matcher: /^-/,
  },
  {
    type: TokenTypes.MULTIPLICATION,
    matcher: /^\*/,
  },
  {
    type: TokenTypes.DIVISION,
    matcher: /^\//,
  },
  {
    type: TokenTypes.EXPONENTIATION,
    matcher: /^\^/,
  },
  {
    type: TokenTypes.PARENTHESIS_LEFT,
    matcher: /^\(/,
  },
  {
    type: TokenTypes.PARENTHESIS_RIGHT,
    matcher: /^\)/,
  },
  {
    type: TokenTypes.COMMA,
    matcher: /^,/,
  },
  {
    type: TokenTypes.PERCENT,
    matcher: /^%/,
  },
];
