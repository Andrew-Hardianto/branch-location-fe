import axios from 'axios';

import {
    KECAMATAN_CREATE_FAIL,
    KECAMATAN_CREATE_REQUEST,
    KECAMATAN_CREATE_SUCCESS,
    KECAMATAN_DETAILS_FAIL,
    KECAMATAN_DETAILS_REQUEST,
    KECAMATAN_DETAILS_SUCCESS,
    KECAMATAN_LIST_FAIL,
    KECAMATAN_LIST_REQUEST,
    KECAMATAN_LIST_SUCCESS
} from "../constants/kecamatanConstants";

export const listKecamatan = () => async (
    dispatch
) => {
    try {
        dispatch({ type: KECAMATAN_LIST_REQUEST })

        const { data } = await axios.get(
            `/kecamatan`
        )

        dispatch({
            type: KECAMATAN_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: KECAMATAN_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const detailKecamatan = (id) => async (dispatch) => {
    try {
        dispatch({ type: KECAMATAN_DETAILS_REQUEST })

        const { data } = await axios.get(
            `/kecamatan/${id}`
        )

        dispatch({
            type: KECAMATAN_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: KECAMATAN_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createKecamatan = (data) => async (dispatch) => {
    try {
        dispatch({ type: KECAMATAN_CREATE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { prov } = await axios.post(
            '/kecamatan',
            data,
            config
        )

        dispatch({
            type: KECAMATAN_CREATE_SUCCESS,
            payload: prov,
        })
    } catch (error) {
        dispatch({
            type: KECAMATAN_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}