import { ValueObject } from "../../common/value-object.abstract.js";
import { InvalidPositiveNumberError } from "../../common/errors/invalid-positive-number.error.js";
import type { PositiveNumberProps } from "./type.js";

export class PositiveNumber extends ValueObject<PositiveNumberProps> {
  constructor(props: PositiveNumberProps) {
    super(props);
  }

  public static create(value: number | string): PositiveNumber {
    if (!this.validate(value)) {
      throw new InvalidPositiveNumberError(value);
    }

    return new PositiveNumber({ value: this.normalize(value) });
  }

  public static validate(value: number | string): boolean {
    const normalized = this.parse(value);

    if (normalized === null) {
      return false;
    }

    return normalized > 0;
  }

  private static parse(value: number | string): number | null {
    const parsed = typeof value === "number" ? value : Number(value.trim());

    if (!Number.isFinite(parsed)) {
      return null;
    }

    return parsed;
  }

  private static normalize(value: number | string): number {
    return this.parse(value)!;
  }

  get value(): number {
    return this.props.value;
  }
}
