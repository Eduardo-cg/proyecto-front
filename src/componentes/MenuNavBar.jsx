import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Offcanvas, NavDropdown, Image, Form, FormControl, Button } from 'react-bootstrap';
import { Restaurantes } from '../data/Restaurantes';
import uuid from 'react-uuid';
import './StyleMenu.css';
import perfil from '../img/perfil.png'
import logo from '../img/logo.png'

class MenuNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { restaurantes: [] };
    this.inputSearch = React.createRef();
  }

  inputHandler() {
    var lowerCase = this.inputSearch.current.value.toLowerCase();
    if (lowerCase !== '') {
      var filtrado = Restaurantes.filter((e) => {
        return e.name.toLowerCase().includes(lowerCase)
      });
      this.setState({ restaurantes: filtrado });
    } else {
      this.setState({ restaurantes: [] });
    };

  };

  render() {
    return (
      <Navbar bg="light" variant="light" expand={false}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/inicio">
            <h1>
              <Image
                src={logo}
                height="60px">
              </Image>
              &nbsp; Nombre</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title class="titulo" id="offcanvasNavbarLabel">
                <Nav>
                  <Nav.Link as={Link} to="/perfil">
                    <Image
                      className='rounded-circle'
                      src={perfil} height="50px"
                      rounded={true}>
                    </Image>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/pedido">
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
                  <Button variant="outline-primary" onClick={() => this.inputHandler()}>Search</Button>
                </Form>
                <br />
                {this.state.restaurantes.map((item) => {
                  return <NavDropdown.Item key={uuid()} as={Link} to={"/restaurante/" + item.id}>
                    {item.name}</NavDropdown.Item>
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

