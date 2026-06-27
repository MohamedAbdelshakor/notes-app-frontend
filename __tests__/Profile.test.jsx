import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Profile from "../src/pages/Profile";

jest.mock("../src/api/auth", () => ({
  uploadProfileImage: jest.fn(),
}));

describe("Profile Page", () => {
  test("renders user name and email", () => {
    renderWithProviders(<Profile />, {
      preloadedState: {
        auth: {
          user: {
            name: "John Doe",
            email: "john@example.com",
            profileImage: "",
            token: "abc",
          },
        },
        theme: { mode: "light" },
      },
    });

    expect(screen.getByText("My Profile")).toBeInTheDocument();
    expect(screen.getAllByText("John Doe").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("john@example.com").length).toBeGreaterThanOrEqual(1);
  });

  test("shows upload button", () => {
    renderWithProviders(<Profile />, {
      preloadedState: {
        auth: {
          user: {
            name: "John Doe",
            email: "john@example.com",
            profileImage: "",
            token: "abc",
          },
        },
        theme: { mode: "light" },
      },
    });

    expect(screen.getByText(/upload photo/i)).toBeInTheDocument();
  });

  test("shows avatar placeholder when no profile image", () => {
    renderWithProviders(<Profile />, {
      preloadedState: {
        auth: {
          user: {
            name: "John Doe",
            email: "john@example.com",
            profileImage: "",
            token: "abc",
          },
        },
        theme: { mode: "light" },
      },
    });

    expect(document.querySelector('.user-avatar-placeholder')).toBeInTheDocument();
  });
});
