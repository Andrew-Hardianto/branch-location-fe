import React, { useState, useEffect, useMemo } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

import { deleteProvinsi, listProvinsi } from '../../actions/provinsiActions';
import { PROVINSI_CREATE_RESET } from '../../constants/provinsiConstants';
import Loader from '../../components/Loader';
import Paginations from '../../components/Pagination';
import Search from '../../components/Search';

const Provinsi = () => {
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const ITEMS_PER_PAGE = 10;

    const dispatch = useDispatch();

    const provinsiList = useSelector(state => state.provinsiList);
    const { loading, error, provinsi } = provinsiList;

    const provinsiDelete = useSelector(state => state.provinsiDelete);
    const { loading: loadingDelete, error: errorDelete, success } = provinsiDelete;

    useEffect(() => {
        dispatch({ type: PROVINSI_CREATE_RESET })
        dispatch(listProvinsi())
    }, [dispatch, success])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteProvinsi(id))
        }
    }

    const Data = useMemo(() => {
        let computedData = provinsi;

        if (search) {
            computedData = computedData.filter(
                data =>
                    data.nama.toLowerCase().includes(search.toLowerCase()) ||
                    data.id.toString().includes(search.toString())
            );
        }

        setTotalItems(computedData.length);

        //Current Page slice
        return computedData.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [provinsi, currentPage, search,]);

    return (
        <div className="home">
            <Container>
                <Row className="mb-3 mt-3">
                    <Col sm={9}>
                        <Link to="/location/provinsi/tambah" className="btn btn-primary">Tambah Provinsi</Link>
                    </Col>
                    <Col sm={3}>
                        <Search
                            onSearch={value => {
                                setSearch(value);
                                setCurrentPage(1);
                            }}
                        />
                    </Col>
                </Row>
                <Card lg="2" >
                    {loading ? <Loader />
                        : (
                            <Card.Body>
                                <Card.Title>Data Provinsi</Card.Title>
                                {loadingDelete && <Loader />}
                                {/* <Results results={currentPosts} /> */}
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nama Provinsi</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Data?.map((prov) => (
                                            <tr key={prov.id}>
                                                <td>{prov.id}</td>
                                                <td>{prov.nama}</td>
                                                <td>
                                                    <LinkContainer to={`/location/provinsi/detail/${prov.id}`}>
                                                        <Button variant="info" className="btn-sm">
                                                            <i className="fas fa-info"></i>
                                                        </Button>
                                                    </LinkContainer>
                                                    <LinkContainer to={`/location/provinsi/edit/${prov.id}`} className="ml-2">
                                                        <Button variant="success" className="btn-sm">
                                                            <i class="fas fa-edit"></i>
                                                        </Button>
                                                    </LinkContainer>
                                                    <Button variant="danger" className="btn-sm ml-2" onClick={() => deletehandler(prov.id)}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Paginations
                                    total={totalItems}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    currentPage={currentPage}
                                    onPageChange={page => setCurrentPage(page)}
                                />
                            </Card.Body>
                        )
                    }
                </Card>
            </Container>
        </div>
    )
}

export default Provinsi