import React from "react";
import { Card, Container, Row, Button, Col, Form } from 'react-bootstrap';

class PagoInfoCarta extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pagos: [], editar: false };
        this.inputNum = React.createRef();
        this.inputVal = React.createRef();
        this.inputCvv = React.createRef();
        this.inputNombre = React.createRef();
        this.pagos = this.state.pagos;
    }

    componentDidMount() {
        var a = JSON.parse(localStorage.getItem('pagos'));
        if (a !== null) {
            this.pagos = a;
            this.setState({ pagos: this.pagos });
        }
    }

    quitar(x) {
        this.pagos.splice(x, 1);
        this.setState({ pagos: this.pagos });
        localStorage.removeItem("pagos");
        localStorage.setItem("pagos", JSON.stringify(this.pagos));
    }

    add() {
        var a = {
            num: this.inputNum.current.value,
            val: this.inputVal.current.value,
            cvv: this.inputCvv.current.value,
            nombre: this.inputNombre.current.value
        };
        this.pagos.push(a);
        localStorage.setItem('pagos', JSON.stringify(this.pagos));
        this.setState({ editar: !this.state.editar })
    }

    changeEditar() {
        this.setState({ editar: !this.state.editar })
    }

    render() {
        if (this.state.pagos.length === 0 && this.state.editar === false) {
            return (
                <Container fluid>
                    <br />
                    <center>
                        <Button size='lg' variant="outline-primary" type="button" onClick={() => this.changeEditar()} >
                            Añadir
                        </Button>
                    </center>
                </Container>
            );
        } if (this.state.editar === true) {
            return (
                <Container fluid>
                    <br />
                    <Row>
                        <Col xs={12} sm={8} lg={6} className="m-auto">
                            <Card>
                                <Card.Body>
                                    <Form>
                                        <Form.Label>Numero de tarjeta:</Form.Label>
                                        <Form.Control size='lg'
                                            type="number"
                                            ref={this.inputNum} />

                                        <Form.Label>Valided:</Form.Label>
                                        <Form.Control size='lg'
                                            type="date"
                                            ref={this.inputVal} />

                                        <Form.Label>CVV:</Form.Label>
                                        <Form.Control size='lg'
                                            type="number"
                                            ref={this.inputCvv} />

                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control size='lg'
                                            type="text"
                                            ref={this.inputNombre} />
                                    </Form>
                                    <br />
                                    <div className="d-grid">
                                        <Button size='lg' variant="primary" type="button" onClick={() => this.add()}>
                                            Guardar Cambios
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Container fluid>
                    {this.pagos.map((item, x) => {
                        return (
                            <Row>
                                <Col xs={12} className="m-auto">
                                    <Card >
                                        <Card.Body>
                                            <Card.Title>
                                                Numero de tarjeta: {item.num}
                                                <p />
                                                Valided: {item.val}
                                                <p />
                                                CVV: {item.cvv}
                                                <p />
                                                Nombre: {item.nombre}
                                            </Card.Title>
                                            <br />
                                            <Button size='lg' variant="outline-danger" type="button" onClick={() => this.quitar(x)} >
                                                Quitar
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        );
                    })}
                    <br />
                    <center>
                        <Button size='lg' variant="outline-primary" type="button" onClick={() => this.changeEditar()} >
                            Añadir
                        </Button>
                    </center>
                </Container>
            );
        }


    }
}


export default PagoInfoCarta;