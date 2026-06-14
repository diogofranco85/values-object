import { describe, expect, it } from "vitest";
import { InvalidCPFError, ValuesObjectError } from "../../index.js";
import { CPF } from "./object.js";

describe("CPF", () => {
  describe("validate", () => {
    it("aceita CPF válido sem formatação", () => {
      expect(CPF.validate("39053344705")).toBe(true);
    });

    it("aceita CPF válido com formatação", () => {
      expect(CPF.validate("390.533.447-05")).toBe(true);
    });

    it("rejeita CPF com tamanho inválido", () => {
      expect(CPF.validate("123")).toBe(false);
    });

    it("rejeita sequências repetidas", () => {
      expect(CPF.validate("11111111111")).toBe(false);
      expect(CPF.validate("00000000000")).toBe(false);
    });

    it("rejeita dígitos verificadores inválidos", () => {
      expect(CPF.validate("39053344700")).toBe(false);
    });
  });

  describe("create", () => {
    it("normaliza e retorna o CPF válido", () => {
      const cpf = CPF.create("390.533.447-05");

      expect(cpf.value).toBe("39053344705");
    });

    it("lança InvalidCPFError para CPF inválido", () => {
      expect(() => CPF.create("11111111111")).toThrow(InvalidCPFError);

      try {
        CPF.create("11111111111");
      } catch (error) {
        expect(error).toBeInstanceOf(ValuesObjectError);
        expect(error).toMatchObject({
          code: "INVALID_CPF",
          message: "CPF inválido",
          value: "11111111111",
        });
        return;
      }

      expect.fail("deveria lançar InvalidCPFError");
    });
  });
});
