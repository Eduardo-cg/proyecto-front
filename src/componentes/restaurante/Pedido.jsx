import React from "react";
import { Table, Container, Row, Button, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PedidosEj } from "../../data/PedidosEj";

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

    renderProducts() {
        return this.pedidos.map(item => {
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
                                {item.lineas.map((l) => {
                                    return (
                                        <tr>
                                            <td>{l.nombre}</td>
                                            <td>{l.precio}</td>
                                            <td>{l.unidades}</td>
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

    pagar() {
        this.setState({ setShow: true, boton: true })
    }

    render() {

        if (localStorage.getItem("pedidos") == null) {
            return (
                <div className="p-3 m-auto shadow rounded">
                    <br />
                    <Container>
                        <center>
                            <h1>No hay pedidos.</h1>
                        </center>
                    </Container>
                    <br />
                </div>
            );
        } else {
            return (
                <div className="p-3 m-auto shadow rounded">
                    <br />
                    <Container>
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
                    <br />
                </div>
            );
        }


    }
}
export default Pedido;