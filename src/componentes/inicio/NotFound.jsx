import React from "react";
import { Container } from 'react-bootstrap';


class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container className="p-3 m-auto shadow rounded">
                <br />
                <center>
                    <h1>No hay nada.</h1>
                </center>
                <br />
            </Container>
        );
    }
}
export default NotFound;