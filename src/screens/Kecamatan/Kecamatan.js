import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import Loader from '../../components/Loader';
import { listKecamatan } from '../../actions/kecamatanActions';

const Kecamatan = () => {
    const dispatch = useDispatch();
    const kecamatanList = useSelector(state => state.kecamatanList);
    const { loading, error, kecamatan } = kecamatanList;

    useEffect(() => {
        dispatch(listKecamatan())
    }, [dispatch])

    return (
        <div className="home">
            <Container>
                <Row className="mb-3 ml-2">
                    <Link to="/location/kota/tambah" className="btn btn-primary">Tambah Kecamatan</Link>
                </Row>
                <Card lg="2" >
                    {loading ? <Loader />
                        : (
                            <Card.Body>
                                <Card.Title>Data Kecamatan</Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nama Kecamatan</th>
                                            <th>ID Kota</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kecamatan?.map((data) => (
                                            <tr key={data.id}>
                                                <td>{data.id}</td>
                                                <td>{data.nama}</td>
                                                <td>{data.kotaId}</td>
                                                <td>
                                                    <LinkContainer to={`/location/kecamatan/detail/${data.id}`}>
                                                        <Button variant="info" className="btn-sm">
                                                            <i className="fas fa-info"></i>
                                                        </Button>
                                                    </LinkContainer>
                                                    <LinkContainer to={`/location/kecamatan/edit/${data.id}`} className="ml-2">
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

export default Kecamatan