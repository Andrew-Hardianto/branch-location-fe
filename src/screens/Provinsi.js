import React, { useEffect } from 'react';
import { Button, Card, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProvinsi } from '../actions/provinsiActions';

const Provinsi = () => {

    const dispatch = useDispatch();

    const provinsiList = useSelector(state => state.provinsiList);
    const { provinsi } = provinsiList;

    useEffect(() => {
        dispatch(listProvinsi())
    }, [dispatch])

    console.log(provinsi)

    return (
        <div className="home">
            <Container>
                <Row className="mb-3 ml-2">
                    <Button variant="primary">Tambah Provinsi</Button>
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
                                        <td>Otto</td>
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