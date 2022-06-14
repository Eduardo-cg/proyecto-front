import React from "react";
import { Container, Row, Button, Col, Form, FormControl, Image, Alert } from 'react-bootstrap';
import uuid from 'react-uuid';
import { URL_BACK } from '../../data/Constantes';

class Administracion extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Restaurantes: [], Restaurante: { productos: [] }, editar: false, setShow: false };

        this.actualizar = this.actualizar.bind(this);
        this.lista = [];
        this.selectValue = React.createRef();
        this.inputSearch = React.createRef();

        this.url = React.createRef();
        this.nombre = React.createRef();
        this.precio = React.createRef();
        this.categoria = React.createRef();
        this.desc = React.createRef();

    }

    buscar() {
        var lowerCase = this.inputSearch.current.value.toLowerCase();
        if (lowerCase !== '') {
            var filtrado = this.lista.filter((e) => {
                return e.nombre.toLowerCase().includes(lowerCase)
            });
            this.setState({ Restaurantes: filtrado });
        } else {
            this.setState({ Restaurantes: this.lista });
        };

    };

    async actualizar() {
        if (this.selectValue.current.value != 0) {
            let response = await fetch(URL_BACK + '/restaurante/?id=' + this.selectValue.current.value);
            let data = await response.json();
            console.log(data);
            this.setState({ Restaurante: data });
        }
    }

    async componentDidMount() {
        let response = await fetch(URL_BACK + '/restaurante/listar');
        let data = await response.json();
        this.lista = data;
        this.setState({ Restaurantes: this.lista });
    }

    async quitarProducto(id) {
        let response = await fetch(URL_BACK + '/producto/borrar/?id=' + id, {
            method: 'DELETE'
        });
        let data = await response.json();
        console.log(data);
    }

    async insertar() {

        if (this.nombre.current.value === "" || this.precio.current.value === "" || this.url.current.value === "" || this.desc.current.value === "" || this.categoria.current.value === "") {
            this.setState({ setShow: true, causa: 1 })
        } else {
            let p = {
                nombre: this.nombre.current.value,
                precio: this.precio.current.value,
                imagen: this.url.current.value,
                descripcion: this.desc.current.value,
                categoria: this.categoria.current.value
            };

            console.log(p);

            let response = await fetch(URL_BACK + '/producto/insertar/?idRestaurante=' + this.state.Restaurante.id, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(p)
            });

            if (response.ok) {
                let data = await response.json();
                console.log(data);
            } else {
                this.setState({ setShow: true, causa: 2 })
            }

        }
    }

    add() {
        if (this.state.editar === false) {
            return (
                <Row>
                    <center>
                        <Button size='lg' variant="outline-primary" type="button" onClick={() => this.setState({ editar: !this.state.editar })} >
                            Añadir
                        </Button>
                    </center>
                </Row>
            );
        } else {
            return (
                <Row className="border rounded border-primary p-3">
                    <Col className="p-2 m-auto" sm={12} md={6} lg={2}>
                        <Form.Control type="url" placeholder="URL de la imagen" ref={this.url} />
                    </Col>
                    <Col className="p-2 m-auto" sm={12} md={6} lg={2}>
                        <Form.Control type="text" placeholder="Nombre" ref={this.nombre} />
                    </Col>
                    <Col className="p-2 m-auto" sm={12} md={6} lg={2}>
                        <Form.Control type="number" placeholder="Precio" ref={this.precio} />
                    </Col>
                    <Col className="p-2 m-auto" sm={12} md={6} lg={2}>
                        <Form.Select ref={this.categoria}>
                            <option key={uuid()} value={"Comida"}>Comida</option>
                            <option key={uuid()} value={"Bebida"}>Bebida</option>
                            <option key={uuid()} value={"Otro"}>Otro</option>
                        </Form.Select>
                    </Col>
                    <Col className="p-2 m-auto" sm={12} lg={2}>
                        <Form.Control as="textarea" rows={3} placeholder="Descripcion" ref={this.desc} />
                    </Col>
                    <Col className="p-2 m-auto d-grid gap-2" xs={6}>
                        <Button variant="outline-secondary" onClick={() => this.insertar()}>
                            Añadir
                        </Button>
                    </Col>
                    <Col className="p-2 m-auto d-grid gap-2" xs={6}>
                        <Button variant="outline-danger" onClick={() => this.setState({ editar: !this.state.editar })}>
                            Cancelar
                        </Button>
                    </Col>
                </Row>
            );
        }

    }

    textoError() {
        switch (this.state.causa) {
            case 1:
                return 'Introduce todos los campos.';
            case 2:
                return 'Error al crear el producto.';
            default:
                return 'Error.';
        }
    }

    alerta() {
        return (
            <Row>
                <Col xs={12} className="p-3 m-auto">
                    <Alert show={this.state.setShow} variant="danger" onClose={() => this.setState({ setShow: false })} dismissible>
                        <Alert.Heading>Error al crear usuario.</Alert.Heading>
                        <p>
                            {this.textoError()}
                        </p>
                    </Alert>
                </Col>
            </Row>
        )
    }

    render() {
        return (
            <Container fluid>
                <br />
                <Row>
                    <Col xs={12} sm={9} lg={10} className="p-3 m-auto">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            ref={this.inputSearch}
                        />
                    </Col>
                    <Col className="p-3 m-auto d-grid gap-2">
                        <Button variant="outline-primary" onClick={() => this.buscar()}>Filtrar</Button>
                    </Col>
                    <Col xs={12} sm={8} lg={10} className="p-3 m-auto">
                        <Form.Select ref={this.selectValue}>
                            <option key={uuid()} value={0} />
                            {this.state.Restaurantes.map((item) => {
                                return <option key={uuid()} value={item.id} >
                                    Restaurante: {item.id} / {item.nombre}</option>
                            })}
                        </Form.Select>
                    </Col>
                    <Col className="p-3 m-auto d-grid gap-2">
                        <Button variant="outline-primary" onClick={this.actualizar}>Seleccionar</Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="p-3 m-auto">
                        <b>Restaurante: {this.state.Restaurante.id}</b>
                        <br />
                        <br />
                        {this.state.Restaurante.productos.map((item) => {
                            return (
                                <Row className="border rounded border-primary p-3">
                                    <Col xs={12} sm={3}>
                                        <Image src={item.imagen} fluid />
                                    </Col>
                                    <Col className="p-2 m-auto" xs={12} sm={3}>
                                        <Form.Control type="text" defaultValue={item.nombre} ref={this.inputNum} />
                                    </Col>
                                    <Col className="p-2 m-auto" xs={12} sm={3}>
                                        <Form.Control type="number" defaultValue={item.precio} ref={this.inputNum} />
                                    </Col>
                                    <Col className="p-2 m-auto" xs={12} sm={3}>
                                        <Form.Control as="textarea" rows={3} defaultValue={item.descripcion} ref={this.inputNum} />
                                    </Col>
                                    {/* 
                                    <Col className="p-2 m-auto d-grid gap-2" xs={12} sm={6} md={2}>
                                        <Button variant="outline-secondary" onClick={() => this.editar(item)}>
                                            Editar
                                        </Button>
                                    </Col>                            
                                    */}
                                    <Col className="p-2 m-auto d-grid gap-2" xs={12}>
                                        <Button variant="outline-danger" onClick={() => this.quitarProducto(item.id)}>
                                            Quitar
                                        </Button>
                                    </Col>
                                </Row>
                            );
                        })}

                    </Col>
                </Row>
                {this.alerta()}
                {this.add()}
            </Container>
        );
    }
}
export default Administracion;