import React from 'react';
import { Container, Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import { Usuarios } from '../../data/Usuarios';


class Registro extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Usuario: null };
        this.registrarse = this.registrarse.bind(this);
        this.inputName = React.createRef();
        this.inputEmail = React.createRef();
        this.inputUser = React.createRef();
        this.inputPassword = React.createRef();
        this.inputRPassword = React.createRef();
    }

    registrarse() {
        if (this.inputName.current.value === "" || this.inputEmail.current.value === "" || this.inputUser.current.value === ""
            || this.inputPassword.current.value === "" || this.inputRPassword.current.value === "") {
            alert('Introduce todos los campos.');
        } else if (this.inputPassword.current.value !== this.inputRPassword.current.value) {
            alert('Las contreñas no coinciden.');
        } else {
            Usuarios.map((item) => {
                if (item.user.match(this.inputUser.current.value)) {
                    alert('El usuario ya existe.');
                }
            });
        }
    }



    render() {

        return (
            <Container fluid="md">
                <Row>
                    <Col xs={12} md={8} lg={6} className="p-3 m-auto shadow rounded">
                        <Form>
                            <FloatingLabel controlId="floatingInput" label="Nombre" className="mb-3">
                                <Form.Control size='lg'
                                    type="text"
                                    placeholder="Nombre"
                                    ref={this.inputName} />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
                                <Form.Control size='lg'
                                    type="email"
                                    placeholder="Email"
                                    ref={this.inputEmail} />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingInput" label="Usuario" className="mb-3">
                                <Form.Control size='lg'
                                    type="text"
                                    placeholder="Usuario"
                                    ref={this.inputUser} />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingPassword" label="Contraseña" className="mb-3">
                                <Form.Control size='lg'
                                    type="password"
                                    placeholder="Contraseña"
                                    ref={this.inputPassword} />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingPassword" label="Repetir Contraseña" className="mb-3">
                                <Form.Control size='lg'
                                    type="password"
                                    placeholder="Repetir Contraseña"
                                    ref={this.inputRPassword} />
                            </FloatingLabel>
                        </Form>
                        <div className="d-grid gap-2">
                            <Button size='lg' variant="primary" type="button" onClick={this.registrarse}>
                                Registarse
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        );

    }
}

export default Registro;