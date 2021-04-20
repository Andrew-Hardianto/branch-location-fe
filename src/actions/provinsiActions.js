import axios from 'axios';

import {
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