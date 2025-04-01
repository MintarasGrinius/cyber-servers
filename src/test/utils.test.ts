import { describe, expect, it } from "vitest";
import { isObjectWithMessage } from "../lib/utils";

describe("isObjectWithMessage", () => {
  it("should return true for an object with a string message property", () => {
    const input = { message: "This is a message" };
    expect(isObjectWithMessage(input)).toBe(true);
  });

  it("should return false for an object without a message property", () => {
    const input = { notMessage: "This is not a message" };
    expect(isObjectWithMessage(input)).toBe(false);
  });

  it("should return false for an object with a non-string message property", () => {
    const input = { message: 123 };
    expect(isObjectWithMessage(input)).toBe(false);
  });

  it("should return false for null", () => {
    const input = null;
    expect(isObjectWithMessage(input)).toBe(false);
  });

  it("should return false for a non-object value (e.g., string)", () => {
    const input = "This is a string";
    expect(isObjectWithMessage(input)).toBe(false);
  });

  it("should return false for an array", () => {
    const input = ["message"];
    expect(isObjectWithMessage(input)).toBe(false);
  });

  it("should return false for a function", () => {
    const input = () => ({ message: "This is a message" });
    expect(isObjectWithMessage(input)).toBe(false);
  });
});
