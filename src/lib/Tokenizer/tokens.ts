import { TokenConfig } from '../types/TokenConfig';
export const allowedTokens: TokenConfig[] = [
  {
    type: 'SPACE',
    matcher: /^\s+/,
  },
  {
    type: 'NUMBER',
    matcher: /^-?\d+(?:\.\d+)?/,
  },
  {
    type: 'IDENTIFIER',
    matcher: /^[a-zA-Z]+/,
  },
  {
    type: 'BIN_OPERATOR',
    matcher: /^\+/,
  },
  {
    type: 'BIN_OPERATOR',
    matcher: /^-/,
  },
  {
    type: 'BIN_OPERATOR',
    matcher: /^\*/,
  },
  {
    type: 'BIN_OPERATOR',
    matcher: /^\//,
  },
  {
    type: 'BIN_OPERATOR',
    matcher: /^\^/,
  },
  {
    type: 'OPEN_BRACKET',
    matcher: /^\(/,
  },
  {
    type: 'CLOSE_BRACKET',
    matcher: /^\)/,
  },
  {
    type: ',',
    matcher: /^,/,
  },
  {
    type: 'UN_OPERATOR',
    matcher: /^%/,
  },
];
