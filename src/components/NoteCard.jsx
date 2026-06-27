import { Link } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";

function NoteCard({ note }) {
  return (
    <Card
      as={Link}
      to={`/notes/${note._id}`}
      className={`note-card h-100 text-decoration-none ${note.isPinned ? "border-primary border-2" : ""}`}
    >
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0 fs-6 fw-semibold text-truncate me-2">
            {note.title}
          </Card.Title>
          {note.isPinned && (
            <i className="bi bi-pin-angle-fill text-primary flex-shrink-0"></i>
          )}
        </div>
        <Card.Text className="text-muted small flex-grow-1 note-preview-text">
          {note.content.substring(0, 120)}
          {note.content.length > 120 ? "..." : ""}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
          <Badge bg="primary" className="rounded-pill">
            {note.category}
          </Badge>
          <Badge
            bg={note.status === "active" ? "success" : "secondary"}
            className="rounded-pill"
          >
            {note.status}
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
}

export default NoteCard;
