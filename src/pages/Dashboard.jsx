import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import DashboardHeader from "../components/DashboardHeader";

function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  const cards = [
    {
      to: "/notes",
      icon: "bi-stickies",
      title: "My Notes",
      text: "View and manage your notes",
    },
    {
      to: "/notes/create",
      icon: "bi-plus-circle",
      title: "Create Note",
      text: "Add a new note",
    },
    {
      to: "/profile",
      icon: "bi-person-circle",
      title: "Profile",
      text: "View and edit your profile",
    },
  ];

  return (
    <>
      <DashboardHeader />

      <h5 className="text-muted text-uppercase fw-semibold mb-3" style={{ letterSpacing: "0.05em", fontSize: "0.8rem" }}>
        Quick Actions
      </h5>

      <Row xs={1} md={2} lg={3} className="g-4">
        {cards.map((card) => (
          <Col key={card.to}>
            <Card
              as={Link}
              to={card.to}
              className="h-100 text-decoration-none dashboard-action-card border-0"
            >
              <Card.Body className="d-flex align-items-center gap-3 p-4">
                <div className="dashboard-icon-circle">
                  <i className={`bi ${card.icon}`}></i>
                </div>
                <div>
                  <Card.Title className="mb-1 fw-semibold">{card.title}</Card.Title>
                  <Card.Text className="text-muted small mb-0">{card.text}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Dashboard;
