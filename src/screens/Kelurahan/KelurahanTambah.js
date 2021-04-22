import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { createKelurahan } from '../../actions/kelurahanActions';
import { listKecamatan } from '../../actions/kecamatanActions';

const KelurahanTambah = ({ history }) => {
    const [id, setId] = useState('');
    const [nama, setNama] = useState('');
    const [kecamatanId, setKecamatanId] = useState('');

    const dispatch = useDispatch();

    const kelurahanCreate = useSelector(state => state.kelurahanCreate);
    const { loading, error, success } = kelurahanCreate;

    const kecamatanList = useSelector(state => state.kecamatanList);
    const { kecamatan } = kecamatanList;

    useEffect(() => {
        dispatch(listKecamatan())
        if (success) {
            history.push('/location/kecamatan')
        }
    }, [history, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createKelurahan(id, nama, kecamatanId))
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }}>
                <Card.Body>
                    <Card.Title>Tambah Kelurahan</Card.Title>
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
                            <Form.Label>Nama Kelurahan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Kelurahan..."
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="kecamatanId">
                            <Form.Label>Kecamatan</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="kecamatanId"
                                value={kecamatanId}
                                onChange={(e) => setKecamatanId(e.target.value)}
                            >
                                <option value="">- Pilih Kecamatan -</option>
                                {kecamatan.map((data) => (
                                    <option value={data.id} >{data.nama}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Link to={'/location/kelurahan'} className="btn btn-warning ml-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div >
    )
}

export default KelurahanTambah
