import React from 'react';
import { Container, Card, Image, Row, Col, Button, Accordion, Modal, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { URL_BACK } from '../../data/Constantes';


class Restaurante extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Usuario: JSON.parse(localStorage.getItem('user')),
            restaurante: [],
            productos: [],
            categorias: [],
        };

        this.pedido = {
            id: 0,
            idR: this.props.id,
            precio: 0,
            lineasPedidos: []
        };;
        this.pedidos = null;
    }

    crearPedido() {
        this.pedidos = JSON.parse(localStorage.getItem("pedidos"));
        if (this.pedidos === null) {
            this.pedidos = [];
        } else {
            this.pedidos.map((e, i) => {
                if (e.idR === this.props.id) {
                    this.pedido = this.pedidos[i];
                    this.pedidos.splice(i, 1);
                }
            });
        }
    }

    crearLinea(item) {

        let linea = {
            id: item.id,
            nombre: item.nombre,
            unidades: 1,
            precio: item.precio
        }

        if (this.pedido.lineasPedidos.length === 0) {
            this.pedido.lineasPedidos.push(linea);
        } else {
            let a = false;
            this.pedido.lineasPedidos.map((l) => {
                if (l.id == item.id) {
                    l.unidades++;
                    a = true;
                }
            });
            if (!a) {
                this.pedido.lineasPedidos.push(linea);
            }
        }
    }

    pedir = (item) => {
        this.crearPedido();
        this.crearLinea(item);
        this.pedido.precio = 0;
        this.pedido.lineasPedidos.map((l) => {
            this.pedido.precio += l.precio * l.unidades;
        });
        this.pedidos.push(this.pedido);
        localStorage.setItem("pedidos", JSON.stringify(this.pedidos));
        this.setState({ setShow: true });
    }

    async componentDidMount() {
        let response = await fetch(URL_BACK + '/restaurante/?id=' + this.props.id);
        let data = await response.json();
        this.setState({ restaurante: data });
        this.setState({
            productos: data.productos,
            categorias: ["Comida", "Bebida"]
        });
    }

    todosProductos() {
        return (
            <Accordion flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header> <h3>Todos los Productos</h3></Accordion.Header>
                    <Accordion.Body>
                        <Row xs={1} sm={2} lg={4} className="g-4">
                            {this.state.productos.map((item) => {
                                return (
                                    <Col>
                                        <Card>
                                            <Card.Img variant="top" src={item.imagen} />
                                            <Card.Body>
                                                <Card.Title>{item.nombre}</Card.Title>
                                                <Card.Text>
                                                    {item.descripcion}
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Row>
                                                    <Col>
                                                        <center>
                                                            <h4 >
                                                                {item.precio}???
                                                            </h4>
                                                        </center>
                                                    </Col>
                                                    <Col xs={7} md={8} className=" d-grid">
                                                        <Button variant="primary" onClick={() => this.pedir(item)}>Pedir</Button>
                                                    </Col>
                                                </Row>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    }

    categorias() {
        return this.state.categorias.map((item) => {

            var filtrado = this.state.productos.filter((e) => {
                return e.categoria.toLowerCase() === item.toLowerCase();
            });

            return (
                <Accordion flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header> <h3>{item}</h3></Accordion.Header>
                        <Accordion.Body>
                            <Row xs={1} sm={2} lg={4} className="g-4">
                                {filtrado.map((item) => {
                                    return (
                                        <Col>
                                            <Card>
                                                <Card.Img variant="top" src={item.imagen} />
                                                <Card.Body>
                                                    <Card.Title>{item.nombre}</Card.Title>
                                                    <Card.Text>
                                                        {item.descripcion}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <Row>
                                                        <Col>
                                                            <center>
                                                                <h4 >
                                                                    {item.precio}???
                                                                </h4>
                                                            </center>
                                                        </Col>
                                                        <Col xs={7} md={8} className=" d-grid">
                                                            <Button variant="primary" onClick={() => this.pedir(item)}>Pedir</Button>
                                                        </Col>
                                                    </Row>
                                                </Card.Footer>
                                            </Card>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            );
        })

    }

    render() {
        return (
            <Container fluid>

                <h1>
                    <Image
                        src={this.state.restaurante.imagen}
                        height="100px">
                    </Image>{this.state.restaurante.nombre}
                </h1>
                <Tabs defaultActiveKey="productos" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="productos" title="Productos">
                        <br />
                        {this.categorias()}
                        {this.todosProductos()}
                    </Tab>
                    <Tab eventKey="info" title="Informacion">
                        <br />
                        <p>{this.state.restaurante.descripcion}</p>
                        <h6>Direccion: </h6>
                        <p>{this.state.restaurante.direccion}</p>
                        <h6>Horario: </h6>
                        <p>{this.state.restaurante.horario}</p>
                        <h6>Telefono: </h6>
                        <p>{this.state.restaurante.telefono}</p>
                    </Tab>
                </Tabs>
                <br />
                <Modal show={this.state.setShow} onHide={() => this.setState({ setShow: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Producto a??adido</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Ahora puedes seguir a??adiendo productos al pedido o ver el pedido.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ setShow: false })}>
                            Seguir A??adiendo
                        </Button>
                        <Button variant="primary" as={Link} to="/pedido">
                            Ver Pedido
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container >
        );
    }
}

export default Restaurante;