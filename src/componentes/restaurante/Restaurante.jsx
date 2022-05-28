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
            productos: null,
        };
        this.pedido = null;
        this.pedidos = null;
        this.pedir = this.pedir.bind(this);
    }

    pedir = (item) => {
        this.pedidos = JSON.parse(localStorage.getItem("pedidos"));
        if (this.pedidos == null) {
            this.pedidos = [];
        }
        console.log(this.pedidos);
        console.log(JSON.parse(JSON.stringify(this.pedidos)));
        if (this.pedido == null) {
            this.pedido = {
                id: 0,
                idR: this.state.id,
                fecha: '2000-02-01',
                precio: '20',
                lineas: []
            };
        }
        this.pedido.lineas.push(item);
        this.setState({ setShow: true })

        console.log(this.pedido);
        console.log(JSON.parse(JSON.stringify(this.pedido)));
    }

    componentWillUnmount() {
        if (this.pedido != null) {
            console.log(this.pedido);
            console.log(JSON.parse(JSON.stringify(this.pedido)));

            this.pedidos.push(this.pedido)
            console.log(this.pedidos);
            console.log(JSON.parse(JSON.stringify(this.pedidos)));

            localStorage.setItem("pedidos", JSON.stringify(this.pedidos))
            console.log(JSON.parse(localStorage.getItem("pedidos")));
        }
    }


    componentDidMount() {
        this.setState({
            id: Restaurantes[this.props.id].id,
            nombre: Restaurantes[this.props.id].name,
            img: Restaurantes[this.props.id].img
        })
    }

    todosProductos() {
        return (
            <Accordion flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header> <h3>Todos los Productos</h3></Accordion.Header>
                    <Accordion.Body>
                        <Row xs={1} md={4} className="g-4">
                            {ProductosEj.map((item) => {
                                if (item.idR === this.state.id) {
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
                                }
                            })}
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    }

    render() {
        return (
            <div>
                <br />
                <Container className="p-3 m-auto shadow rounded">
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
                        </Tab>
                        <Tab eventKey="productos" title="Productos">
                            <br />
                            {this.todosProductos()}
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
                <br />
            </div>
        );
    }
}

export default Restaurante;