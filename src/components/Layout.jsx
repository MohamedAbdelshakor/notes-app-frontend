import { Container } from "react-bootstrap";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <Container className="py-4 flex-grow-1">
        {children}
      </Container>
      <Footer />
    </div>
  );
}

export default Layout;
