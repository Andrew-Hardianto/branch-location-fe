import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listCabang } from '../../actions/cabangActions';
import { createOutlet } from '../../actions/outletActions';

import Loader from '../../components/Loader';
import Message from '../../components/Message';

const initialState = {
    kode: '',
    nama: '',
    alamat: '',
    namaCabang: '',
    kodeCabang: ''
}

const OutletTambah = ({ history }) => {
    const [data, setData] = useState(initialState)

    const dispatch = useDispatch();

    const outletCreate = useSelector(state => state.outletCreate);
    const { loading, error, success } = outletCreate;

    const cabangList = useSelector(state => state.cabangList);
    const { cabang } = cabangList;

    useEffect(() => {
        dispatch(listCabang())
        if (success) {
            history.push('/location/outlet')
        }
    }, [history, success])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createOutlet(data))
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }}>
                <Card.Body>
                    <Card.Title>Tambah Outlet</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="id">
                            <Form.Label>Kode Outlet</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Outlet..."
                                name="kode"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="nama">
                            <Form.Label>Nama Outlet</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Outlet..."
                                name="nama"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="alamat">
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Alamat..."
                                as="textarea"
                                rows={3}
                                name="alamat"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="kodeCabang">
                            <Form.Label>Kode Cabang</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="kodeCabang"
                                onChange={handleChange}
                            >
                                <option value="">- Pilih Cabang -</option>
                                {cabang.map((data) => (
                                    <option value={data.kode} >{data.nama}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        {/* <Form.Group controlId="namaWilayah">
                            <Form.Label>Nama Wilayah</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Wilayah..."
                                name="namaWilayah"
                                value={wilayah.filter(prov => prov.kode.toString().includes(data.kodeWilayah.toString()))}
                                onChange={handleChange}
                            />
                        </Form.Group> */}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Link to={'/location/outlet'} className="btn btn-warning ml-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default OutletTambah
