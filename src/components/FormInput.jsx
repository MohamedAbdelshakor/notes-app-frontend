import { Form } from "react-bootstrap";

function FormInput({ label, error, register, name, type = "text", placeholder, as, rows, children, ...rest }) {
  return (
    <Form.Group className="mb-3" controlId={name}>
      {label && <Form.Label className="fw-medium">{label}</Form.Label>}
      {children ? (
        children
      ) : (
        <Form.Control
          {...register(name)}
          type={type}
          placeholder={placeholder}
          as={as}
          rows={rows}
          isInvalid={!!error}
          {...rest}
        />
      )}
      {error && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}

export default FormInput;
