import { ValueObject } from "../../common/value-object.abstract.js";
import { InvalidCPFError } from "../../common/errors/invalid-cpf.error.js";
import type { CPFProps } from "./type.js";

export class CPF extends ValueObject<CPFProps> {
  private static readonly LENGTH = 11;

  constructor(props: CPFProps) {
    super(props);
  }

  private static readonly INVALID_SEQUENCES = new Set(
    Array.from({ length: 10 }, (_, digit) => String(digit).repeat(this.LENGTH)),
  );

  private static readonly FORMATTED_PATTERN = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

  private static readonly UNFORMATTED_PATTERN = /^\d{11}$/;

  public static create(value: string): CPF {
    if (!this.validate(value)) {
      throw new InvalidCPFError(value);
    }

    return new CPF({ value: this.normalize(value) });
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
    return value.trim().replace(/\D/g, "");
  }

  private static hasValidCheckDigits(value: string): boolean {
    const digits = value.split('').map(Number);

    const firstCheckDigit = this.calculateCheckDigit(digits.slice(0, 9), 10);
    if (firstCheckDigit !== digits[9]) {
      return false;
    }

    const secondCheckDigit = this.calculateCheckDigit(digits.slice(0, 10), 11);
    return secondCheckDigit === digits[10];
  }

  private static calculateCheckDigit(digits: number[], weightStart: number): number {
    const sum = digits.reduce(
      (acc, digit, index) => acc + digit * (weightStart - index),
      0,
    );

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }


  get value(): string {
    return this.props.value;
  }
}