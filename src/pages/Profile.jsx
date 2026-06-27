import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { Card, Button, Spinner, Row, Col, Badge } from "react-bootstrap";
import { uploadProfileImage } from "../api/auth";
import { setUser } from "../redux/authSlice";
import UserAvatar from "../components/UserAvatar";
import ErrorAlert from "../components/ErrorAlert";

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (res) => {
      dispatch(setUser(res.data));
      setError("");
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Upload failed");
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profileImage", file);
    mutation.mutate(formData);
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="fw-bold mb-0">
          <i className="bi bi-person-circle me-2"></i>My Profile
        </h2>
        <p className="text-muted small mb-0">Manage your account and profile picture</p>
      </div>

      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="border-0 profile-card">
            <Card.Body className="p-4 text-center">
              <div className="mb-3">
                <UserAvatar user={user} size={120} className="border border-3 border-primary" />
              </div>

              <h4 className="fw-bold mb-1">{user?.name}</h4>
              <p className="text-muted mb-3">
                <i className="bi bi-envelope me-1"></i>
                {user?.email}
              </p>

              <div className="mb-3">
                <label className="btn btn-outline-primary btn-sm">
                  {mutation.isPending ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-1" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-camera me-1"></i>
                      Upload Photo
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </label>
              </div>

              <ErrorAlert message={error} />

              <hr />

              <div className="text-start">
                <Row className="mb-2">
                  <Col xs={4} className="text-muted fw-medium">Name</Col>
                  <Col xs={8}>{user?.name}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={4} className="text-muted fw-medium">Email</Col>
                  <Col xs={8}>{user?.email}</Col>
                </Row>
                <Row>
                  <Col xs={4} className="text-muted fw-medium">Status</Col>
                  <Col xs={8}>
                    <Badge bg="success" className="rounded-pill">Active</Badge>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Profile;
