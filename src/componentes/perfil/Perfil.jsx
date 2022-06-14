import React from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Button, Col, Tabs, Tab } from 'react-bootstrap';
import PerfilCarta from "./PerfilCarta";
import Pedidos from "./Pedidos";
import PagoInfoCarta from "./PagoInfoCarta";
import Administracion from "./Administracion";


class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Usuario: null };
  }

  componentDidMount() {
    this.setState({ Usuario: JSON.parse(localStorage.getItem('user')) })
  }

  admin() {
    if (this.state.Usuario !== null && this.state.Usuario.admin === true) {
      return (
        <Tab eventKey="admin" title="Admin">
          <Administracion />
        </Tab>
      );
    }
  }

  render() {
    if (this.state.Usuario !== null) {
      return (
        <Container fluid="md">
          <Row>
            <Col xs={12} className="p-3 m-auto shadow rounded">
              <Tabs defaultActiveKey="info" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="info" title="Informacion Personal">
                  <PerfilCarta />
                </Tab>
                <Tab eventKey="infopagos" title="Informacion Pagos">
                  <PagoInfoCarta />
                </Tab>
                <Tab eventKey="pedidos" title="Pedidos">
                  <Pedidos />
                </Tab>
                {this.admin()}
              </Tabs>
            </Col>
          </Row>
        </Container>
      )
    } else {
      return (
        <Container fluid="md">
          <Row>
            <Col xs={12} md={6} className="p-3 m-auto shadow rounded">
              <div className="d-grid gap-2">
                <Button variant="outline-primary" size="lg" as={Link} to="/login">Iniciar Sesion</Button>
              </div>
              <br />
              <div className="me-auto" text-align="center">
                <h1 style={{ textAlign: "center" }}>
                  o
                </h1>
              </div>
              <br />
              <div className="d-grid gap-2">
                <Button variant="outline-secondary" size="lg" as={Link} to="/registro">Registrarse</Button>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}
export default Perfil;

