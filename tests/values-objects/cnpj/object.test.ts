import { describe, expect, it } from "vitest";
import { CNPJ, InvalidCNPJError, ValuesObjectError } from "../../../src/index.js";

describe("CNPJ", () => {
  describe("validate", () => {
    it("aceita CNPJ alfanumérico válido sem formatação", () => {
      expect(CNPJ.validate("12ABC34501DE35")).toBe(true);
    });

    it("aceita CNPJ alfanumérico válido com formatação", () => {
      expect(CNPJ.validate("12.ABC.345/01DE-35")).toBe(true);
    });

    it("aceita CNPJ numérico legado válido sem formatação", () => {
      expect(CNPJ.validate("11222333000181")).toBe(true);
    });

    it("aceita CNPJ numérico legado válido com formatação", () => {
      expect(CNPJ.validate("11.222.333/0001-81")).toBe(true);
    });

    it("normaliza letras minúsculas", () => {
      expect(CNPJ.validate("12abc34501de35")).toBe(true);
    });

    it("rejeita CNPJ com tamanho inválido", () => {
      expect(CNPJ.validate("123")).toBe(false);
    });

    it("rejeita sequências repetidas", () => {
      expect(CNPJ.validate("00000000000000")).toBe(false);
      expect(CNPJ.validate("AAAAAAAAAAAAAA")).toBe(false);
    });

    it("rejeita dígitos verificadores inválidos", () => {
      expect(CNPJ.validate("12ABC34501DE00")).toBe(false);
      expect(CNPJ.validate("11222333000100")).toBe(false);
    });

    it("rejeita caracteres inválidos", () => {
      expect(CNPJ.validate("12ABC34501DE3X")).toBe(false);
      expect(CNPJ.validate("12.ABC.345-01DE35")).toBe(false);
      expect(CNPJ.validate("12.ABC.345/01DE/35")).toBe(false);
      expect(CNPJ.validate("12@BC34501DE35")).toBe(false);
    });
  });

  describe("create", () => {
    it("normaliza e retorna o CNPJ alfanumérico válido", () => {
      const cnpj = CNPJ.create("12.ABC.345/01DE-35");

      expect(cnpj.value).toBe("12ABC34501DE35");
    });

    it("lança InvalidCNPJError para CNPJ inválido", () => {
      expect(() => CNPJ.create("00000000000000")).toThrow(InvalidCNPJError);

      try {
        CNPJ.create("00000000000000");
      } catch (error) {
        expect(error).toBeInstanceOf(ValuesObjectError);
        expect(error).toMatchObject({
          code: "INVALID_CNPJ",
          message: "CNPJ inválido",
          value: "00000000000000",
        });
        return;
      }

      expect.fail("deveria lançar InvalidCNPJError");
    });
  });
});
