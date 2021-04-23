import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import Loader from '../../components/Loader';
import { deleteKelurahan, listKelurahan } from '../../actions/kelurahanActions';
import { KELURAHAN_CREATE_RESET } from '../../constants/kelurahanConstants';

const Kelurahan = () => {
    const dispatch = useDispatch();

    const kelurahanList = useSelector(state => state.kelurahanList);
    const { loading, error, kelurahan } = kelurahanList;

    const kelurahanDelete = useSelector(state => state.kelurahanDelete);
    const { loading: loadingDelete, error: errorDelete, success } = kelurahanDelete;

    useEffect(() => {
        dispatch({ type: KELURAHAN_CREATE_RESET })
        dispatch(listKelurahan())
    }, [dispatch, success])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteKelurahan(id))
        }
    }

    return (
        <div className="home">
            <Container>
                <Row className="mb-3 ml-2">
                    <Link to="/location/kelurahan/tambah" className="btn btn-primary">Tambah Kelurahan</Link>
                </Row>
                <Card lg="2" >
                    {loading ? <Loader />
                        : (
                            <Card.Body>
                                <Card.Title>Data Kelurahan</Card.Title>
                                {loadingDelete && <Loader />}
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nama Kelurahan</th>
                                            <th>ID Kecamatan</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kelurahan?.map((data) => (
                                            <tr key={data.id}>
                                                <td>{data.id}</td>
                                                <td>{data.nama}</td>
                                                <td>{data.kecamatanId}</td>
                                                <td>
                                                    <LinkContainer to={`/location/kelurahan/detail/${data.id}`}>
                                                        <Button variant="info" className="btn-sm">
                                                            <i className="fas fa-info"></i>
                                                        </Button>
                                                    </LinkContainer>
                                                    <LinkContainer to={`/location/kelurahan/edit/${data.id}`} className="ml-2">
                                                        <Button variant="success" className="btn-sm">
                                                            <i class="fas fa-edit"></i>
                                                        </Button>
                                                    </LinkContainer>
                                                    <Button
                                                        variant="danger"
                                                        className="btn-sm ml-2"
                                                        onClick={() => deletehandler(data.id)}
                                                    >
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

export default Kelurahan;
