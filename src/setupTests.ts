import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
// import { server } from "./mocks/server";
import { afterEach } from "vitest";
// import { vi } from "vitest";

// server.events.on("response:mocked", ({ request, response }) => {
//   console.log("💡 MSW mocked:", request.url, response.status);
// });

// // Start the server before all tests
// beforeAll(() => server.listen());

// // Reset handlers after each test (avoid cross-test interference)
// afterEach(() => server.resetHandlers());

// // Close the server after all tests
// afterAll(() => server.close());

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
