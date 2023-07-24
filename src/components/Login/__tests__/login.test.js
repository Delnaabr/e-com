// import userEvent from "@testing-library/user-event";
import { RegisteredUserDetail, getProducts } from "../../../utils/utils";
import Login from "../Login";
import { render, screen } from "@testing-library/react";

describe("user api", () => {
  it("check user api is correct", () => {
    expect(RegisteredUserDetail).toBe("http://localhost:3000/register");
  });

  it("check products api is correct", () => {
    expect(getProducts).toBe("http://localhost:3000/products");
  });
});

describe("test the login form", () => {
  it("Login renders correctly", () => {
    render(<Login />);
    const textElement=screen.getByText(/login here/i);
    expect(textElement).toBeInTheDocument();
  });

  it("Check if button UI is correct", async () => {
    render(<Login />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(3);
  });

  // it("Check email field validation", () => {
  //   render(<Login />);
  //   const email = screen.getByPlaceholderText("Enter your email");
  //   userEvent.type(email, "delna");
  //   expect(email.value).not.toMatch("delna@gmail.com");
  // });

  it("Check if email and password fields are empty", () => {
    render(<Login />);
    const email = screen.getByPlaceholderText("Enter your email");
    const password = screen.getByPlaceholderText("Password");
    expect(email.value).toBe("");
    expect(password.value).toBe("");
  });
});

// describe("revere string", () => {
//   it("check if the string is reversed", () => {
//     expect(reverseString("develop")).toBe("poleved");
//   });
// });