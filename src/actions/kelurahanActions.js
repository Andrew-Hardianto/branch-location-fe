import axios from 'axios';

import {
    KELURAHAN_CREATE_FAIL,
    KELURAHAN_CREATE_REQUEST,
    KELURAHAN_CREATE_SUCCESS,
    KELURAHAN_DETAILS_FAIL,
    KELURAHAN_DETAILS_REQUEST,
    KELURAHAN_DETAILS_SUCCESS,
    KELURAHAN_LIST_FAIL,
    KELURAHAN_LIST_REQUEST,
    KELURAHAN_LIST_SUCCESS
} from "../constants/kelurahanConstants";

export const listKelurahan = () => async (
    dispatch
) => {
    try {
        dispatch({ type: KELURAHAN_LIST_REQUEST })

        const { data } = await axios.get(
            `/kelurahan`
        )

        dispatch({
            type: KELURAHAN_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: KELURAHAN_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const detailKelurahan = (id) => async (dispatch) => {
    try {
        dispatch({ type: KELURAHAN_DETAILS_REQUEST })

        const { data } = await axios.get(
            `/kelurahan/${id}`
        )

        dispatch({
            type: KELURAHAN_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: KELURAHAN_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createKelurahan = (data) => async (dispatch) => {
    try {
        dispatch({ type: KELURAHAN_CREATE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { prov } = await axios.post(
            '/kelurahan',
            data,
            config
        )

        dispatch({
            type: KELURAHAN_CREATE_SUCCESS,
            payload: prov,
        })
    } catch (error) {
        dispatch({
            type: KELURAHAN_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}