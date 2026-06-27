import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Login from "../src/pages/Login";

jest.mock("../src/api/auth", () => ({
  login: jest.fn(),
}));

describe("Login Page", () => {
  test("renders login form with heading and button", () => {
    renderWithProviders(<Login />);

    expect(screen.getByRole("heading", { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("renders email and password inputs", () => {
    const { container } = renderWithProviders(<Login />);

    expect(container.querySelector('input[name="email"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="password"]')).toBeInTheDocument();
  });

  test("renders link to register page", () => {
    renderWithProviders(<Login />);
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
  });
});
