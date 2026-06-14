import { ValuesObjectError } from "./values-object.error.js";

export class InvalidPositiveNumberError extends ValuesObjectError {
  static readonly CODE = "INVALID_POSITIVE_NUMBER";

  constructor(
    readonly value?: number | string,
    options?: ErrorOptions,
  ) {
    super("Número positivo inválido", InvalidPositiveNumberError.CODE, options);
  }
}
