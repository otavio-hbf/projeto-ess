/**
 * This file contains setup code for tests.
 */

import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

/**
 * Clean up the test environment after each test.
 */
afterEach(() => {
  cleanup();
});
