import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Navbar as BSNavbar, Nav, Container, Button } from "react-bootstrap";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./UserAvatar";

function AppNavbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <BSNavbar expand="lg" className="app-navbar" sticky="top">
      <Container>
        <BSNavbar.Brand as={Link} to={user ? "/dashboard" : "/login"}>
          <span className="brand-icon">
            <i className="bi bi-journal-text"></i>
          </span>
          Notes App
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="main-navbar" />
        <BSNavbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center gap-1">
            <ThemeToggle />
            {user ? (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  <i className="bi bi-speedometer2 me-1"></i>Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/notes">
                  <i className="bi bi-stickies me-1"></i>Notes
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="d-flex align-items-center gap-2">
                  <UserAvatar user={user} size={26} />
                  Profile
                </Nav.Link>
                <Button variant="outline-danger" size="sm" onClick={handleLogout} className="ms-lg-2">
                  <i className="bi bi-box-arrow-right me-1"></i>Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <i className="bi bi-box-arrow-in-right me-1"></i>Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <i className="bi bi-person-plus me-1"></i>Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default AppNavbar;
