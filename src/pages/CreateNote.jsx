import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Spinner, Row, Col, Form } from "react-bootstrap";
import { createNote } from "../api/notes";
import ErrorAlert from "../components/ErrorAlert";
import FormInput from "../components/FormInput";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().default("General"),
  tags: z.string().default(""),
  status: z.enum(["active", "archived"]).default("active"),
  isPinned: z.boolean().default(false),
});

function CreateNote() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "General",
      tags: "",
      status: "active",
      isPinned: false,
    },
  });

  const mutation = useMutation({
    mutationFn: createNote,
    onMutate: async (newNote) => {
      await queryClient.cancelQueries({ queryKey: ["notes"] });
      const previousNotes = queryClient.getQueriesData({ queryKey: ["notes"] });
      queryClient.setQueriesData({ queryKey: ["notes"] }, (old) => {
        if (!old) return old;
        const optimisticNote = {
          ...newNote,
          _id: "temp-" + Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        return { ...old, notes: [optimisticNote, ...old.notes] };
      });
      return { previousNotes };
    },
    onError: (err, variables, context) => {
      if (context?.previousNotes) {
        context.previousNotes.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
      setError(err.response?.data?.message || "Failed to create note");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onSuccess: () => {
      navigate("/notes");
    },
  });

  const onSubmit = (data) => {
    setError("");
    const noteData = {
      ...data,
      tags: data.tags
        ? data.tags.split(",").map((t) => t.trim())
        : [],
    };
    mutation.mutate(noteData);
  };

  return (
    <>
      <div className="d-flex align-items-center mb-4 gap-3">
        <Link to="/notes" className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-arrow-left me-1"></i>Back
        </Link>
        <h2 className="fw-bold mb-0">
          <i className="bi bi-plus-circle me-2"></i>Create Note
        </h2>
      </div>

      <ErrorAlert message={error} />

      <Card className="border-0 note-form-card">
        <Card.Body className="p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Title"
              name="title"
              register={register}
              error={errors.title?.message}
              placeholder="Note title"
            />
            <FormInput
              label="Content"
              name="content"
              register={register}
              error={errors.content?.message}
              as="textarea"
              rows={6}
              placeholder="Write your note here..."
            />
            <Row>
              <Col md={6}>
                <FormInput label="Category" name="category" register={register} error={errors.category?.message}>
                  <Form.Select {...register("category")}>
                    <option value="General">General</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Ideas">Ideas</option>
                    <option value="Tasks">Tasks</option>
                  </Form.Select>
                </FormInput>
              </Col>
              <Col md={6}>
                <FormInput label="Status" name="status" register={register} error={errors.status?.message}>
                  <Form.Select {...register("status")}>
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                  </Form.Select>
                </FormInput>
              </Col>
            </Row>
            <FormInput
              label="Tags (comma separated)"
              name="tags"
              register={register}
              error={errors.tags?.message}
              placeholder="tag1, tag2, tag3"
            />
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="isPinned"
                label="Pin this note"
                {...register("isPinned")}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="w-100 py-2"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Creating...
                </>
              ) : (
                <>
                  <i className="bi bi-plus-lg me-1"></i>
                  Create Note
                </>
              )}
            </Button>
          </form>
        </Card.Body>
      </Card>
    </>
  );
}

export default CreateNote;
