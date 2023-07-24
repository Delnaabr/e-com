import { render, screen } from "@testing-library/react";
import Checkout from "../Checkout";

describe("test the login form", () => {
  it("Login renders correctly", () => {
    render(<Checkout />);
    const textElement = screen.getByText(/product details/i);
    expect(textElement).toBeInTheDocument();
  });

  it("Check if button UI is correct", async () => {
    render(<Checkout />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(1);
  });
});
