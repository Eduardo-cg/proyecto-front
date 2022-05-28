import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Container, Image, Row, Col, Carousel } from 'react-bootstrap';
import { ProductosEj } from '../../data/ProductoEJ';
import { Restaurantes } from '../../data/Restaurantes';
import uuid from 'react-uuid';

class Inicio extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Container>
                    <br />
                    <Row className="p-3 m-auto rounded">
                        <Col xs={12}>
                            <Carousel variant="dark" >
                                {ProductosEj.map((item) => {
                                    return (
                                        <Carousel.Item key={uuid()} as={Link} to={"/restaurante/" + item.idR}>
                                            <center>
                                                <img
                                                    height="500px"
                                                    className="d-block w-70"
                                                    src={item.img}
                                                    alt="First slide"
                                                />
                                            </center>
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
                    <Row className="p-3 m-auto shadow rounded">
                        <Col xs={4} as={Link} to={"/restaurante/" + Restaurantes[0].id}>
                            <Image fluid src={Restaurantes[0].img} key={uuid()} />
                        </Col>
                        <Col xs={4} as={Link} to={"/restaurante/" + Restaurantes[1].id}>
                            <Image fluid src={Restaurantes[1].img} key={uuid()} />
                        </Col>
                        <Col xs={4} as={Link} to={"/restaurante/" + Restaurantes[2].id}>
                            <Image fluid src={Restaurantes[2].img} key={uuid()} />
                        </Col>
                    </Row>
                </Container>
                <br />
            </div>
        );
    }
}

export default Inicio;