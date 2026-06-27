import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { getNotes } from "../api/notes";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import EmptyState from "../components/EmptyState";
import NoteCard from "../components/NoteCard";

function NotesList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", debouncedSearch, category, status, sortBy, page],
    queryFn: () =>
      getNotes({
        search: debouncedSearch,
        category,
        status,
        sortBy,
        page,
        limit: 10,
      }).then((res) => res.data),
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-0">
            <i className="bi bi-stickies me-2"></i>My Notes
          </h2>
          <p className="text-muted small mb-0">Manage and organize all your notes</p>
        </div>
        <Link to="/notes/create" className="btn btn-primary">
          <i className="bi bi-plus-lg me-1"></i>New Note
        </Link>
      </div>

      <div className="filter-bar p-3 rounded-3 mb-4 shadow-sm">
        <Row className="g-2 align-items-end">
          <Col xs={12} md={4}>
            <InputGroup size="sm">
              <InputGroup.Text>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs={6} md={2}>
            <Form.Select
              size="sm"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Categories</option>
              <option value="General">General</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Ideas">Ideas</option>
              <option value="Tasks">Tasks</option>
            </Form.Select>
          </Col>
          <Col xs={6} md={2}>
            <Form.Select
              size="sm"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </Form.Select>
          </Col>
          <Col xs={12} md={2}>
            <Form.Select
              size="sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Newest First</option>
              <option value="title">Title A-Z</option>
              <option value="updated">Last Updated</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {isLoading && <LoadingSpinner message="Loading notes..." />}

      {isError && (
        <ErrorAlert
          message={`Error loading notes: ${error.response?.data?.message || error.message}`}
        />
      )}

      {!isLoading && !isError && data?.notes?.length === 0 && (
        <EmptyState
          message="No notes found. Create your first note!"
          actionTo="/notes/create"
          actionLabel="Create Note"
        />
      )}

      {!isLoading && !isError && data?.notes?.length > 0 && (
        <>
          <Row xs={1} sm={2} lg={3} className="g-3">
            {data.notes.map((note) => (
              <Col key={note._id}>
                <NoteCard note={note} />
              </Col>
            ))}
          </Row>

          {data.totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
              <Button
                variant="outline-secondary"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <i className="bi bi-chevron-left me-1"></i>Previous
              </Button>
              <span className="text-muted small">
                Page {data.page} of {data.totalPages}
              </span>
              <Button
                variant="outline-secondary"
                size="sm"
                disabled={page >= data.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next<i className="bi bi-chevron-right ms-1"></i>
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default NotesList;
