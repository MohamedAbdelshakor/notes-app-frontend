import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Register from "../src/pages/Register";

jest.mock("../src/api/auth", () => ({
  register: jest.fn(),
}));

describe("Register Page", () => {
  test("renders register form with heading and button", () => {
    renderWithProviders(<Register />);

    expect(screen.getByRole("heading", { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  test("renders name, email, and password inputs", () => {
    const { container } = renderWithProviders(<Register />);

    expect(container.querySelector('input[name="name"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="email"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="password"]')).toBeInTheDocument();
  });

  test("renders link to login page", () => {
    renderWithProviders(<Register />);
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
  });
});
