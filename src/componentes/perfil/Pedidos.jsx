import React from "react";
import { Table, Container, Row, Button, Col, Form } from 'react-bootstrap';
import uuid from 'react-uuid';
import { PedidosEj } from "../../data/PedidosEj";

class Pedidos extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Pedido: PedidosEj[0] };
        this.selectValue = React.createRef();
        this.actualizar = this.actualizar.bind(this);

    }

    actualizar() {
        if (this.selectValue.current.value !== '') {
            this.setState({ Pedido: PedidosEj[this.selectValue.current.value] });
        }
    }

    render() {
        return (
            <div>
                <br />
                <Container>
                    <Row>
                        <Col xs={8} md={10} className="p-3 m-auto">
                            <Form.Select aria-label="Default select example" ref={this.selectValue}>
                                <option/>
                                {PedidosEj.map((item) => {
                                    return <option key={uuid()} value={item.id} >
                                        Pedido: {item.id}/{item.fecha}</option>
                                })}
                            </Form.Select>
                        </Col>
                        <Col xs={4} md={2} className="p-3 m-auto">
                            <center>
                                <Button size="lg" variant="outline-primary" onClick={this.actualizar}>Seleccionar</Button>
                            </center>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="p-3 m-auto">
                            <b>Id: {this.state.Pedido.id} Restaurante: {this.state.Pedido.idR} Fecha: {this.state.Pedido.fecha} Precio: {this.state.Pedido.precio}</b>
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
                                    {this.state.Pedido.lineas.map((item) => {
                                        return (
                                            <tr>
                                                <td>{item.nombre}</td>
                                                <td>{item.precio}</td>
                                                <td>{item.unidades}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Pedidos;