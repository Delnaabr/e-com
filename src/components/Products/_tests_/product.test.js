import { Provider } from "react-redux";
import Products from "../products";
import { render, screen } from "@testing-library/react";


test("products page renders correctly", () => {
    const mockProducts = [
      {
        id: "1",
        product_img: "product1.jpg",
        product_name: "Product 1",
        product_price: "100",
        category: "Chairs",
      },
      {
        id: "2",
        product_img: "product2.jpg",
        product_name: "Product 2",
        product_price: "200",
        category: "Couch",
      },
    ];

    render(
        <Provider>
    <Products products={mockProducts} />
   </Provider> );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Buy Now")).toBeInTheDocument();
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });