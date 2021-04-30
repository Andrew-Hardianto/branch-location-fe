import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { detailCabang, editCabang } from '../../actions/cabangActions';
import { CABANG_UPDATE_RESET } from '../../constants/cabangConstants';
import { listWilayah } from '../../actions/wilayahActions';

const initialState = {
    kode: '',
    nama: '',
    alamat: '',
    status: '',
    namaWilayah: '',
    kodeWilayah: ''
}

const CabangEdit = ({ history, match }) => {
    const cabangId = match.params.id;

    const [data, setData] = useState(initialState);

    const dispatch = useDispatch();

    const cabangDetail = useSelector(state => state.cabangDetail);
    const { cabang } = cabangDetail;

    const cabangUpdate = useSelector(state => state.cabangUpdate);
    const { loading, error, success } = cabangUpdate;

    const wilayahList = useSelector(state => state.wilayahList);
    const { wilayah } = wilayahList;

    useEffect(() => {
        dispatch(listWilayah())
        if (success) {
            dispatch({ type: CABANG_UPDATE_RESET })
            history.push('/location/branch')
        } else {
            if (!cabang.cabang?.nama || cabang.cabang?.kode !== cabangId) {
                dispatch(detailCabang(cabangId));
            }
            setData(cabang.cabang)
        }
    }, [dispatch, history, cabangId, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editCabang({ ...data }))
    }


    return (
        <div className="home">
            <Card style={{ width: '25rem' }}>
                <Card.Body>
                    <Card.Title>Edit Branch</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        {/* <Form.Group controlId="id">
                            <Form.Label>Kode Cabang</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Cabang..."
                                name="kode"
                                value={dat}
                                onChange={handleChange}
                            />
                        </Form.Group> */}

                        <Form.Group controlId="nama">
                            <Form.Label>Nama Cabang</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Cabang..."
                                name="nama"
                                value={data.nama}
                                onChange={(e) => setData({ ...data, nama: e.target.value })}
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
                                value={data.alamat}
                                onChange={(e) => setData({ ...data, alamat: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="kodeWilayah">
                            <Form.Label>Kode Wilayah</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="kodeWilayah"
                                value={data.kodeWilayah}
                                onChange={(e) => setData({ ...data, kodeWilayah: e.target.value })}
                            >
                                <option value="">- Pilih Wilayah -</option>
                                {wilayah.map((data) => (
                                    <option value={data.kode} >{data.nama}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="status"
                                value={data.status}
                                onChange={(e) => setData({ ...data, status: e.target.value })}
                            >
                                <option value="">- Pilih Status -</option>
                                <option value="Aktif" >Aktif</option>
                                <option value="Tidak Aktif" >Tidak Aktif</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Link to={'/location/branch'} className="btn btn-warning ml-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CabangEdit
