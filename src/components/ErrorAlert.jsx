import { Alert } from "react-bootstrap";

function ErrorAlert({ message }) {
  if (!message) return null;

  return (
    <Alert variant="danger" className="d-flex align-items-center gap-2">
      <i className="bi bi-exclamation-triangle-fill"></i>
      <span>{message}</span>
    </Alert>
  );
}

export default ErrorAlert;
