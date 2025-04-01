import App from "../App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

describe("App", () => {
  it("should render", () => {
    // Render the app
    render(<App />);
    // Assert that the app is rendered by checking for the title
    expect(screen.getByText(/app/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/inital data/i)).toBeInTheDocument();
  });
  it("Example of how to use userEvent to capture events", async () => {
    const user = userEvent.setup();
    render(<App />);
    const button = screen.getByRole("button", { name: /click me/i });
    await user.click(button);
    expect(screen.getByText(/mock data/i)).toBeInTheDocument();
  });
});
