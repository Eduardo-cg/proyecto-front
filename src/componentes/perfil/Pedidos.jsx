import React from "react";
import { Table, Container, Row, Button, Col, Form } from 'react-bootstrap';
import uuid from 'react-uuid';
import { URL_BACK } from '../../data/Constantes';

class Pedidos extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Usuario: JSON.parse(localStorage.getItem('user')), Pedido: { lineasPedidos: [] }, Pedidos: [] };
        this.Pedidos = [];
        this.selectValue = React.createRef();
        this.actualizar = this.actualizar.bind(this);

    }

    async actualizar() {
        if (this.selectValue.current.value != 0) {
            let response = await fetch(URL_BACK + '/pedido/?id=' + this.selectValue.current.value);
            let data = await response.json();
            this.setState({ Pedido: data });
        }

    }

    async componentDidMount() {
        let response = await fetch(URL_BACK + '/pedido/listar/?idUsuario=' + this.state.Usuario.id);
        let data = await response.json();
        this.Pedidos = data;
        this.setState({ Pedidos: data });
    }

    render() {
        return (
            <Container fluid>
                <br />
                <Row>
                    <Col xs={12} sm={9} lg={10} className="p-3 m-auto">
                        <Form.Select aria-label="Default select example" ref={this.selectValue}>
                            <option key={uuid()} value={0}/>
                            {this.Pedidos.map((item) => {
                                return <option key={uuid()} value={item.id} >
                                    Pedido: {item.id}/{item.fecha}</option>
                            })}
                        </Form.Select>
                    </Col>
                    <Col className="p-3 m-auto d-grid gap-2">
                        <Button variant="outline-primary" onClick={this.actualizar}>Seleccionar</Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="p-3 m-auto">
                        <b>Id: {this.state.Pedido.id} Restaurante: {this.state.Pedido.idR} Fecha: {this.state.Pedido.fecha} Precio: {this.state.Pedido.precio}</b>
                        <br />
                        <br />
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Unidades</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.Pedido.lineasPedidos.map((item) => {
                                    return (
                                        <tr>
                                            <td>{item.producto.nombre}</td>
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
        );
    }
}
export default Pedidos;