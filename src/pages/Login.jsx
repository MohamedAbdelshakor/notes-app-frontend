import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Spinner, Row, Col } from "react-bootstrap";
import { login as loginApi } from "../api/auth";
import { setUser } from "../redux/authSlice";
import ErrorAlert from "../components/ErrorAlert";
import FormInput from "../components/FormInput";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      dispatch(setUser(res.data));
      navigate("/dashboard");
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Login failed");
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
                <i className="bi bi-box-arrow-in-right"></i>
              </div>
              <h2 className="fw-bold">Welcome Back</h2>
              <p className="text-muted small">Sign in to continue to Notes App</p>
            </div>

            <ErrorAlert message={error} />

            <form onSubmit={handleSubmit(onSubmit)}>
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
                placeholder="Enter your password"
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
                    Logging in...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Login
                  </>
                )}
              </Button>
            </form>

            <p className="text-center mt-4 mb-0 text-muted">
              Don't have an account?{" "}
              <Link to="/register" className="fw-medium">
                Register
              </Link>
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
