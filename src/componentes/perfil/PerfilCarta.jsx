import React from "react";
import { Card, Container, Row, Button, Col, CardGroup, Form, Alert } from 'react-bootstrap';
import { URL_BACK } from '../../data/Constantes';

class PerfilCarta extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Usuario: JSON.parse(localStorage.getItem('user')), editar: false, setShow: false };

        this.inputNombre = React.createRef();
        this.inputApellido = React.createRef();
        this.inputUsuario = React.createRef();
        this.inputContra = React.createRef();
        this.inputEmail = React.createRef();
        this.inputTelefono = React.createRef();
        this.inputDireccion = React.createRef();
    }

    componentDidMount() {

    }

    logout() {
        localStorage.removeItem('user');
        window.location.reload();
    }

    changeEditar() {
        this.setState({ editar: !this.state.editar })
    }

    async guardarCambios() {

        let u = this.state.Usuario;

        u.nombre = this.inputNombre.current.value;
        u.apellido = this.inputApellido.current.value;
        u.usuario = this.inputUsuario.current.value;
        u.contra = this.inputContra.current.value;
        u.email = this.inputEmail.current.value;
        u.telefono = this.inputTelefono.current.value;
        u.direccion = this.inputDireccion.current.value;

        let response = await fetch(URL_BACK + '/usuario/insertar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(u)
        });

        if (response.ok) {
            let data = await response.json();
            localStorage.setItem('user', JSON.stringify(data))
            this.setState({ Usuario: data });
        } else {
            this.setState({ setShow: true })
        }
    }

    alerta() {
        return (
            <Row>
                <Col xs={12} md={8} lg={4} className="p-3 m-auto">
                    <Alert show={this.state.setShow} variant="danger" onClose={() => this.setState({ setShow: false })} dismissible>
                        <Alert.Heading>Error al editar usuario.</Alert.Heading>
                        <p>
                            Error al editar usuario.
                        </p>
                    </Alert>
                </Col>
            </Row>
        )
    }

    render() {
        if (this.state.editar === false) {
            return (
                <Container fluid>
                    <br />
                    <Row>
                        <Col xs={12} className="m-auto">
                            <Card >
                                <Card.Body>
                                    <Card.Title>
                                        Nombre: {this.state.Usuario.nombre}
                                        <p />
                                        Apellidos: {this.state.Usuario.apellido}
                                        <p />
                                        Usuario: {this.state.Usuario.usuario}
                                        <p />
                                        Contraseña: {this.state.Usuario.contra}
                                        <p />
                                        Email: {this.state.Usuario.email}
                                        <p />
                                        Telefono: {this.state.Usuario.telefono}
                                        <p />
                                        Direccion: {this.state.Usuario.direccion}
                                    </Card.Title>
                                    <br />
                                    <Button size='lg' variant="outline-danger" type="button" onClick={() => { this.logout() }} >
                                        Logout
                                    </Button>
                                    &nbsp;
                                    <Button size='lg' variant="outline-primary" type="button" onClick={() => { this.changeEditar() }}>
                                        Editar
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
        } else {
            return (
                <Container fluid>
                    {this.alerta()}
                    <Row>
                        <Col xs={12} className="m-auto">
                            <CardGroup>
                                <Card >
                                    <Card.Body>
                                        <Card.Title>
                                            Nombre: {this.state.Usuario.nombre}
                                            <p />
                                            Apellidos: {this.state.Usuario.apellido}
                                            <p />
                                            Usuario: {this.state.Usuario.usuario}
                                            <p />
                                            Contraseña: {this.state.Usuario.contra}
                                            <p />
                                            Email: {this.state.Usuario.email}
                                            <p />
                                            Telefono: {this.state.Usuario.telefono}
                                            <p />
                                            Direccion: {this.state.Usuario.direccion}
                                        </Card.Title>
                                        <br />
                                        <div>
                                            <Button size='lg' variant="outline-danger" type="button" onClick={() => { this.logout() }} >
                                                Logout
                                            </Button>
                                            &nbsp;
                                            <Button size='lg' variant="outline-primary" type="button" onClick={() => { this.changeEditar() }}>
                                                Dejar de Editar
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Body>
                                        <Form>
                                            <Form.Label>Nombre:</Form.Label>
                                            <Form.Control size='lg'
                                                type="text"
                                                defaultValue={this.state.Usuario.nombre}
                                                ref={this.inputNombre} />
                                            <Form.Label>Apellidos:</Form.Label>
                                            <Form.Control size='lg'
                                                type="email"
                                                defaultValue={this.state.Usuario.apellido}
                                                ref={this.inputApellido} />
                                            <Form.Label>Usuario:</Form.Label>
                                            <Form.Control size='lg'
                                                type="text"
                                                defaultValue={this.state.Usuario.usuario}
                                                ref={this.inputUsuario} />
                                            <Form.Label>Contraseña:</Form.Label>
                                            <Form.Control size='lg'
                                                type="password"
                                                defaultValue={this.state.Usuario.contra}
                                                ref={this.inputContra} />
                                            <Form.Label>Email:</Form.Label>
                                            <Form.Control size='lg'
                                                type="email"
                                                defaultValue={this.state.Usuario.email}
                                                ref={this.inputEmail} />
                                            <Form.Label>Telefono:</Form.Label>
                                            <Form.Control size='lg'
                                                type="email"
                                                defaultValue={this.state.Usuario.telefono}
                                                ref={this.inputTelefono} />
                                            <Form.Label>Direccion:</Form.Label>
                                            <Form.Control size='lg'
                                                type="email"
                                                defaultValue={this.state.Usuario.direccion}
                                                ref={this.inputDireccion} />
                                        </Form>
                                        <br />
                                        <div className="d-grid">
                                            <Button size='lg' variant="primary" type="button" onClick={() => { this.guardarCambios() }}>
                                                Guardar Cambios
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default PerfilCarta;