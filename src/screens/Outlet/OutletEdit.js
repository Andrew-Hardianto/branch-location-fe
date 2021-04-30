import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { OUTLET_UPDATE_RESET } from '../../constants/outletConstants';
import { detailOutlet, editOutlet } from '../../actions/outletActions';
import { listCabang } from '../../actions/cabangActions';

const initialState = {
    kode: '',
    nama: '',
    alamat: '',
    status: '',
    namaCabang: '',
    kodeCabang: ''
}

const OutletEdit = ({ history, match }) => {
    const outletId = match.params.id;

    const [data, setData] = useState(initialState);

    const dispatch = useDispatch();

    const outletDetail = useSelector(state => state.outletDetail);
    const { outlet } = outletDetail;

    const outletUpdate = useSelector(state => state.outletUpdate);
    const { loading, error, success } = outletUpdate;

    const cabangList = useSelector(state => state.cabangList);
    const { cabang } = cabangList;

    useEffect(() => {
        dispatch(listCabang())
        if (success) {
            dispatch({ type: OUTLET_UPDATE_RESET })
            history.push('/location/outlet')
        } else {
            if (!outlet.outlet?.nama || outlet.outlet?.kode !== outletId) {
                dispatch(detailOutlet(outletId));
            }
            setData(outlet.outlet)
        }
    }, [dispatch, history, outletId, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editOutlet({ ...data }))
    }
    console.log(data)

    return (
        <div className="home">
            <Card style={{ width: '25rem' }}>
                <Card.Body>
                    <Card.Title>Edit Outlet</Card.Title>
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
                            <Form.Label>Nama Outlet</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Outlet..."
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
                        <Form.Group controlId="kodeCabang">
                            <Form.Label>Kode Cabang</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="kodeCabang"
                                value={data.kodeCabang}
                                onChange={(e) => setData({ ...data, kodeCabang: e.target.value })}
                            >
                                <option value="">- Pilih Cabang -</option>
                                {cabang.map((data) => (
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
                        <Link to={'/location/outlet'} className="btn btn-warning ml-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default OutletEdit
