import { ValueObject } from "../../common/value-object.abstract.js";
import { InvalidCEPError } from "../../common/errors/invalid-cep.error.js";
import type { CEPProps } from "./type.js";

export class CEP extends ValueObject<CEPProps> {

  private static readonly FORMATTED_PATTERN = /^\d{5}-\d{3}$/;

  private static readonly UNFORMATTED_PATTERN = /^\d{8}$/;

  constructor(props: CEPProps) {
    super(props);
  }

  public static create(value: string): CEP {
    if (!this.validate(value)) {
      throw new InvalidCEPError(value);
    }

    return new CEP({ value: this.normalize(value) });
  }

  public static validate(value: string): boolean {
    if (!this.hasValidCharacters(value)) {
      return false;
    }

    const normalized = this.normalize(value);

    return this.UNFORMATTED_PATTERN.test(normalized);
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

  get value(): string {
    return this.props.value;
  }
}
