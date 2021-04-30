import React, { useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { detailOutlet } from '../../actions/outletActions';

const OutletDetail = ({ match }) => {
    const outletId = match.params.id;

    const dispatch = useDispatch();

    const outletDetail = useSelector(state => state.outletDetail);
    const { loading, error, outlet } = outletDetail;

    useEffect(() => {
        dispatch(detailOutlet(outletId));
    }, [dispatch, outletId])

    const coords = { lat: outlet.outlet?.latitude, lng: outlet.outlet?.longitude };

    const icon =
        '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">H</text></svg>';

    return (
        <div className="home">
            <Card style={{ width: '40rem' }}>
                {loading ? <Loader />
                    : error ? (<Message variant="danger" >{error}</Message>)
                        : (
                            <Card.Body>
                                <Link to={'/location/outlet'} className="btn btn-primary mb-3" >
                                    <i className="fas fa-arrow-left"></i>
                                </Link>
                                <Card.Title>Detail Outlet</Card.Title>
                                <Table hover borderless responsive>
                                    <tbody>
                                        <tr>
                                            <td width="150px">Kode Outlet</td>
                                            <td width="30px"> : </td>
                                            <td>{outlet.outlet?.kode}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">Nama Outlet</td>
                                            <td width="30px"> : </td>
                                            <td>{outlet.outlet?.nama}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">Status</td>
                                            <td width="30px"> : </td>
                                            <td>{outlet.outlet?.status}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">Kode Cabang</td>
                                            <td width="30px"> : </td>
                                            <td>{outlet.outlet?.kodeCabang}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">Nama Cabang</td>
                                            <td width="30px"> : </td>
                                            <td>{outlet.outlet?.namaCabang}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        )}
            </Card>
        </div>
    )
}

export default OutletDetail
