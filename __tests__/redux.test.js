import authReducer, { setUser, logout } from "../src/redux/authSlice";
import themeReducer, { toggleTheme } from "../src/redux/themeSlice";

beforeEach(() => {
  localStorage.clear();
});

describe("authSlice", () => {
  test("should return the initial state", () => {
    const state = authReducer(undefined, { type: "unknown" });
    expect(state.user).toBeNull();
  });

  test("should handle setUser", () => {
    const user = { name: "Test", email: "test@test.com", token: "abc123" };
    const state = authReducer(undefined, setUser(user));
    expect(state.user.name).toBe("Test");
    expect(state.user.email).toBe("test@test.com");
  });

  test("should handle logout", () => {
    const user = { name: "Test", email: "test@test.com", token: "abc123" };
    let state = authReducer(undefined, setUser(user));
    expect(state.user).not.toBeNull();

    state = authReducer(state, logout());
    expect(state.user).toBeNull();
  });
});

describe("themeSlice", () => {
  test("should return the initial state", () => {
    const state = themeReducer(undefined, { type: "unknown" });
    expect(state.mode).toBe("light");
  });

  test("should toggle from light to dark", () => {
    const state = themeReducer({ mode: "light" }, toggleTheme());
    expect(state.mode).toBe("dark");
  });

  test("should toggle from dark to light", () => {
    const state = themeReducer({ mode: "dark" }, toggleTheme());
    expect(state.mode).toBe("light");
  });
});
