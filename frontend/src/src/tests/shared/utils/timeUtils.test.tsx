import { describe, it, expect, vi } from "vitest";
import { formatTime } from "../../../shared/utils/timeUtils";

describe("formatTime", () => {
  it("formats time correctly for minutes less than 10", () => {
    const seconds = 300;
    const expected = "5:00 minutes";
    const result = formatTime(seconds);
    expect(result).toEqual(expected);
  });

  it("formats time correctly for minutes greater than 10", () => {
    const seconds = 900;
    const expected = "15:00 minutes";
    const result = formatTime(seconds);
    expect(result).toEqual(expected);
  });

  it("formats time correctly for seconds less than 10", () => {
    const seconds = 5;
    const expected = "0:05 minutes";
    const result = formatTime(seconds);
    expect(result).toEqual(expected);
  });

  it("formats time correctly for seconds greater than 10", () => {
    const seconds = 45;
    const expected = "0:45 minutes";
    const result = formatTime(seconds);
    expect(result).toEqual(expected);
  });
});
