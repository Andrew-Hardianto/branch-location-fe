import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { createKota } from '../../actions/kotaActions';
import { listProvinsi } from '../../actions/provinsiActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const KotaTambah = ({ history }) => {
    const [id, setId] = useState('');
    const [nama, setNama] = useState('');
    const [biCode, setBiCode] = useState('');
    const [antasenaCode, setAntasenaCode] = useState('');
    const [provinsiId, setProvinsiId] = useState('');

    const dispatch = useDispatch();

    const kotaCreate = useSelector(state => state.kotaCreate);
    const { loading, error, success } = kotaCreate;

    const provinsiList = useSelector(state => state.provinsiList);
    const { provinsi } = provinsiList;

    useEffect(() => {
        dispatch(listProvinsi())
        if (success) {
            history.push('/location/kota')
        }
    }, [history, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createKota(id, nama, biCode, antasenaCode, provinsiId))
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }}>
                <Card.Body>
                    <Card.Title>Tambah Kota</Card.Title>
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
                            <Form.Label>Nama Kota</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Provinsi..."
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="biCode">
                            <Form.Label>BI Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan BI Code..."
                                value={biCode}
                                onChange={(e) => setBiCode(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="antasenaCode">
                            <Form.Label>Antasena Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Antasena Code..."
                                value={antasenaCode}
                                onChange={(e) => setAntasenaCode(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="provinsiId">
                            <Form.Label>Provinsi</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="provinsiId"
                                value={provinsiId}
                                onChange={(e) => setProvinsiId(e.target.value)}
                            >
                                <option value="">- Pilih Provinsi -</option>
                                {provinsi.map((prov) => (
                                    <option value={prov.id} >{prov.nama}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Link to={'/location/kota'} className="btn btn-warning ml-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div >
    )
}

export default KotaTambah
