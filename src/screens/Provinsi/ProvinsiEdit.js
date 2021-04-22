import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../components/Loader';
import { detailProvinsi, editProvinsi } from '../../actions/provinsiActions';
import { PROVINSI_UPDATE_RESET } from '../../constants/provinsiConstants';

const ProvinsiEdit = ({ history, match }) => {
    const provinsiId = match.params.id;

    const [nama, setNama] = useState('');

    const dispatch = useDispatch();

    const provinsiDetail = useSelector(state => state.provinsiDetail);
    const { provinsi } = provinsiDetail;

    const provinsiUpdate = useSelector(state => state.provinsiUpdate);
    const { loading, error, success } = provinsiUpdate;

    useEffect(() => {
        if (success) {
            dispatch({ type: PROVINSI_UPDATE_RESET })
            history.push('/location/provinsi')
        } else {
            if (!provinsi.provinsi?.nama || provinsi.provinsi?.id !== provinsiId) {
                dispatch(detailProvinsi(provinsiId));
            } else {
                setNama(provinsi.provinsi?.nama)
            }
        }
    }, [dispatch, history, provinsiId, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editProvinsi({ id: provinsiId, nama }))
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }}>
                <Card.Body>
                    <Card.Title>Edit Provinsi</Card.Title>
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler} >
                        {/* <Form.Group controlId="id">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan ID..."
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                readOnly
                            />
                        </Form.Group> */}

                        <Form.Group controlId="nama">
                            <Form.Label>Nama Provinsi</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Provinsi..."
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Link to={'/location/provinsi'} className="btn btn-warning ml-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ProvinsiEdit
