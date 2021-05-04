import React, { useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HPlatform, HMap, HMapMarker } from '@robinuit/react-here-maps-library';
// import { HPlatform, HMap, HMapMarker } from 'react-here-map';

import { detailCabang } from '../../actions/cabangActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const CabangDetail = ({ match }) => {
    const cabangId = match.params.id;

    const dispatch = useDispatch();

    const cabangDetail = useSelector(state => state.cabangDetail);
    const { loading, error, cabang } = cabangDetail;

    useEffect(() => {
        dispatch(detailCabang(cabangId));
    }, [dispatch, cabangId])
    const coords = { lat: cabang.cabang?.latitude, lng: cabang.cabang?.longitude };

    const icon =
        '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">H</text></svg>';

    return (
        <div className="home">
            {loading ? <Loader />
                : error ? (<Message variant="danger" >{error}</Message>)
                    : (
                        <Card style={{ width: '40rem' }} className="shadow">
                            <Card.Body>
                                <Link to={'/location/branch'} className="btn btn-primary mb-3" >
                                    <i className="fas fa-arrow-left"></i>
                                </Link>
                                <Card.Title>Detail Branch</Card.Title>
                                <Table hover borderless responsive>
                                    <tbody>
                                        <tr>
                                            <td width="150px">Kode Cabang</td>
                                            <td width="30px"> : </td>
                                            <td>{cabang.cabang?.kode}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">Nama Cabang</td>
                                            <td width="30px"> : </td>
                                            <td>{cabang.cabang?.nama}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">Status</td>
                                            <td width="30px"> : </td>
                                            <td>{cabang.cabang?.status}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">Kode Wilayah</td>
                                            <td width="30px"> : </td>
                                            <td>{cabang.cabang?.kodeWilayah}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">Nama Wilayah</td>
                                            <td width="30px"> : </td>
                                            <td>{cabang.cabang?.namaWilayah}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                {/* <HPlatform
                                    apikey='XSwg3E4JD32ffoFCRMywHymR_c0705ZdkiK7GOdw0Kw'
                                    interactive
                                    includeUI
                                    version='v3/3.1'
                                    useCIT
                                    useHTTPS
                                    includeUI
                                    includePlaces
                                >
                                    <HMap
                                        style={{
                                            height: "400px",
                                            width: "600px",
                                        }}
                                        mapOptions={{ center: { lat: cabang.cabang?.latitude, lng: cabang.cabang?.langitude } }}
                                    >
                                        <HMapMarker coords={coords} icon={icon}></HMapMarker>
                                    </HMap>
                                </HPlatform> */}
                                <HPlatform
                                    // app_id="YOUR_APP_ID"
                                    // app_code="YOUR_APP_CODE"
                                    apikey={"XSwg3E4JD32ffoFCRMywHymR_c0705ZdkiK7GOdw0Kw"}
                                    useCIT
                                    useHTTPS
                                    includeUI
                                    includePlaces
                                >
                                    <HMap
                                        style={{
                                            height: "400px",
                                            width: "600px",
                                        }}
                                        mapOptions={{ center: { lat: cabang.cabang?.latitude, lng: cabang.cabang?.longitude }, zoom: 14 }}
                                    >
                                        <HMapMarker coords={coords} icon={icon} />
                                    </HMap>
                                </HPlatform>
                            </Card.Body>
                        </Card>
                    )}
        </div>
    )
}

export default CabangDetail
