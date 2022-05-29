import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Restaurante from './Restaurante';
import uuid from 'react-uuid';

function R() {
    const { id } = useParams();

    return (
        <Container fluid="md" className="p-3 m-auto shadow rounded">
            <Restaurante key={uuid()} id={id} />
        </Container>
    );

}

export default R;