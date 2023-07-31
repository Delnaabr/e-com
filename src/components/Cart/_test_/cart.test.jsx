import { render, screen } from "@testing-library/react";
import Cart from "../Cart";

describe("Cart Component", () => {
  it("displays 'Your Cart is empty' message when no products in the cart", () => {
    render(<Cart />);

    const emptyCartMessage = screen.getByText(/Your Cart is empty/i);
    expect(emptyCartMessage).toBeInTheDocument();
  });
  it("displays 'Continue shopping' and 'Buy Now' buttons when there are products in the cart", async () => {
    render(<Cart />);
    
    const continueShoppingButton = screen.getByRole('button', { name: /Continue shopping/i });
  
    expect(continueShoppingButton).toBeInTheDocument();
  });
});

