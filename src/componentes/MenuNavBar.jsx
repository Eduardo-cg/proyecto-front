import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Offcanvas, NavDropdown, Image, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import uuid from 'react-uuid';
import perfil from '../img/perfil.png'
import logo from '../img/logo.png'
import { URL_BACK } from '../data/Constantes';

class MenuNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { restaurantes: [], expand: false, expanded: false };

    this.lista = [];
    this.inputSearch = React.createRef();
  }

  buscar() {
    var lowerCase = this.inputSearch.current.value.toLowerCase();
    if (lowerCase !== '') {
      var filtrado = this.lista.filter((e) => {
        return e.nombre.toLowerCase().includes(lowerCase)
      });
      this.setState({ restaurantes: filtrado });
    } else {
      this.setState({ restaurantes: [] });
    };

  };

  async componentDidMount() {
    let response = await fetch(URL_BACK + '/restaurante/listar');
    let data = await response.json();
    this.lista = data;
  };

  render() {
    return (
      <Navbar bg="light" variant="light" expand={this.state.expand} expanded={this.state.expand} onToggle={() => { this.setState({ expand: !this.state.expand }) }}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/inicio">
            <Row>
              <Col>
                <Image
                  src={logo}
                  height="80px">
                </Image>
              </Col>
              <Col>
                <p style={{ paddingTop: "5px", fontSize:"40px" }}>
                  Blou
                </p>
              </Col>
            </Row>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title class="titulo" id="offcanvasNavbarLabel">
                <Nav>
                  <Nav.Link onClick={() => { this.setState({ expand: false }) }} as={Link} to="/perfil">
                    <Image
                      className='rounded-circle'
                      src={perfil} height="50px"
                      rounded={true}>
                    </Image>
                  </Nav.Link>
                  <Nav.Link onClick={() => { this.setState({ expand: false }) }} as={Link} to="/pedido">
                    Pedido
                  </Nav.Link>
                </Nav>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav>
                <h4>Buscar Restaurantes</h4>
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    ref={this.inputSearch}
                  />
                  <Button variant="outline-primary" onClick={() => this.buscar()}>Search</Button>
                </Form>
                <br />
                {this.state.restaurantes.map((item) => {
                  return <NavDropdown.Item key={uuid()} onClick={() => { this.setState({ expand: false }) }} as={Link} to={"/restaurante/" + item.id}>
                    {item.nombre}</NavDropdown.Item>
                })}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar >
    );
  }
}

export default MenuNavBar;

