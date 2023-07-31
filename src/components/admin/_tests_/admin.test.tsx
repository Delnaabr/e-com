import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddProductForm from "../addProduct";
import OrderSummaryView from "../orderSummaryView";
import AdminProducts from "../adminProduct";

test("renders addProduct form", () => {
  render(<AddProductForm open={true} handleClose={() => {}} />);

  // Check if important elements are present
  const productNameInput = screen.getByText("Product Name");
  const productPriceInput = screen.getByText("Product Price");
  const categorySelect = screen.getByText("Category");
  const quantityInput = screen.getByText("Quantity");
  const addProductButton = screen.getByText("ADD PRODUCT");

  expect(productNameInput).toBeInTheDocument();
  expect(productPriceInput).toBeInTheDocument();
  expect(categorySelect).toBeInTheDocument();
  expect(quantityInput).toBeInTheDocument();
  expect(addProductButton).toBeInTheDocument();
});
test("handles image change correctly", () => {
  render(<AddProductForm open={true} handleClose={() => {}} />);

  const imageInput = screen.getByText("Product Image");
  const testImage = new File(["testImage"], "test.png", { type: "image/png" });
  fireEvent.change(imageInput, { target: { files: [testImage] } });

  const componentState = screen.getByText("Product Image") as HTMLInputElement;

  expect(componentState.files?.[0]).toBe(testImage);
});

test("handles form submission and API call correctly", async () => {
  const mockFetch = jest.fn(() =>
    Promise.resolve(new Response(JSON.stringify({}), { status: 200 }))
  );
  global.fetch = mockFetch;

  const handleCloseMock = jest.fn();
  render(<AddProductForm open={true} handleClose={handleCloseMock} />);

  const productNameInput = screen.getByText("Product Name");
  const productPriceInput = screen.getByText("Product Price");
  const categorySelect = screen.getByText("Category");
  const quantityInput = screen.getByText("Quantity");
  const addProductButton = screen.getByText("ADD PRODUCT");

  fireEvent.change(productNameInput, { target: { value: "Test Product" } });
  fireEvent.change(productPriceInput, { target: { value: "99.99" } });
  fireEvent.change(categorySelect, { target: { value: "Electronics" } });
  fireEvent.change(quantityInput, { target: { value: "10" } });

  const testImage = new File(["testImage"], "test.png", { type: "image/png" });
  fireEvent.change(screen.getByText("Product Image"), {
    target: { files: [testImage] },
  });

  fireEvent.click(addProductButton);

  await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
  expect(mockFetch).toHaveBeenCalledWith("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_img: "/assets/images/test.png",
      product_name: "Test Product",
      product_price: "99.99",
      category: "Electronics",
      product_stock: 10,
    }),
  });

  expect(handleCloseMock).toHaveBeenCalledTimes(1);

  expect(screen.getByText("Product added Successfully")).toBeInTheDocument();
});

test("displays order data correctly", async () => {
  render(<OrderSummaryView />);

  const noOrdersMessage = screen.getByText("No Orders to Display");
  expect(noOrdersMessage).toBeInTheDocument();
});

test("renders 'Add Products' button", () => {
  render(<AdminProducts />);

  const addButton = screen.getByRole("button", { name: /Add Products/i });
  expect(addButton).toBeInTheDocument();
});
