import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "../contact";

test("contact form", () => {
  render(<Contact />);

  const nameInput = screen.getByPlaceholderText("Enter your name");
  const emailInput = screen.getByPlaceholderText("Enter your email");
  const queryInput = screen.getByPlaceholderText("Enter your Query");
  const submitButton = screen.getByRole("button", { name: "Deliver Your Queries..." });

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(queryInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("submit button is disabled when required fields are empty", () => {
  render(<Contact />);

  const submitButton = screen.getByRole("Button", { Name: "Deliver Your Queries..." });

  expect(submitButton).toBeDisabled();
});
test("submit button is enabled when all required fields are filled", () => {
    render(<Contact />);
  
    const nameInput = screen.getByPlaceholderText("Enter your name");
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const queryInput = screen.getByPlaceholderText("Enter your Query");
    const submitButton = screen.getByRole("button", { name: "Deliver Your Queries..." });
  
    userEvent.type(nameInput, "John Doe");
    userEvent.type(emailInput, "john.doe@example.com");
    userEvent.type(queryInput, "Test query");
  
    expect(submitButton).toBeEnabled();
  });

  test("submit button calls handleSubmit function on click", () => {
    render(<Contact />);
  
    const nameInput = screen.getByPlaceholderText("Enter your name");
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const queryInput = screen.getByPlaceholderText("Enter your Query");
    const submitButton = screen.getByRole("button", { name: "Deliver Your Queries..." });
  
    userEvent.type(nameInput, "John Doe");
    userEvent.type(emailInput, "john.doe@example.com");
    userEvent.type(queryInput, "Test query");
  
    fireEvent.click(submitButton);
  });
  
  
  
  