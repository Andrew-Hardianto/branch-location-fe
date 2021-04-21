import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { createProvinsi } from '../../actions/provinsiActions';

const ProvinsiTambah = ({ history }) => {
    const initialState = { id: '', nama: '' }

    const [data, setData] = useState(initialState);

    const dispatch = useDispatch();

    const provinsiCreate = useSelector(state => state.provinsiCreate);
    const { loading, error, success } = provinsiCreate;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (success) {
            history.push('')
        }
    }, [history, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProvinsi(data))
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }}>
                <Card.Body>
                    <Card.Title>Tambah Provinsi</Card.Title>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="id">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan ID..."
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="nama">
                            <Form.Label>Nama Provinsi</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Provinsi..."
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div >
    )
}

export default ProvinsiTambah
