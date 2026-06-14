import { ValueObject } from "../../common/value-object.abstract.js";
import { InvalidCNPJError } from "../../common/errors/invalid-cnpj.error.js";
import type { CNPJProps } from "./type.js";

export class CNPJ extends ValueObject<CNPJProps> {
  private static readonly LENGTH = 14;

  private static readonly ALPHANUMERIC_BASE = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  private static readonly INVALID_SEQUENCES = new Set(
    this.ALPHANUMERIC_BASE.split("").map((char) => char.repeat(this.LENGTH)),
  );

  private static readonly FORMATTED_PATTERN =
    /^[A-Z0-9]{2}\.[A-Z0-9]{3}\.[A-Z0-9]{3}\/[A-Z0-9]{4}-\d{2}$/i;

  private static readonly UNFORMATTED_PATTERN = /^[A-Z0-9]{12}\d{2}$/i;

  constructor(props: CNPJProps) {
    super(props);
  }

  public static create(value: string): CNPJ {
    if (!this.validate(value)) {
      throw new InvalidCNPJError(value);
    }

    return new CNPJ({ value: this.normalize(value) });
  }

  public static validate(value: string): boolean {
    if (!this.hasValidCharacters(value)) {
      return false;
    }

    const normalized = this.normalize(value);

    if (!this.UNFORMATTED_PATTERN.test(normalized)) {
      return false;
    }

    if (this.INVALID_SEQUENCES.has(normalized)) {
      return false;
    }

    return this.hasValidCheckDigits(normalized);
  }

  private static hasValidCharacters(value: string): boolean {
    const trimmed = value.trim();

    return (
      this.FORMATTED_PATTERN.test(trimmed) ||
      this.UNFORMATTED_PATTERN.test(trimmed)
    );
  }

  private static normalize(value: string): string {
    return value.trim().toUpperCase().replace(/[./-]/g, "");
  }

  private static hasValidCheckDigits(value: string): boolean {
    const base = value.slice(0, 12);
    const firstCheckDigit = Number(value[12]);
    const secondCheckDigit = Number(value[13]);

    const calculatedFirstCheckDigit = this.calculateCheckDigit(base);
    if (calculatedFirstCheckDigit !== firstCheckDigit) {
      return false;
    }

    const calculatedSecondCheckDigit = this.calculateCheckDigit(
      `${base}${calculatedFirstCheckDigit}`,
    );

    return calculatedSecondCheckDigit === secondCheckDigit;
  }

  private static calculateCheckDigit(value: string): number {
    const weights = this.getWeights(value.length);
    const sum = value.split("").reduce((acc, char, index) => {
      return acc + this.getCharacterValue(char) * weights[index]!;
    }, 0);

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  private static getCharacterValue(char: string): number {
    return char.charCodeAt(0) - 48;
  }

  private static getWeights(length: number): number[] {
    const weights = Array.from({ length }, () => 0);
    let weight = 2;

    for (let index = length - 1; index >= 0; index--) {
      weights[index] = weight;
      weight = weight === 9 ? 2 : weight + 1;
    }

    return weights;
  }

  get value(): string {
    return this.props.value;
  }
}
