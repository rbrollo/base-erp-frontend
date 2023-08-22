import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import WorkIcon from "@mui/icons-material/Work";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col md={3}>
          <Card
            onClick={() => navigate("/clientes")}
            className="cursor-pointer"
          >
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">Módulo</Card.Subtitle>
              <Card.Text>
                <PersonIcon /> Cadastro de clientes
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card
            onClick={() => navigate("/servicos")}
            className="cursor-pointer"
          >
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">Módulo</Card.Subtitle>
              <Card.Text>
                <RoomServiceIcon /> Cadastro de serviços
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card
            onClick={() => navigate("/usuarios")}
            className="cursor-pointer"
          >
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">Módulo</Card.Subtitle>
              <Card.Text>
                <AssignmentIndIcon /> Cadastro de usuários
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card
            onClick={() => navigate("/atendimentos")}
            className="cursor-pointer"
          >
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">Módulo</Card.Subtitle>
              <Card.Text>
                <WorkIcon /> Atendimento
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export { Dashboard };
export default Dashboard;
