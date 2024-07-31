import { Tokenizer } from '../Tokenizer/Tokenizer';
import { TokenMatcher } from '../types/TokenMatcher';
import { allowedTokens } from '../const/allowedTokens';
import { Token } from '../types/Token';
import { TokenType } from '../types/TokenType';
import { TokenTypes } from '../const/TokenTypes';

export type OperatorType = 'BINARY' | 'PREFIX' | 'POSTFIX';

interface OperatorSpec {
  type: OperatorType;
  precedence: number;
}

export type Operators = Record<string, OperatorSpec[]>;

export const operators: Operators = {
  '+': [{ type: 'BINARY', precedence: 2 }],

  '-': [
    { type: 'BINARY', precedence: 2 },
    { type: 'PREFIX', precedence: 4 },
  ],

  '*': [{ type: 'BINARY', precedence: 3 }],
  '/': [{ type: 'BINARY', precedence: 3 }],
  '%': [{ type: 'POSTFIX', precedence: 4 }],
  '^': [{ type: 'BINARY', precedence: 5 }],
};
/*
@ Parser grammar

<Expression> ::= <Prefix> (<Infix>)*

<Prefix> ::= <ParenthesizedExpression>
  | <UnaryExpression>
  | <FunctionExpression>
  | <NUMBER>

<Infix> ::= ("+" | "-" | "*" | "/" | "^") <Expression>

<ParenthesizedExpression> ::= "(" <Expression> ")"

<UnaryExpression> ::= "-" <Expression>


<FunctionExpression> ::= <IDENTIFIER> <ParenthesizedExpression>

<IDENTIFIER> ::= ([a-z] | [A-Z])+
<NUMBER> ::= ("0" |  [1-9] [0-9]*) ("." [0-9]+ )?

*/

export class Parser {
  #tokenizer: Tokenizer;
  #lookahead: Token | null = null;
  #operators: Operators;

  constructor(operatorsConfig: Operators, validTokens: TokenMatcher[] = allowedTokens) {
    this.#tokenizer = new Tokenizer(validTokens);
    this.#operators = operatorsConfig;
  }

  /**
   * parse
   */
  public parse(input: string): number {
    this.#tokenizer.read(input);
    this.#lookahead = this.#tokenizer.next();
    return this.#Expression();
  }

  #getPrecedence(token: Token | null, isUnary = false): number {
    if (token === null || this.#operators[token.type] === undefined) {
      return 0;
    }

    if (this.#operators[token.type]?.length > 1 && isUnary && this.#isOperatorUnary(token)) {
      return (
        this.#operators[token.type].find((e) => e.type === 'POSTFIX' || e.type === 'PREFIX')
          ?.precedence ?? 0
      );
    }

    const prec = this.#operators[token.type][0]?.precedence;
    return prec ?? 0;
  }

  #getOperatorTypes(token: Token | null): OperatorType[] {
    if (token === null || this.#operators[token.type] === undefined) {
      return [];
    }

    const types = this.#operators[token.type]?.map((e) => e.type);
    return types;
  }

  #isOperatorBinary(token: Token | null): boolean {
    return this.#getOperatorTypes(token).includes('BINARY');
  }

  #isOperatorPrefix(token: Token | null): boolean {
    return this.#getOperatorTypes(token).includes('PREFIX');
  }

  #isOperatorPostfix(token: Token | null): boolean {
    return this.#getOperatorTypes(token).includes('POSTFIX');
  }

  #isOperatorUnary(token: Token | null): boolean {
    return this.#isOperatorPostfix(token) || this.#isOperatorPrefix(token);
  }
  // Expect a particular token, consume/eat it, and move to the next token
  #eat(tokenType: TokenType): Token {
    const token = this.#lookahead;

    if (token === null) {
      throw new SyntaxError(`Unexpected end of input, expected "${tokenType}"`);
    }

    if (token.type !== tokenType) {
      throw new SyntaxError(`Unexpected token: "${token.value}", expected "${tokenType}"`);
    }

    // Advance to the next token
    this.#lookahead = this.#tokenizer.next();

    return token;
  }

  /**
   * Expression
   *   = Prefix (Infix)*
   */
  #Expression(precedence = 0): number {
    let left: number = this.#Prefix();

    while (precedence < this.#getPrecedence(this.#lookahead)) {
      left = this.#lookahead !== null ? this.#Infix(left, this.#lookahead.type) : NaN;
    }

    return left;
  }

  /**
   * Prefix
   *    = ParenthesizedExpression
   *    / UnaryExpression
   *    / FunctionExpression
   *    / NUMBER
   */
  #Prefix(): number {
    if (this.#lookahead?.type === TokenTypes.PARENTHESIS_LEFT) {
      return this.#ParenthesizedExpression();
    }

    if (this.#isOperatorUnary(this.#lookahead)) {
      return this.#PrefixExpression();
    }

    if (this.#lookahead?.type === TokenTypes.IDENTIFIER) {
      return this.#FunctionExpression();
    }

    const token = this.#eat(TokenTypes.NUMBER);

    return Number(token.value);
  }

  /**
   * Infix
   *    = ("+" / "-" / "*" / "/" / "^") Expression
   */
  #Infix(left: number, operatorType: TokenType): number {
    const token = this.#eat(operatorType);
    const newPrec = this.#getPrecedence(token); // newPrec is the new precedence we pass to the "Expression" method
    switch (token.type) {
      case TokenTypes.ADDITION:
        return left + this.#Expression(newPrec);
      case TokenTypes.SUBTRACTION:
        return left - this.#Expression(newPrec);
      case TokenTypes.MULTIPLICATION:
        return left * this.#Expression(newPrec);
      case TokenTypes.DIVISION:
        return left / this.#Expression(newPrec);
      case TokenTypes.EXPONENTIATION:
        return left ** this.#Expression(newPrec - 1);
      case TokenTypes.PERCENT:
        return left * 0.01;
    }

    throw new SyntaxError(`Unrecognized operation ${token.type}`);
  }

  /**
   * ParenthesizedExpression
   *    = "(" Expression ")"
   */
  #ParenthesizedExpression(): number {
    this.#eat(TokenTypes.PARENTHESIS_LEFT);
    const expression = this.#Expression();
    this.#eat(TokenTypes.PARENTHESIS_RIGHT);

    return expression;
  }
  /**
   * UnaryExpression
   *    = "-" Expression
   */
  #PrefixExpression(): number {
    const unary = this.#lookahead;
    if (unary === null) {
      throw new Error('End of Input');
    }
    this.#eat(unary?.type);
    switch (unary?.type) {
      case '-':
        return -this.#Expression(this.#getPrecedence(unary, true));
      default:
        throw new Error(`Unrecognized unary operator ${unary.type}`);
    }
  }
  /**
   * FunctionExpression
   *    = IDENTIFIER ParenthesizedExpression
   */
  #FunctionExpression() {
    const id = this.#eat(TokenTypes.IDENTIFIER).value;
    const expression = this.#ParenthesizedExpression();
    return this.#callMathFunction(id, expression);
  }

  #callMathFunction(id: string, value: number): number {
    switch (id) {
      case 'sin':
        return Math.sin(value);
      case 'cos':
        return Math.cos(value);
      case 'tan':
        return Math.tan(value);
      case 'sqrt':
        return Math.sqrt(value);
      default:
        throw new Error(`Invalid operation: ${id}`);
    }
  }
}
