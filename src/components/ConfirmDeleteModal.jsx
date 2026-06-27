import { Modal, Button, Spinner } from "react-bootstrap";

function ConfirmDeleteModal({ show, onHide, onConfirm, title, isPending }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-exclamation-triangle text-danger me-2"></i>
          Delete Note
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete <strong>"{title}"</strong>? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isPending}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isPending}>
          {isPending ? (
            <>
              <Spinner animation="border" size="sm" className="me-1" />
              Deleting...
            </>
          ) : (
            <>
              <i className="bi bi-trash me-1"></i>
              Delete
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDeleteModal;
