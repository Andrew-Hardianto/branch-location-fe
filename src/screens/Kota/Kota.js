import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import Loader from '../../components/Loader';
import { deleteKota, listKota } from '../../actions/kotaActions';
import { KOTA_CREATE_RESET } from '../../constants/kotaConstants';

const Kota = () => {
    const { SearchBar } = Search;

    const dispatch = useDispatch();

    const kotaList = useSelector(state => state.kotaList);
    const { loading, error, kota } = kotaList;

    const kotaDelete = useSelector(state => state.kotaDelete);
    const { loading: loadingDelete, error: errorDelete, success } = kotaDelete;

    useEffect(() => {
        dispatch({ type: KOTA_CREATE_RESET })
        dispatch(listKota())
    }, [dispatch, success])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteKota(id))
        }
    }

    const columns = [{
        dataField: 'id',
        text: 'ID'
    }, {
        dataField: 'nama',
        text: 'Nama Kota'
    }, {
        dataField: 'biCOde',
        text: 'BI COde'
    }, {
        dataField: 'antasenaCOde',
        text: 'Antasena Code'
    }, {
        dataField: "link",
        text: 'Aksi',
        formatter: (rowContent, row) => {
            return (
                <div className="">
                    <LinkContainer to={`/location/kota/detail/${row.id}`}>
                        <Button variant="info" className="btn-sm">
                            <i className="fas fa-info"></i>
                        </Button>
                    </LinkContainer>
                    <LinkContainer to={`/location/kota/edit/${row.id}`} className="ml-2">
                        <Button variant="success" className="btn-sm">
                            <i class="fas fa-edit"></i>
                        </Button>
                    </LinkContainer>
                    <Button variant="danger" className="btn-sm ml-2" onClick={() => deletehandler(row.id)}>
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                </div>
            )
        }
    }];

    return (
        <div className="home">
            <Container>

                <Card lg="2" className="mt-3" >
                    {loading ? <Loader />
                        : (
                            <Card.Body>

                                {loadingDelete && <Loader />}s
                                <ToolkitProvider
                                    bootstrap4
                                    keyField="id"
                                    data={kota}
                                    columns={columns}
                                    search
                                >
                                    {
                                        props => (
                                            <div>
                                                <Row className="mb-3">
                                                    <Col sm={9}>
                                                        <Link to="/location/kota/tambah" className="btn btn-primary">Tambah Kota</Link>
                                                    </Col>
                                                    <Col sm={3}>
                                                        <SearchBar placeholder="Cari ..." {...props.searchProps} />
                                                    </Col>
                                                </Row>
                                                <hr />
                                                <Card.Title>Data Kota</Card.Title>
                                                <hr />
                                                <BootstrapTable
                                                    {...props.baseProps}
                                                    pagination={paginationFactory()}
                                                />
                                            </div>
                                        )
                                    }
                                </ToolkitProvider>
                            </Card.Body>
                        )}
                </Card>
            </Container>
        </div>
    )
}

export default Kota
