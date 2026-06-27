import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import ProtectedRoute from "../src/routes/ProtectedRoute";

describe("ProtectedRoute", () => {
  test("redirects to login when user is not logged in", () => {
    renderWithProviders(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
      {
        preloadedState: { auth: { user: null }, theme: { mode: "light" } },
      }
    );

    expect(screen.queryByText(/protected content/i)).not.toBeInTheDocument();
  });

  test("renders children when user is logged in", () => {
    renderWithProviders(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
      {
        preloadedState: {
          auth: {
            user: { name: "Test", email: "test@test.com", token: "abc" },
          },
          theme: { mode: "light" },
        },
      }
    );

    expect(screen.getByText(/protected content/i)).toBeInTheDocument();
  });
});
