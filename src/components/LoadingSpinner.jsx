import { Spinner } from "react-bootstrap";

function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="text-center py-5">
      <Spinner animation="border" variant="primary" className="mb-3" />
      <p className="text-muted mb-0">{message}</p>
    </div>
  );
}

export default LoadingSpinner;
