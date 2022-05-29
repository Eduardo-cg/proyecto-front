import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Container, Image, Row, Col, Carousel, Card } from 'react-bootstrap';
import { ProductosEj } from '../../data/ProductoEJ';
import { Restaurantes } from '../../data/Restaurantes';
import uuid from 'react-uuid';

class Inicio extends React.Component {
    constructor(props) {
        super(props);
    }

    productosDestacados() {
        var filtrado = [ProductosEj[0], ProductosEj[1], ProductosEj[2]];

        return (
            <Row xs={3} className="p-3 m-auto shadow rounded">
                {filtrado.map((item) => {
                    return <Col>
                        <Card as={Link} to={"/restaurante/" + item.idR}>
                            <Card.Img variant="top" src={item.img} />
                            <Card.Body>
                                <Card.Title>{item.nombre}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                })}
            </Row>
        );
    }

    render() {
        return (
            <Container fluid="md">
                <Row className="rounded">
                    <Col xs={12}>
                        <Carousel variant="dark" >
                            {ProductosEj.map((item) => {
                                return (
                                    <Carousel.Item key={uuid()} as={Link} to={"/restaurante/" + item.idR}>
                                        <Image fluid src={item.img} key={uuid()} />
                                        <Carousel.Caption>
                                            <h3><Badge bg="primary" text="light">{item.nombre} - {item.precio}€</Badge></h3>
                                            <h5><Badge bg="secondary">{item.desc}</Badge></h5>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                );
                            })}
                        </Carousel>
                    </Col>
                </Row>
                <br />
                <h1>Destacados:</h1>
                {this.productosDestacados()}
                <br />
                <h1>Todos los Restaurantes:</h1>
                <Row xs={4} className="p-3 m-auto shadow rounded">
                    {Restaurantes.map((item) => {
                        return <Col as={Link} to={"/restaurante/" + item.id}>
                            <Image fluid src={item.img} key={uuid()} />
                        </Col>
                    })}
                </Row>
            </Container>
        );
    }
}

export default Inicio;