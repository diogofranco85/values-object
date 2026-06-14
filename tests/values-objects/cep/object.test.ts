import { describe, expect, it } from "vitest";
import { CEP, InvalidCEPError, ValuesObjectError } from "../../../src/index.js";

describe("CEP", () => {
  describe("validate", () => {
    it("accepts valid unformatted CEP", () => {
      expect(CEP.validate("01310100")).toBe(true);
    });

    it("accepts valid formatted CEP", () => {
      expect(CEP.validate("01310-100")).toBe(true);
    });

    it("rejects invalid length", () => {
      expect(CEP.validate("123")).toBe(false);
      expect(CEP.validate("013101001")).toBe(false);
    });

    it("rejects invalid characters", () => {
      expect(CEP.validate("01310-10A")).toBe(false);
      expect(CEP.validate("01310100abc")).toBe(false);
      expect(CEP.validate("01310.100")).toBe(false);
      expect(CEP.validate("0131-0100")).toBe(false);
    });
  });

  describe("create", () => {
    it("normalizes and returns valid CEP", () => {
      const cep = CEP.create("01310-100");

      expect(cep.value).toBe("01310100");
    });

    it("throws InvalidCEPError for invalid CEP", () => {
      expect(() => CEP.create("123")).toThrow(InvalidCEPError);

      try {
        CEP.create("01310-10A");
      } catch (error) {
        expect(error).toBeInstanceOf(ValuesObjectError);
        expect(error).toMatchObject({
          code: "INVALID_CEP",
          message: "CEP inválido",
          value: "01310-10A",
        });
        return;
      }

      expect.fail("should throw InvalidCEPError");
    });
  });
});
