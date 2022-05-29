import React from "react";
import { Table, Container, Row, Button, Col, Modal } from 'react-bootstrap';


class Pedido extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pe: [] };
        this.pedidos = [];
        this.pagar = this.pagar.bind(this);
    }

    componentDidMount() {
        let p = JSON.parse(localStorage.getItem("pedidos"));
        this.setState({ pe: p });
        this.pedidos = p;
    }

    pagar() {
        this.setState({ setShow: true, boton: true })
    }

    quitar(x, y) {
        if (this.pedidos[x].lineas[y].unidades == 1) {
            if (this.pedidos[x].lineas.length === 1) {
                this.pedidos.splice(x, 1);
            } else {
                this.pedidos[x].lineas.splice(y, 1);
            }
        } else {
            this.pedidos[x].lineas[y].unidades--;
        }

        this.setState({ pe: this.pedidos });
        localStorage.removeItem("pedidos");
        localStorage.setItem("pedidos", JSON.stringify(this.pedidos));
    }



    renderProducts() {
        return this.pedidos.map((item, x) => {
            return (
                <Row>
                    <Col className="p-3 m-auto">
                        <b>Id: {item.id} Restaurante: {item.idR} Fecha: {item.fecha} Precio: {item.precio}</b>
                        <br />
                        <br />
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Unidades</th>
                                </tr>
                            </thead>
                            <tbody>
                                {item.lineas.map((l, y) => {
                                    return (
                                        <tr>
                                            <td>{l.nombre}</td>
                                            <td>{l.precio}</td>
                                            <td>{l.unidades}</td>
                                            <td className="d-grid gap-2">
                                                <Button variant="outline-danger" onClick={() => this.quitar(x, y)}>
                                                    Quitar
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            );
        })
    }

    render() {

        if (localStorage.getItem("pedidos") == null || this.pedidos.length === 0) {
            return (
                <Container className="p-3 m-auto shadow rounded">
                    <br />
                    <center>
                        <h1>No hay pedidos.</h1>
                    </center>
                    <br />
                </Container>
            );
        } else {
            return (
                <Container className="p-3 m-auto shadow rounded">
                    {this.renderProducts()}
                    <Row className="p-3 m-auto">
                        <center>
                            <Button disabled={this.state.boton} size="lg" variant="outline-primary" onClick={this.pagar}>Pagar</Button>
                        </center>
                    </Row>
                    <Modal show={this.state.setShow} onHide={() => this.setState({ setShow: false, pe: [] }, () => localStorage.removeItem("pedidos"))}>
                        <Modal.Header closeButton>
                            <Modal.Title>Pedido Hecho</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => this.setState({ setShow: false, pe: [] }, () => localStorage.removeItem("pedidos"))}>
                                Aceptar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            );
        }
    }
}

export default Pedido;