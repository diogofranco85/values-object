import { describe, expect, it } from "vitest";
import { BooleanValue, InvalidBooleanError, ValuesObjectError } from "../../../src/index.js";

describe("BooleanValue", () => {
  describe("validate", () => {
    it("accepts boolean values", () => {
      expect(BooleanValue.validate(true)).toBe(true);
      expect(BooleanValue.validate(false)).toBe(true);
    });

    it("accepts numeric 0 and 1", () => {
      expect(BooleanValue.validate(1)).toBe(true);
      expect(BooleanValue.validate(0)).toBe(true);
    });

    it("accepts string representations", () => {
      expect(BooleanValue.validate("true")).toBe(true);
      expect(BooleanValue.validate("false")).toBe(true);
      expect(BooleanValue.validate("TRUE")).toBe(true);
      expect(BooleanValue.validate("0")).toBe(true);
      expect(BooleanValue.validate("1")).toBe(true);
    });

    it("rejects invalid values", () => {
      expect(BooleanValue.validate("yes")).toBe(false);
      expect(BooleanValue.validate(2)).toBe(false);
      expect(BooleanValue.validate(null)).toBe(false);
      expect(BooleanValue.validate(undefined)).toBe(false);
    });
  });

  describe("create", () => {
    it("normalizes values to boolean", () => {
      expect(BooleanValue.create(true).value).toBe(true);
      expect(BooleanValue.create("1").value).toBe(true);
      expect(BooleanValue.create("false").value).toBe(false);
      expect(BooleanValue.create(0).value).toBe(false);
    });

    it("throws InvalidBooleanError for invalid values", () => {
      expect(() => BooleanValue.create("yes")).toThrow(InvalidBooleanError);

      try {
        BooleanValue.create("yes");
      } catch (error) {
        expect(error).toBeInstanceOf(ValuesObjectError);
        expect(error).toMatchObject({
          code: "INVALID_BOOLEAN",
          message: "Valor booleano inválido",
          value: "yes",
        });
        return;
      }

      expect.fail("should throw InvalidBooleanError");
    });
  });
});
