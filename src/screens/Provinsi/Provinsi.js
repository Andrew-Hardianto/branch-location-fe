import React, { useEffect } from 'react';
import { Button, Card, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

import { deleteProvinsi, listProvinsi } from '../../actions/provinsiActions';
import { PROVINSI_CREATE_RESET } from '../../constants/provinsiConstants';
import Loader from '../../components/Loader';

const Provinsi = () => {

    const dispatch = useDispatch();

    const provinsiList = useSelector(state => state.provinsiList);
    const { loading, error, provinsi } = provinsiList;

    const provinsiDelete = useSelector(state => state.provinsiDelete);
    const { loading: loadingDelete, error: errorDelete, success } = provinsiDelete;

    useEffect(() => {
        dispatch({ type: PROVINSI_CREATE_RESET })
        dispatch(listProvinsi())
    }, [dispatch, success])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteProvinsi(id))
        }
    }

    return (
        <div className="home">
            <Container>
                <Row className="mb-3 ml-2">
                    <Link to="/location/provinsi/tambah" className="btn btn-primary">Tambah Provinsi</Link>
                </Row>
                <Card lg="2" >
                    {loading ? <Loader />
                        : (
                            <Card.Body>
                                <Card.Title>Data Provinsi</Card.Title>
                                {loadingDelete && <Loader />}
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nama Provinsi</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {provinsi?.map((prov) => (
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
                                                    <Button variant="danger" className="btn-sm ml-2" onClick={() => deletehandler(prov.id)}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        )
                    }
                </Card>
            </Container>
        </div>
    )
}

export default Provinsi