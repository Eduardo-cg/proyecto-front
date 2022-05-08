import React from "react";
import { Link } from 'react-router-dom';
import { Card, Container, Row, Button, Col, CardGroup, Form } from 'react-bootstrap';

class PerfilCarta extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: '', email: '', pass: '', name: '', editar: false };
        this.logout = this.logout.bind(this);
        this.changeEditar = this.changeEditar.bind(this);
        this.guardarCambios = this.guardarCambios.bind(this);

        this.inputUser = React.createRef();
        this.inputPassword = React.createRef();
        this.inputEmail = React.createRef();
        this.inputNombre = React.createRef();

    }
    componentDidMount() {
        if (localStorage.getItem('id') !== 'null') {
            this.setState({
                id: localStorage.getItem('id'),
                user: localStorage.getItem('user'),
                email: localStorage.getItem('email'),
                pass: localStorage.getItem('pass'),
                name: localStorage.getItem('name'),
            });
        }
    }

    logout() {
        localStorage.removeItem('id');
        localStorage.removeItem('user');
        localStorage.removeItem('pass');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        window.location.reload();
    }

    changeEditar() {
        this.setState({ editar: !this.state.editar })
    }

    guardarCambios() {
        localStorage.setItem('user', this.inputUser.current.value);
        localStorage.setItem('pass', this.inputPassword.current.value);
        localStorage.setItem('name', this.inputNombre.current.value);
        localStorage.setItem('email', this.inputEmail.current.value);

        this.setState({
            id: localStorage.getItem('id'),
            user: localStorage.getItem('user'),
            email: localStorage.getItem('email'),
            pass: localStorage.getItem('pass'),
            name: localStorage.getItem('name'),
        });
    }

    render() {
        if (localStorage.getItem('id') !== 'null' && localStorage.getItem('id') !== null) {
            if (this.state.editar === false) {
                return (
                    <div>
                        <br />
                        <Container>
                            <Row>
                                <Col xs={6} md={4} className="p-3 m-auto shadow rounded">
                                    <Card >
                                        <Card.Body>
                                            <Card.Title>
                                                Usuario: {this.state.user}
                                                <p />
                                                Email: {this.state.email}
                                                <p />
                                                Pass: {this.state.pass}
                                                <p />
                                                Nombre: {this.state.name}
                                            </Card.Title>
                                            <br />
                                            <Button size='lg' variant="outline-danger" type="button" onClick={this.logout} >
                                                Logout
                                            </Button>
                                            &nbsp;
                                            <Button size='lg' variant="outline-primary" type="button" onClick={this.changeEditar}>
                                                Editar
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )

            } else {
                return (
                    <div className="bg">
                        <br />
                        <Container>
                            <Row>
                                <Col xs={12} md={8} className="p-3 m-auto shadow rounded">
                                    <CardGroup>
                                        <Card >
                                            <Card.Body>
                                                <Card.Title>
                                                    Usuario: {this.state.user}
                                                    <p />
                                                    Email: {this.state.email}
                                                    <p />
                                                    Pass: {this.state.pass}
                                                    <p />
                                                    Nombre: {this.state.name}
                                                </Card.Title>
                                                <br />
                                                <div>
                                                    <Button size='lg' variant="outline-danger" type="button" onClick={this.logout} >
                                                        Logout
                                                    </Button>
                                                    &nbsp;
                                                    <Button size='lg' variant="outline-primary" type="button" onClick={this.changeEditar}>
                                                        Dejar de Editar
                                                    </Button>
                                                </div>


                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Body>
                                                <Form>
                                                    <Form.Label>Usuario:</Form.Label>
                                                    <Form.Control size='lg'
                                                        type="text"
                                                        defaultValue={this.state.user}
                                                        ref={this.inputUser} />

                                                    <Form.Label>Email:</Form.Label>
                                                    <Form.Control size='lg'
                                                        type="email"
                                                        defaultValue={this.state.email}
                                                        ref={this.inputEmail} />

                                                    <Form.Label>Contraseña:</Form.Label>
                                                    <Form.Control size='lg'
                                                        type="password"
                                                        defaultValue={this.state.pass}
                                                        ref={this.inputPassword} />

                                                    <Form.Label>Nombre:</Form.Label>
                                                    <Form.Control size='lg'
                                                        type="text"
                                                        defaultValue={this.state.name}
                                                        ref={this.inputNombre} />
                                                </Form>
                                                <br />
                                                <div className="d-grid gap-2">
                                                    <Button size='lg' variant="primary" type="button" onClick={this.guardarCambios}>
                                                        Guardar Cambios
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </CardGroup>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                );
            }
        } else {
            return (

                <div className="p-3">
                    <Container>
                        <br />
                        <Row>
                            <Col xs={12} md={8} className="p-3 m-auto shadow rounded">
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
export default PerfilCarta;