import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { CABANG_CREATE_RESET } from '../../constants/cabangConstants';
import { deleteCabang, listCabang } from '../../actions/cabangActions';

const Cabang = () => {
    const { SearchBar } = Search;

    const dispatch = useDispatch();

    const cabangList = useSelector(state => state.cabangList);
    const { loading, error, cabang } = cabangList;

    const cabangDelete = useSelector(state => state.cabangDelete);
    const { loading: loadingDelete, error: errorDelete, success } = cabangDelete;

    useEffect(() => {
        dispatch({ type: CABANG_CREATE_RESET })
        dispatch(listCabang())
    }, [dispatch, success])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteCabang(id))
        }
    }

    const columns = [
        {
            dataField: 'kode',
            text: 'Kode Cabang'
        },
        {
            dataField: 'nama',
            text: 'Nama Cabang'
        },
        {
            dataField: 'status',
            text: 'Status'
        },
        {
            dataField: 'alamat',
            text: 'Alamat',
            style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
        },
        {
            dataField: "link",
            text: 'Aksi',
            formatter: (rowContent, row) => {
                return (
                    <div className="">
                        <LinkContainer to={`/location/branch/detail/${row.kode}`}>
                            <Button variant="info" className="btn-sm">
                                <i className="fas fa-info"></i>
                            </Button>
                        </LinkContainer>
                        <LinkContainer to={`/location/branch/edit/${row.kode}`} className="ml-2">
                            <Button variant="success" className="btn-sm">
                                <i class="fas fa-edit"></i>
                            </Button>
                        </LinkContainer>
                        <Button variant="danger" className="btn-sm ml-2" onClick={() => deletehandler(row.kode)}>
                            <i className="fas fa-trash-alt"></i>
                        </Button>
                    </div>
                )
            }
        }
    ];

    return (
        <div className="home">
            <Container>
                {loading ? <Loader />
                    : error ? (<Message variant="danger" >{error}</Message>)
                        : (
                            <Card lg="2" className="mt-3 shadow-lg" >
                                <Card.Body>
                                    {loadingDelete && <Loader />}
                                    {errorDelete && <Message variant="danger" >{error}</Message>}
                                    <ToolkitProvider
                                        bootstrap4
                                        keyField="id"
                                        data={cabang}
                                        columns={columns}
                                        search
                                    >
                                        {
                                            props => (
                                                <div>
                                                    <Row className="mb-3">
                                                        <Col sm={9}>
                                                            <Link to="/location/branch/tambah" className="btn btn-primary">Tambah Branch</Link>
                                                        </Col>
                                                        <Col sm={3}>
                                                            <SearchBar placeholder="Cari ..." {...props.searchProps} />
                                                        </Col>
                                                    </Row>
                                                    <Card.Title>Data Branch</Card.Title>
                                                    <BootstrapTable
                                                        {...props.baseProps}
                                                        pagination={paginationFactory()}
                                                    />
                                                </div>
                                            )
                                        }
                                    </ToolkitProvider>
                                </Card.Body>
                            </Card>
                        )}
            </Container>
        </div>
    )
}

export default Cabang
