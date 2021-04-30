import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { createCabang } from '../../actions/cabangActions';
import { listWilayah } from '../../actions/wilayahActions';

const initialState = {
    kode: '',
    nama: '',
    alamat: '',
    namaWilayah: '',
    kodeWilayah: ''
}

const CabangTambah = ({ history }) => {
    const [data, setData] = useState(initialState)

    const dispatch = useDispatch();

    const cabangCreate = useSelector(state => state.cabangCreate);
    const { loading, error, success } = cabangCreate;

    const wilayahList = useSelector(state => state.wilayahList);
    const { wilayah } = wilayahList;

    useEffect(() => {
        dispatch(listWilayah())
        if (success) {
            history.push('/location/branch')
        }
    }, [history, success])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createCabang(data))
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }}>
                <Card.Body>
                    <Card.Title>Tambah Branch</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="id">
                            <Form.Label>Kode Cabang</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Cabang..."
                                name="kode"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="nama">
                            <Form.Label>Nama Cabang</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Cabang..."
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
                        <Form.Group controlId="kodeWilayah">
                            <Form.Label>Kode Wilayah</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="kodeWilayah"
                                onChange={handleChange}
                            >
                                <option value="">- Pilih Wilayah -</option>
                                {wilayah.map((data) => (
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
                        <Link to={'/location/kota'} className="btn btn-warning ml-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CabangTambah
