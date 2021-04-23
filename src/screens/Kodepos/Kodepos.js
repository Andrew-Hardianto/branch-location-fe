import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import Loader from '../../components/Loader';
import { deleteKodepos, listKodepos } from '../../actions/kodeposActions';
import { KODEPOS_CREATE_RESET } from '../../constants/kodeposConstants';

const Kodepos = () => {
    const dispatch = useDispatch();

    const kodeposList = useSelector(state => state.kodeposList);
    const { loading, error, kodepos } = kodeposList;

    const kelurahanDelete = useSelector(state => state.kelurahanDelete);
    const { loading: loadingDelete, error: errorDelete, success } = kelurahanDelete;

    useEffect(() => {
        dispatch({ type: KODEPOS_CREATE_RESET })
        dispatch(listKodepos())
    }, [dispatch, success])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteKodepos(id))
        }
    }

    return (
        <div className="home">
            <Container>
                <Row className="mb-3 ml-2">
                    <Link to="/location/kodepos/tambah" className="btn btn-primary">Tambah Kode POS</Link>
                </Row>
                <Card lg="2" >
                    {loading ? <Loader />
                        : (
                            <Card.Body>
                                <Card.Title>Data Kode POS</Card.Title>
                                {loadingDelete && <Loader />}
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Kode POS</th>
                                            <th>ID Kelurahan</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kodepos?.map((data) => (
                                            <tr key={data.id}>
                                                <td>{data.kode}</td>
                                                <td>{data.kelurahanId}</td>
                                                <td>
                                                    <LinkContainer to={`/location/kodepos/detail/${data.id}`}>
                                                        <Button variant="info" className="btn-sm">
                                                            <i className="fas fa-info"></i>
                                                        </Button>
                                                    </LinkContainer>
                                                    <LinkContainer to={`/location/kodepos/edit/${data.id}`} className="ml-2">
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

export default Kodepos
