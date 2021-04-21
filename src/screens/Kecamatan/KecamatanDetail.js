import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { detailKecamatan } from '../../actions/kecamatanActions';
import Loader from '../../components/Loader';

const KecamatanDetail = ({ match }) => {
    const kecamatanId = match.params.id;

    const dispatch = useDispatch();

    const kecamatanDetail = useSelector(state => state.kecamatanDetail);
    const { loading, error, kecamatan } = kecamatanDetail;

    useEffect(() => {
        dispatch(detailKecamatan(kecamatanId));
    }, [dispatch, kecamatanId])

    return (
        <div className="home">
            <Card style={{ width: '20rem' }}>
                {loading ? <Loader />
                    : (
                        <Card.Body>
                            <Card.Title>Detail Kecamatan</Card.Title>
                            <Card.Subtitle className="mb-3">ID Kecamatan : {kecamatan.kecamatan?.id}</Card.Subtitle>
                            <Card.Text>
                                Nama Kecamatan : {kecamatan.kecamatan?.nama}
                            </Card.Text>
                            <Card.Text>
                                Kode Kota : {kecamatan.kecamatan?.kotaId}
                            </Card.Text>
                            <Link to={'/location/kecamatan'} className="btn btn-primary" >
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                        </Card.Body>
                    )}
            </Card>
        </div>
    )
}

export default KecamatanDetail
