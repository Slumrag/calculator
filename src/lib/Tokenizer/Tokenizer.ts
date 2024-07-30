import { allowedTokens } from '../const/allowedTokens';
import { Token } from '../types/Token';
import { TokenMatcher } from '../types/TokenMatcher';
//source: https://itnext.io/writing-a-mathematical-expression-parser-35b0b78f869e

export class Tokenizer {
  // List of tokens recognized by the tokenizer
  #tokenSpec: TokenMatcher[];

  // Position in the input string from which it will
  // read to get the next token
  #cursor: number;

  // String to turn into tokens
  #input: string;

  constructor(tokens: TokenMatcher[] = allowedTokens) {
    this.#tokenSpec = tokens;
    this.#cursor = 0;
    this.#input = '';
  }

  public read(input: string): void {
    this.#cursor = 0;
    this.#input = input;
  }

  #hasMoreTokens(): boolean {
    return this.#cursor < this.#input.length;
  }

  #match(regex: RegExp, inputSlice: string): string | null {
    const matched = regex.exec(inputSlice);
    if (matched === null) {
      return null;
    }

    this.#cursor += matched[0].length;

    return matched[0];
  }

  /**
   * next
   */
  public next(): Token | null {
    // If at end of input, not more tokens to generate
    if (!this.#hasMoreTokens()) {
      return null;
    }

    const inputSlice = this.#input.slice(this.#cursor);

    // Find substring beginning at position of cursor
    for (const { matcher, type } of this.#tokenSpec) {
      const tokenValue = this.#match(matcher, inputSlice);

      if (tokenValue === null) {
        continue;
      }

      // Skip tokens with null types
      if (type === null) {
        return this.next();
      }

      return { value: tokenValue, type };
    }

    // Could not extract any tokens, so throw error
    throw new SyntaxError(`Unrecognized input: ${inputSlice[0]}`);
  }
}
