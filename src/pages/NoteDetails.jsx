import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";
import { getNote, deleteNote } from "../api/notes";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

function NoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showConfirm, setShowConfirm] = useState(false);

  const { data: note, isLoading, isError, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNote(id).then((res) => res.data),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onMutate: async (noteId) => {
      await queryClient.cancelQueries({ queryKey: ["notes"] });
      const previousNotes = queryClient.getQueriesData({ queryKey: ["notes"] });

      queryClient.setQueriesData({ queryKey: ["notes"] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          notes: old.notes.filter((n) => n._id !== noteId),
        };
      });

      return { previousNotes };
    },
    onError: (err, variables, context) => {
      if (context?.previousNotes) {
        context.previousNotes.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onSuccess: () => {
      navigate("/notes");
    },
  });

  if (isLoading) return <LoadingSpinner message="Loading note..." />;

  if (isError)
    return (
      <ErrorAlert
        message={error.response?.data?.message || error.message}
      />
    );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <Link to="/notes" className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-arrow-left me-1"></i>Back to Notes
        </Link>
        <div className="d-flex gap-2">
          <Link to={`/notes/${id}/edit`} className="btn btn-outline-primary btn-sm">
            <i className="bi bi-pencil me-1"></i>Edit
          </Link>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => setShowConfirm(true)}
          >
            <i className="bi bi-trash me-1"></i>Delete
          </Button>
        </div>
      </div>

      <ConfirmDeleteModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={() => deleteMutation.mutate(id)}
        title={note.title}
        isPending={deleteMutation.isPending}
      />

      <Card className="border-0 note-detail-card">
        <Card.Body className="p-4">
          <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
            <Badge bg="primary" className="rounded-pill">
              {note.category}
            </Badge>
            <Badge
              bg={note.status === "active" ? "success" : "secondary"}
              className="rounded-pill"
            >
              {note.status}
            </Badge>
            {note.isPinned && (
              <Badge bg="warning" text="dark" className="rounded-pill">
                <i className="bi bi-pin-angle-fill me-1"></i>Pinned
              </Badge>
            )}
          </div>

          <h3 className="fw-bold mb-2">{note.title}</h3>

          <p className="text-muted small mb-3">
            <i className="bi bi-calendar me-1"></i>
            Created: {new Date(note.createdAt).toLocaleDateString()}
            <span className="mx-2">|</span>
            <i className="bi bi-clock me-1"></i>
            Updated: {new Date(note.updatedAt).toLocaleDateString()}
          </p>

          {note.tags?.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mb-3">
              {note.tags.map((tag, i) => (
                <Badge key={i} bg="light" text="muted" className="rounded-pill border">
                  <i className="bi bi-tag me-1"></i>{tag}
                </Badge>
              ))}
            </div>
          )}

          <hr />

          <div className="note-content-body">
            {note.content.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default NoteDetails;
