import { ValuesObjectError } from "./values-object.error.js";

export class InvalidBooleanError extends ValuesObjectError {
  static readonly CODE = "INVALID_BOOLEAN";

  constructor(
    readonly value?: unknown,
    options?: ErrorOptions,
  ) {
    super("Valor booleano inválido", InvalidBooleanError.CODE, options);
  }
}
