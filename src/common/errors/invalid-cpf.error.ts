import { ValuesObjectError } from "./values-object.error.js";

export class InvalidCPFError extends ValuesObjectError {
  static readonly CODE = "INVALID_CPF";

  constructor(
    readonly value?: string,
    options?: ErrorOptions,
  ) {
    super("CPF inválido", InvalidCPFError.CODE, options);
  }
}
