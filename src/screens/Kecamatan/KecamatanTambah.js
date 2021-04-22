import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { createKecamatan } from '../../actions/kecamatanActions';
import { listKota } from '../../actions/kotaActions';

const KecamatanTambah = ({ history }) => {
    const [id, setId] = useState('');
    const [nama, setNama] = useState('');
    const [kotaId, setKotaId] = useState('');

    const dispatch = useDispatch();

    const kecamatanCreate = useSelector(state => state.kecamatanCreate);
    const { loading, error, success } = kecamatanCreate;

    const kotaList = useSelector(state => state.kotaList);
    const { kota } = kotaList;

    useEffect(() => {
        dispatch(listKota())
        if (success) {
            history.push('/location/kecamatan')
        }
    }, [dispatch, history, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createKecamatan(id, nama, kotaId))
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }}>
                <Card.Body>
                    <Card.Title>Tambah Kecamatan</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="id">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan ID..."
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="nama">
                            <Form.Label>Nama Kecamatan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Kecamatan..."
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="kotaId">
                            <Form.Label>Kota</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="kotaId"
                                value={kotaId}
                                onChange={(e) => setKotaId(e.target.value)}
                            >
                                <option value="">- Pilih Kota -</option>
                                {kota.map((data) => (
                                    <option value={data.id} >{data.nama}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Link to={'/location/kecamatan'} className="btn btn-warning ml-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div >
    )
}

export default KecamatanTambah
