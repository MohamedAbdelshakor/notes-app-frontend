import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="app-footer mt-auto">
      <Container className="text-center py-3">
        <span className="text-muted small">
          <i className="bi bi-journal-text me-1"></i>
          Notes App &copy; {new Date().getFullYear()} &mdash; Built with React &amp; Bootstrap
        </span>
      </Container>
    </footer>
  );
}

export default Footer;
