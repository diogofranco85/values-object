import { ValuesObjectError } from "./values-object.error.js";

export class InvalidCEPError extends ValuesObjectError {
  static readonly CODE = "INVALID_CEP";

  constructor(
    readonly value?: string,
    options?: ErrorOptions,
  ) {
    super("CEP inválido", InvalidCEPError.CODE, options);
  }
}
