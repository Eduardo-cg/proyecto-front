import React from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { URL_BACK } from '../../data/Constantes';


class Registro extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Usuario: null, setShow: false};

        this.inputNombre = React.createRef();
        this.inputApellido = React.createRef();
        this.inputUsuario = React.createRef();
        this.inputContra = React.createRef();
        this.inputContraR = React.createRef();
        this.inputEmail = React.createRef();
        this.inputTelefono = React.createRef();
        this.inputDireccion = React.createRef();
    }

    async registrarse() {
        if (this.inputNombre.current.value === "" || this.inputApellido.current.value === "" || this.inputUsuario.current.value === ""
            || this.inputContra.current.value === "" || this.inputContraR.current.value === "" || this.inputEmail.current.value === ""
            || this.inputTelefono.current.value === "" || this.inputDireccion.current.value === "") {
            this.setState({ setShow: true, causa: 1 })
        } else if (this.inputContra.current.value !== this.inputContraR.current.value) {
            this.setState({ setShow: true, causa: 2 })
        } else {
            let u = {
                "id": 0,
                "usuario": this.inputUsuario.current.value,
                "contra": this.inputContra.current.value,
                "nombre": this.inputNombre.current.value,
                "apellido": this.inputApellido.current.value,
                "telefono": this.inputTelefono.current.value,
                "email": this.inputEmail.current.value,
                "direccion": this.inputDireccion.current.value,
                "admin": false
            }

            let response = await fetch(URL_BACK + '/usuario/insertar', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(u)
            });
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(u))
                this.setState({ Usuario: u });
            } else {
                this.setState({ setShow: true, causa: 3 })
            }
        }
    }

    alerta() {
        return (
            <Row>
                <Col xs={12} md={8} lg={4} className="p-3 m-auto">
                    <Alert show={this.state.setShow} variant="danger" onClose={() => this.setState({ setShow: false })} dismissible>
                        <Alert.Heading>Error al crear usuario.</Alert.Heading>
                        <p>
                            {this.textoError()}
                        </p>
                    </Alert>
                </Col>
            </Row>
        )
    }

    textoError() {
        switch (this.state.causa) {
            case 1:
                return 'Introduce todos los campos.';
            case 2:
                return 'Las contraseñas no coinciden.';
            case 3:
                return 'Error en el servidor.';
            default:
                return 'Error.';
        }
    }

    render() {
        if (this.state.Usuario !== null) {
            return (
                <Redirect to='/perfil' />
            );
        } else {
            return (
                <Container fluid="md">
                    {this.alerta()}
                    <Row>
                        <Col xs={12} md={8} lg={6} className="p-3 m-auto shadow rounded">
                            <Form>
                                <Form.Label>Nombre:</Form.Label>
                                <Form.Control size='lg'
                                    type="text"
                                    ref={this.inputNombre} />
                                <Form.Label>Apellidos:</Form.Label>
                                <Form.Control size='lg'
                                    type="email"
                                    ref={this.inputApellido} />
                                <Form.Label>Usuario:</Form.Label>
                                <Form.Control size='lg'
                                    type="text"
                                    ref={this.inputUsuario} />
                                <Form.Label>Contraseña:</Form.Label>
                                <Form.Control size='lg'
                                    type="password"
                                    ref={this.inputContra} />
                                <Form.Label>Repetir Contraseña:</Form.Label>
                                <Form.Control size='lg'
                                    type="password"
                                    ref={this.inputContraR} />
                                <Form.Label>Email:</Form.Label>
                                <Form.Control size='lg'
                                    type="email"
                                    ref={this.inputEmail} />
                                <Form.Label>Telefono:</Form.Label>
                                <Form.Control size='lg'
                                    type="email"
                                    ref={this.inputTelefono} />
                                <Form.Label>Direccion:</Form.Label>
                                <Form.Control size='lg'
                                    type="email"
                                    ref={this.inputDireccion} />
                            </Form>
                            <br />
                            <div className="d-grid gap-2">
                                <Button size='lg' variant="primary" type="button" onClick={() => { this.registrarse() }}>
                                    Registarse
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            );
        }

    }
}

export default Registro;