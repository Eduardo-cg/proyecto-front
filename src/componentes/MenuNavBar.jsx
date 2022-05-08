import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Offcanvas, NavDropdown, Image } from 'react-bootstrap';
import { MenuNav } from '../data/MenuNav';
import { Restaurantes } from '../data/Restaurantes';
import uuid from 'react-uuid';
import './StyleMenu.css';
import perfil from '../img/perfil.png'
import logo from '../img/logo.png'

class MenuNavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar bg="light" variant="light" expand={false}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/inicio">
            <h2 >
              <Image
                src={logo}
                height="60px">
              </Image>
              &nbsp; Nombre por determinar</h2>
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
                </Nav>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav>
                <Nav.Link as={Link} to="/pedido">
                  Pedido
                </Nav.Link>
                <NavDropdown title="Restaurantes" id="basic-nav-dropdown">
                  {Restaurantes.map((item) => {
                    return <NavDropdown.Item key={uuid()} href="restaurante" onClick={() => (localStorage.setItem('restaurante', item.id))}>
                      {item.name}</NavDropdown.Item>
                  })}
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar >
    );
  }
}

export default MenuNavBar;

