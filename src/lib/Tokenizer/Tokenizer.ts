import { Token } from '../types/Token';
import { TokenConfig } from '../types/TokenConfig';
//source: https://itnext.io/writing-a-mathematical-expression-parser-35b0b78f869e

export class Tokenizer {
  // List of tokens recognized by the tokenizer
  #tokens: TokenConfig[];

  // Position in the input string from which it will
  // read to get the next token
  #cursor: number;

  // String to turn into tokens
  #string: string;

  constructor(tokens: TokenConfig[]) {
    this.#tokens = tokens;
    this.#cursor = 0;
    this.#string = '';
  }

  public read(string: string): void {
    this.#cursor = 0;
    this.#string = string.trim();
  }
  /**
   * next
   */
  public next(): Token | undefined {
    // If at end of input, not more tokens to generate
    if (this.#cursor === this.#string.length) {
      return;
    }

    // Find substring beginning at position of cursor
    const substr = this.#string.slice(this.#cursor);

    for (const { matcher, type } of this.#tokens) {
      const [match] = substr.match(matcher) ?? [];

      if (!match) {
        continue;
      }

      this.#cursor += match.length;

      // Skip tokens with null types
      if (type === 'SPACE') {
        return this.next();
      }

      return { value: match, type };
    }

    // Could not extract any tokens, so throw error
    throw new Error(`Unrecognized input: ${substr[0]}`);
  }
}
