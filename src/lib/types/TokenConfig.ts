import { TokenType } from './TokenType';

export interface TokenConfig {
  type: TokenType;
  matcher: RegExp | string;
}
