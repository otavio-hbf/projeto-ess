import { fireEvent, render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "../../../shared/components/Button";

/**
 * Test suite for the Button component.
 */
describe("Button component", () => {
  /**
   * Test case to verify that the button is rendered.
   */
  it("renders the button", () => {
    const { getByRole } = render(<Button />);

    expect(getByRole("button")).toBeInTheDocument();
  });

  /**
   * Test case to verify that the button is rendered with the given text.
   */
  it("renders the button with the given text", () => {
    const { getByRole } = render(<Button>Hello</Button>);

    expect(getByRole("button")).toHaveTextContent("Hello");
  });

  /**
   * Test case to verify that the onClick event is handled correctly.
   */
  test("handles onClick event", async () => {
    const handleClick = vi.fn();
    const { getByRole } = render(<Button onClick={handleClick} />);

    fireEvent.click(getByRole("button"));

    expect(handleClick).toHaveBeenCalled();
  });
});
