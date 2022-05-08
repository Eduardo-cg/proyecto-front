import React from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Button, Col, Tabs, Tab } from 'react-bootstrap';
import PerfilCarta from "./PerfilCarta";
import Pedidos from "./Pedidos";
import PagoInfoCarta from "./PagoInfoCarta";


class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: null };
  }

  componentDidMount() {
    this.setState({ id: localStorage.getItem('id') })
  }
  
  render() {
    if (localStorage.getItem('id') !== 'null' && localStorage.getItem('id') !== null) {

      return (

        <div className="bg">
          <br />
          <Container>
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
            </Tabs>
          </Container>
        </div>
      )


    } else {
      return (

        <div className="p-3">
          <Container>
            <br />
            <Row>
              <Col xs={6} className="p-3 m-auto shadow rounded">
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
        </div>
      );
    }
  }
}
export default Perfil;

