import React from 'react';
import { Container, Card, Image, Row, Col, Button, Accordion, Modal, Tabs, Tab } from 'react-bootstrap';
import { Restaurantes } from '../../data/Restaurantes';
import { ProductosEj } from '../../data/ProductoEJ';
import { Link } from 'react-router-dom';


class Restaurante extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            nombre: null,
            img: null,
            productos: [],
            categorias: [],
        };
        this.pedido = null;
        this.pedidos = null;
        this.pedir = this.pedir.bind(this);
    }

    pedir = (item) => {
        this.pedidos = JSON.parse(localStorage.getItem("pedidos"));
        if (this.pedidos == null) {
            this.pedidos = [];
        };
        if (this.pedido == null) {
            this.pedido = {
                id: 0,
                idR: this.state.id,
                fecha: '2000-02-01',
                precio: '20',
                lineas: []
            };
        };

        if (this.pedido.lineas.length === 0) {
            item.unidades = 1;
            this.pedido.lineas.push(item);
        } else {
            if (this.pedido.lineas.includes(item)) {
                this.pedido.lineas.map((linea) => {
                    if (linea === item) {
                        console.log(linea.unidades)
                        linea.unidades++;
                        console.log(linea)
                        console.log(linea.unidades)
                    }
                });
            } else {
                item.unidades = 1;
                this.pedido.lineas.push(item);
            }
        };

        this.setState({ setShow: true });
    }

    componentWillUnmount() {
        if (this.pedido != null) {
            this.pedidos.push(this.pedido);
            localStorage.setItem("pedidos", JSON.stringify(this.pedidos));
        };
    }

    componentDidMount() {
        var filtrado = ProductosEj.filter((e) => {
            return e.idR == this.props.id
        });

        this.setState({
            id: Restaurantes[this.props.id].id,
            nombre: Restaurantes[this.props.id].name,
            img: Restaurantes[this.props.id].img,
            productos: filtrado,
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
                                            <Card.Img variant="top" src={item.img} />
                                            <Card.Body>
                                                <Card.Title>{item.nombre}</Card.Title>
                                                <Card.Text>
                                                    {item.desc}
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Row>
                                                    <Col>
                                                        <center>
                                                            <h4 >
                                                                {item.precio}€
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
                                                <Card.Img variant="top" src={item.img} />
                                                <Card.Body>
                                                    <Card.Title>{item.nombre}</Card.Title>
                                                    <Card.Text>
                                                        {item.desc}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <Row>
                                                        <Col>
                                                            <center>
                                                                <h4 >
                                                                    {item.precio}€
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
                        src={this.state.img}
                        height="100px">
                    </Image>{this.state.nombre}
                </h1>
                <Tabs defaultActiveKey="inicio" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="inicio" title="Inicio">
                        <br />
                        <h1>Informacion</h1>
                        {this.todosProductos()}
                    </Tab>
                    <Tab eventKey="productos" title="Productos">
                        <br />
                        {this.categorias()}
                    </Tab>
                    <Tab eventKey="contacto" title="Contacto">
                        <br />
                        <h1>Informacion</h1>
                    </Tab>
                </Tabs>
                <br />
                <Modal show={this.state.setShow} onHide={() => this.setState({ setShow: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Producto añadido</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Ahora puedes seguir añadiendo productos al pedido o ver el pedido.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ setShow: false })}>
                            Seguir Añadiendo
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