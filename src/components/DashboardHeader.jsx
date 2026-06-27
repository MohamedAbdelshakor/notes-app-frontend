import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import UserAvatar from "./UserAvatar";

function DashboardHeader() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Card className="dashboard-header-card mb-4 border-0">
      <Card.Body className="d-flex align-items-center gap-3 p-4 position-relative">
        <UserAvatar user={user} size={72} />
        <div>
          <h4 className="mb-1 fw-bold">Welcome back, {user?.name}!</h4>
          <p className="mb-0 small">
            <i className="bi bi-envelope me-1"></i>
            {user?.email}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default DashboardHeader;
