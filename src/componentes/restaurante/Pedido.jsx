import React from "react";
import { Link } from 'react-router-dom';
import { Table, Container, Row, Button, Col, Modal, Alert } from 'react-bootstrap';
import { URL_BACK } from '../../data/Constantes';


class Pedido extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Usuario: JSON.parse(localStorage.getItem('user')), pe: [], setShowAlert: false, causa: 0 };
        this.pedidos = [];
        this.pagar = this.pagar.bind(this);
    }

    componentDidMount() {
        let p = JSON.parse(localStorage.getItem("pedidos"));
        this.setState({ pe: p });
        this.pedidos = p;
    }

    pagar() {

        if (this.state.Usuario != null) {
            this.pedidos.map((pedido) => {
                this.insertarPedido(pedido);
            });

            this.setState({ setShow: true, boton: true })
        } else {
            this.setState({ setShow: true, causa: 1 })
        }


    }

    async insertarPedido(pedido) {

        let p = {
            fecha: new Date().toISOString().slice(0, 10),
            precio: pedido.precio
        }

        let response = await fetch(URL_BACK + '/pedido/insertar?idRestaurante=' + pedido.idR + '&idUsuario=' + this.state.Usuario.id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(p)
        });
        if (response.ok) {
            let data = await response.json();
            pedido.id = data.id;
        } else {
            this.setState({ setShowAlert: true, causa: 1 })
        }

        pedido.lineasPedidos.map((l) => {
            this.insertarLineas(l, pedido.id);
        });
    }

    async insertarLineas(linea, idP) {

        let l = {
            unidades: linea.unidades,
        }

        let response = await fetch(URL_BACK + '/lineapedido/insertar?idPedido=' + idP + '&idProducto=' + linea.id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(l)
        });
        if (response.ok) {
        } else {
            this.setState({ setShowAlert: true, causa: 2 })
        }
    }

    quitar(x, y) {
        this.pedidos[x].precio = 0;
        if (this.pedidos[x].lineasPedidos[y].unidades === 1) {
            if (this.pedidos[x].lineasPedidos.length === 1) {
                this.pedidos.splice(x, 1);
            } else {
                this.pedidos[x].lineasPedidos.splice(y, 1);
                this.pedidos[x].lineasPedidos.map((l) => {
                    this.pedidos[x].precio += l.precio * l.unidades;
                });
            }
        } else {
            this.pedidos[x].lineasPedidos[y].unidades--;
            this.pedidos[x].lineasPedidos.map((l) => {
                this.pedidos[x].precio += l.precio * l.unidades;
            });
        }



        this.setState({ pe: this.pedidos });
        localStorage.setItem("pedidos", JSON.stringify(this.pedidos));
    }

    renderProducts() {
        return this.pedidos.map((item, x) => {
            return (
                <Row>
                    <Col xs={12} sm={9} lg={10} className="p-3 m-auto">
                        <h5>Pedido del restaurante: {item.idR} &nbsp; Precio total: {item.precio} €</h5>
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Unidades</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {item.lineasPedidos.map((l, y) => {
                                    return (
                                        <tr>
                                            <td>{l.nombre}</td>
                                            <td>{l.precio} €</td>
                                            <td>{l.unidades}</td>
                                            <td>{l.precio * l.unidades} €</td>
                                            <td className="d-grid gap-2">
                                                <Button disabled={this.state.boton} variant="outline-danger" onClick={() => this.quitar(x, y)}>
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



    alerta() {
        return (
            <Row>
                <Col className="p-3 m-auto">
                    <Alert show={this.state.setShowAlert} variant="danger" onClose={() => this.setState({ setShowAlert: false })} dismissible>
                        <Alert.Heading>Error crear el pedido.</Alert.Heading>
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
                return 'Error en el pedido.';
            case 2:
                return 'Error en las lineas de producto.';
            default:
                return 'Error.';
        }
    }

    modal() {
        if (this.state.causa === 1) {
            return (
                <Modal show={this.state.setShow} onHide={() => this.setState({ setShow: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Primero inicie sesion</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="primary" as={Link} to="/login">
                            Inciar Sesion
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        } else {
            return (
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
            )
        }

    }

    render() {

        if (localStorage.getItem("pedidos") == null || this.pedidos.length === 0) {
            return (
                <Container fluid className="p-3 m-auto shadow rounded">
                    <br />
                    <center>
                        <h1>No hay pedidos.</h1>
                    </center>
                    <br />
                </Container>
            );
        } else {
            return (
                <Container fluid className="p-3 m-auto shadow rounded">
                    {this.alerta()}
                    {this.renderProducts()}
                    <Row xs={12} sm={9} lg={10} className="p-3 m-auto">
                        <center>
                            <Button disabled={this.state.boton} size="lg" variant="outline-primary" onClick={this.pagar}>Pagar</Button>
                        </center>
                    </Row>
                    {this.modal()}
                </Container>
            );
        }
    }
}

export default Pedido;