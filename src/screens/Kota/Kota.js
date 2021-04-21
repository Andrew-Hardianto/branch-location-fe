import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import Loader from '../../components/Loader';
import { listKota } from '../../actions/kotaActions';

const Kota = () => {
    const dispatch = useDispatch();
    const kotaList = useSelector(state => state.kotaList);
    const { loading, error, kota } = kotaList;

    useEffect(() => {
        dispatch(listKota())
    }, [dispatch])

    return (
        <div className="home">
            <Container>
                <Row className="mb-3 ml-2">
                    <Link to="/location/kota/tambah" className="btn btn-primary">Tambah Kota</Link>
                </Row>
                <Card lg="2" >
                    {loading ? <Loader />
                        : (
                            <Card.Body>
                                <Card.Title>Data Kota</Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nama Kota</th>
                                            <th>ID Provinsi</th>
                                            <th>BI Code</th>
                                            <th>Antasena Code</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kota?.map((data) => (
                                            <tr key={data.id}>
                                                <td>{data.id}</td>
                                                <td>{data.nama}</td>
                                                <td>{data.provinsiId}</td>
                                                <td>{data.biCode}</td>
                                                <td>{data.antasenaCode}</td>
                                                <td>
                                                    <LinkContainer to={`/location/kota/detail/${data.id}`}>
                                                        <Button variant="info" className="btn-sm">
                                                            <i className="fas fa-info"></i>
                                                        </Button>
                                                    </LinkContainer>
                                                    <LinkContainer to={`/location/kota/edit/${data.id}`} className="ml-2">
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
                        )}
                </Card>
            </Container>
        </div>
    )
}

export default Kota
