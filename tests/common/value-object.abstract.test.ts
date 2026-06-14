import { describe, expect, it } from "vitest";
import { ValueObject } from "../../src/common/value-object.abstract.js";

type TestProps = {
  value: string;
};

class TestValueObject extends ValueObject<TestProps> {
  constructor(value: string) {
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }
}

describe("ValueObject", () => {
  it("compara value objects iguais", () => {
    const first = new TestValueObject("39053344705");
    const second = new TestValueObject("39053344705");

    expect(first.equals(second)).toBe(true);
  });

  it("compara value objects diferentes", () => {
    const first = new TestValueObject("39053344705");
    const second = new TestValueObject("52998224725");

    expect(first.equals(second)).toBe(false);
  });

  it("retorna false quando o outro value object é undefined", () => {
    const valueObject = new TestValueObject("39053344705");

    expect(valueObject.equals(undefined)).toBe(false);
  });
});
