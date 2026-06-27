import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Spinner, Row, Col } from "react-bootstrap";
import { register as registerApi } from "../api/auth";
import { setUser } from "../redux/authSlice";
import ErrorAlert from "../components/ErrorAlert";
import FormInput from "../components/FormInput";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (res) => {
      dispatch(setUser(res.data));
      navigate("/dashboard");
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Registration failed");
    },
  });

  const onSubmit = (data) => {
    setError("");
    mutation.mutate(data);
  };

  return (
    <Row className="justify-content-center align-items-center min-vh-auth">
      <Col xs={12} sm={10} md={8} lg={5} xl={4}>
        <Card className="auth-card border-0">
          <Card.Body className="p-4 p-md-5">
            <div className="text-center mb-4">
              <div className="auth-icon-circle mb-3">
                <i className="bi bi-person-plus"></i>
              </div>
              <h2 className="fw-bold">Create Account</h2>
              <p className="text-muted small">Join Notes App to get started</p>
            </div>

            <ErrorAlert message={error} />

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                label="Name"
                name="name"
                register={register}
                error={errors.name?.message}
                placeholder="John Doe"
              />
              <FormInput
                label="Email"
                name="email"
                type="email"
                register={register}
                error={errors.email?.message}
                placeholder="you@example.com"
              />
              <FormInput
                label="Password"
                name="password"
                type="password"
                register={register}
                error={errors.password?.message}
                placeholder="Min. 6 characters"
              />
              <Button
                type="submit"
                variant="primary"
                className="w-100 py-2 mt-1"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Registering...
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-plus me-1"></i>
                    Register
                  </>
                )}
              </Button>
            </form>

            <p className="text-center mt-4 mb-0 text-muted">
              Already have an account?{" "}
              <Link to="/login" className="fw-medium">
                Login
              </Link>
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Register;
