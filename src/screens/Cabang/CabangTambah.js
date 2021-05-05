import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { HPlatform, HMap, HMapMarker } from '@robinuit/react-here-maps-library';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { createCabang } from '../../actions/cabangActions';
import { listWilayah } from '../../actions/wilayahActions';
import { listKodepos } from '../../actions/kodeposActions';

const initialState = {
    kode: '',
    nama: '',
    alamat: '',
    biLocationCode: '',
    kodepos: '',
    namaWilayah: '',
    kodeWilayah: '',
    latitude: '',
    longitude: '',
}

const CabangTambah = ({ history }) => {
    const [data, setData] = useState(initialState)

    const dispatch = useDispatch();

    const cabangCreate = useSelector(state => state.cabangCreate);
    const { loading, error, success } = cabangCreate;

    const wilayahList = useSelector(state => state.wilayahList);
    const { wilayah } = wilayahList;

    const kodeposList = useSelector(state => state.kodeposList);
    const { kodepos } = kodeposList;

    useEffect(() => {
        dispatch(listWilayah())
        dispatch(listKodepos())
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

    const coords = { lat: -6.241586, lng: 106.992416 };

    const icon =
        '<svg height="24pt" viewBox="-76 0 512 512" width="24pt" xmlns="http://www.w3.org/2000/svg"><path d="m300 452c0 44.75-74.050781 60-120 60-45.539062 0-120-15.101562-120-60 0-29.828125 36.929688-52.871094 94.070312-58.699219h51.859376c57.140624 5.828125 94.070312 28.871094 94.070312 58.699219zm0 0" fill="#8bf2cf"/><path d="m300 452c0 44.75-74.050781 60-120 60v-118.699219h25.929688c57.140624 5.828125 94.070312 28.871094 94.070312 58.699219zm0 0" fill="#57d9ad"/><path d="m180 460.375-137.34375-164.136719c-27.507812-32.457031-42.65625-73.738281-42.65625-116.238281 0-99.253906 80.746094-180 180-180s180 80.746094 180 180c0 42.519531-15.160156 83.816406-42.691406 116.277344zm0 0" fill="#ff637b"/><path d="m180 0v460.375l137.308594-164.097656c27.53125-32.460938 42.691406-73.757813 42.691406-116.277344 0-99.253906-80.746094-180-180-180zm0 0" fill="#e63950"/><path d="m300 180c0 44.328125-24.148438 83.109375-60 103.890625h-120c-35.851562-20.78125-60-59.5625-60-103.890625 0-66.171875 53.828125-120 120-120s120 53.828125 120 120zm0 0" fill="#fff7cc"/><path d="m300 180c0 44.328125-24.148438 83.109375-60 103.890625h-60v-223.890625c66.171875 0 120 53.828125 120 120zm0 0" fill="#ffe6b3"/><path d="m240 270v13.890625c-17.660156 10.238281-38.160156 16.109375-60 16.109375s-42.339844-5.871094-60-16.109375v-13.949219c.039062-33.0625 26.941406-59.941406 60-59.941406 33.078125 0 60 26.921875 60 60zm0 0" fill="#725d57"/><path d="m180 120c-24.808594 0-45 20.191406-45 45s20.191406 45 45 45 45-20.191406 45-45-20.191406-45-45-45zm0 0" fill="#ffbfab"/><path d="m180 210v-90c24.808594 0 45 20.191406 45 45s-20.191406 45-45 45zm0 0" fill="#ffa78f"/><path d="m240 270v13.890625c-17.660156 10.238281-38.160156 16.109375-60 16.109375v-90c33.078125 0 60 26.921875 60 60zm0 0" fill="#53433f"/></svg>';

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3">
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
                        <Form.Group controlId="kodepos">
                            <Form.Label>Kodepos</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="kodepos"
                                onChange={handleChange}
                            >
                                <option value="">- Pilih Kodepos -</option>
                                {kodepos.map((data) => (
                                    <option value={data.kode} >{data.kode}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="biLocationCode">
                            <Form.Label>BI Location Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan BI Location Code..."
                                name="biLocationCode"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="latitude">
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Latitude..."
                                    name="latitude"
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="longitude">
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Longitude..."
                                    name="longitude"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <HPlatform
                            apikey={"XSwg3E4JD32ffoFCRMywHymR_c0705ZdkiK7GOdw0Kw"}
                            useCIT
                            useHTTPS
                            includeUI
                            includePlaces
                        >
                            <HMap
                                style={{
                                    height: "400px",
                                    width: "360px",
                                }}
                                mapOptions={{ center: { lat: -6.241586, lng: 106.992416 }, zoom: 14 }}
                            >
                                <HMapMarker coords={coords} icon={icon} />
                            </HMap>
                        </HPlatform>
                        <Button variant="primary" type="submit" className="mt-3">
                            Submit
                        </Button>
                        <Link to={'/location/branch'} className="btn btn-warning ml-3 mt-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CabangTambah
