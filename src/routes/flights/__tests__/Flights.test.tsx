import { describe, expect, it } from "vitest";
import Flights from "..";
import { render, screen } from "@testing-library/react";

describe("Flights", () => {
  it("should render", () => {
    render(<Flights />);
    expect(screen.getByText(/book a flight/i)).toBeInTheDocument();
  });
});
