import { ValuesObjectError } from "./values-object.error.js";

export class InvalidCNPJError extends ValuesObjectError {
  static readonly CODE = "INVALID_CNPJ";

  constructor(
    readonly value?: string,
    options?: ErrorOptions,
  ) {
    super("CNPJ inválido", InvalidCNPJError.CODE, options);
  }
}
