import React from 'react';
import { Badge, Container, Table, Row, Col, Carousel } from 'react-bootstrap';
import { ProductosEj } from '../../data/ProductoEJ';
import uuid from 'react-uuid';

class Inicio extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Id: null };
    }

    render() {
        return (
            <Container>
                <Row>
                    <Carousel variant="dark" >
                        {ProductosEj.map((item) => {
                            return (
                                <Carousel.Item key={uuid()}>
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
                </Row>
            </Container>
        );
    }
}

export default Inicio;