import { TokenType } from './TokenType';

export interface TokenMatcher {
  type: TokenType | null;
  matcher: RegExp;
}
