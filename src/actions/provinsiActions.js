import axios from 'axios';

import {
    PROVINSI_CREATE_FAIL,
    PROVINSI_CREATE_REQUEST,
    PROVINSI_CREATE_SUCCESS,
    PROVINSI_DETAILS_FAIL,
    PROVINSI_DETAILS_REQUEST,
    PROVINSI_DETAILS_SUCCESS,
    PROVINSI_LIST_FAIL,
    PROVINSI_LIST_REQUEST,
    PROVINSI_LIST_SUCCESS
} from "../constants/provinsiConstants"


export const listProvinsi = () => async (
    dispatch
) => {
    try {
        dispatch({ type: PROVINSI_LIST_REQUEST })

        const { data } = await axios.get(
            `/provinsi`
        )

        dispatch({
            type: PROVINSI_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PROVINSI_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const detailProvinsi = (id) => async (dispatch) => {
    try {
        dispatch({ type: PROVINSI_DETAILS_REQUEST })

        const { data } = await axios.get(
            `/provinsi/${id}`
        )

        dispatch({
            type: PROVINSI_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PROVINSI_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createProvinsi = (data) => async (dispatch) => {
    try {
        dispatch({ type: PROVINSI_CREATE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { prov } = await axios.post(
            '/provinsi',
            data,
            config
        )

        dispatch({
            type: PROVINSI_CREATE_SUCCESS,
            payload: prov,
        })
    } catch (error) {
        dispatch({
            type: PROVINSI_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}