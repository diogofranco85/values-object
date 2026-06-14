import { describe, expect, it } from "vitest";
import {
  InvalidPositiveNumberError,
  PositiveNumber,
  ValuesObjectError,
} from "../../../src/index.js";

describe("PositiveNumber", () => {
  describe("validate", () => {
    it("accepts positive numbers", () => {
      expect(PositiveNumber.validate(1)).toBe(true);
      expect(PositiveNumber.validate(42.5)).toBe(true);
      expect(PositiveNumber.validate("10")).toBe(true);
      expect(PositiveNumber.validate("  3.14  ")).toBe(true);
    });

    it("rejects zero, negative, and non-numeric values", () => {
      expect(PositiveNumber.validate(0)).toBe(false);
      expect(PositiveNumber.validate(-1)).toBe(false);
      expect(PositiveNumber.validate("abc")).toBe(false);
      expect(PositiveNumber.validate(Number.NaN)).toBe(false);
      expect(PositiveNumber.validate(Number.POSITIVE_INFINITY)).toBe(false);
    });
  });

  describe("create", () => {
    it("creates a positive number value object", () => {
      const number = PositiveNumber.create("42.5");

      expect(number.value).toBe(42.5);
    });

    it("throws InvalidPositiveNumberError for invalid values", () => {
      expect(() => PositiveNumber.create(0)).toThrow(InvalidPositiveNumberError);

      try {
        PositiveNumber.create(-5);
      } catch (error) {
        expect(error).toBeInstanceOf(ValuesObjectError);
        expect(error).toMatchObject({
          code: "INVALID_POSITIVE_NUMBER",
          message: "Número positivo inválido",
          value: -5,
        });
        return;
      }

      expect.fail("should throw InvalidPositiveNumberError");
    });
  });
});
