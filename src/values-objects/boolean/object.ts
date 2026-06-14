import { ValueObject } from "../../common/value-object.abstract.js";
import { InvalidBooleanError } from "../../common/errors/invalid-boolean.error.js";
import type { BooleanValueProps } from "./type.js";

export class BooleanValue extends ValueObject<BooleanValueProps> {
  private static readonly STRING_PATTERN = /^(true|false|0|1)$/i;

  constructor(props: BooleanValueProps) {
    super(props);
  }

  public static create(value: unknown): BooleanValue {
    if (!this.validate(value)) {
      throw new InvalidBooleanError(value);
    }

    return new BooleanValue({ value: this.normalize(value) });
  }

  public static validate(value: unknown): boolean {
    if (typeof value === "boolean") {
      return true;
    }

    if (typeof value === "number") {
      return value === 0 || value === 1;
    }

    if (typeof value === "string") {
      return this.STRING_PATTERN.test(value.trim());
    }

    return false;
  }

  private static normalize(value: unknown): boolean {
    if (typeof value === "boolean") {
      return value;
    }

    if (typeof value === "number") {
      return value === 1;
    }

    const normalized = (value as string).trim().toLowerCase();
    return normalized === "true" || normalized === "1";
  }

  get value(): boolean {
    return this.props.value;
  }
}
