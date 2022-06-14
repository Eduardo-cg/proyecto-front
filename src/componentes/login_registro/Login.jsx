import React from 'react';
import { Container, Form, Button, Row, Col, FloatingLabel, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { URL_BACK } from '../../data/Constantes';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Usuario: null, setShow: false };
        this.inputUser = React.createRef();
        this.inputPassword = React.createRef();
    }

    async login() {

        let response = await fetch(URL_BACK + '/usuario/login?pass=' + this.inputPassword.current.value + '&usuario=' + this.inputUser.current.value);

        if (response.status === 200) {
            let data = await response.json();
            this.setState({ Usuario: data });
            console.log(this.state.Usuario);
        } else {
            this.setState({ setShow: true })
        }
    }


    componentDidMount() {
        if (localStorage.getItem('user') !== null) {
            this.setState({ Usuario: JSON.parse(localStorage.getItem('user')) });
        } else {
            this.setState({
                Usuario: null
            });
        }
    }

    componentWillUnmount() {
        if (this.state.Usuario !== null) {
            localStorage.setItem('user', JSON.stringify(this.state.Usuario));
        } else {
            localStorage.setItem('user', null);
        }
    }

    alerta() {
        return (
            <Row>
                <Col xs={12} md={8} lg={4} className="p-3 m-auto">
                    <Alert show={this.state.setShow} variant="danger" onClose={() => this.setState({ setShow: false })} dismissible>
                        <Alert.Heading>Error al iniciar sesión.</Alert.Heading>
                        <p>
                            Los datos no coinciden.
                        </p>
                    </Alert>
                </Col>
            </Row>
        )
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
                        <Col xs={12} md={8} lg={4} className="p-3 m-auto shadow rounded">
                            <Form>
                                <FloatingLabel controlId="floatingInput" label="Usuario" className="mb-3">
                                    <Form.Control size='lg'
                                        type="email"
                                        placeholder="Usuario"
                                        ref={this.inputUser} />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Contraseña" className="mb-3">
                                    <Form.Control size='lg'
                                        type="password"
                                        placeholder="Contraseña"
                                        ref={this.inputPassword} />
                                </FloatingLabel>
                            </Form>
                            <div className="d-grid gap-2">
                                <Button size='lg' variant="primary" type="button" onClick={() => { this.login() }}>
                                    Iniciar Sesion
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default Login;