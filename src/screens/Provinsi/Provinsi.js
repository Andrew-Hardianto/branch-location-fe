import React, { useEffect } from 'react';
import { Button, Card, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

import { listProvinsi } from '../../actions/provinsiActions';

const Provinsi = () => {

    const dispatch = useDispatch();

    const provinsiList = useSelector(state => state.provinsiList);
    const { provinsi } = provinsiList;

    useEffect(() => {
        dispatch(listProvinsi())
    }, [dispatch])

    return (
        <div className="home">
            <Container>
                <Row className="mb-3 ml-2">
                    <Link to="/location/provinsi/tambah" className="btn btn-primary">Tambah Provinsi</Link>
                </Row>
                <Card lg="2" >
                    <Card.Body>
                        <Card.Title>Data Provinsi</Card.Title>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nama Provinsi</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {provinsi.map((prov) => (
                                    <tr key={prov.id}>
                                        <td>{prov.id}</td>
                                        <td>{prov.nama}</td>
                                        <td>
                                            <LinkContainer to={`/location/provinsi/detail/${prov.id}`}>
                                                <Button variant="info" className="btn-sm">
                                                    <i className="fas fa-info"></i>
                                                </Button>
                                            </LinkContainer>
                                            <LinkContainer to={`/location/provinsi/edit/${prov.id}`} className="ml-2">
                                                <Button variant="success" className="btn-sm">
                                                    <i class="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant="danger" className="btn-sm ml-2">
                                                <i className="fas fa-trash-alt"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default Provinsi