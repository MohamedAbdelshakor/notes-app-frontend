import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { Button } from "react-bootstrap";

function ThemeToggle() {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <Button
      variant="outline-secondary"
      size="sm"
      onClick={() => dispatch(toggleTheme())}
      className="theme-toggle-btn"
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      <i className={`bi ${theme === "light" ? "bi-moon-stars-fill" : "bi-sun-fill"}`}></i>
    </Button>
  );
}

export default ThemeToggle;
