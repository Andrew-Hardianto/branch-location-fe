import {
    PROVINSI_CREATE_FAIL,
    PROVINSI_CREATE_REQUEST,
    PROVINSI_CREATE_RESET,
    PROVINSI_CREATE_SUCCESS,
    PROVINSI_DETAILS_FAIL,
    PROVINSI_DETAILS_REQUEST,
    PROVINSI_DETAILS_SUCCESS,
    PROVINSI_LIST_FAIL,
    PROVINSI_LIST_REQUEST,
    PROVINSI_LIST_SUCCESS
} from "../constants/provinsiConstants";


export const provinsiListReducer = (state = { provinsi: [] }, action) => {
    switch (action.type) {
        case PROVINSI_LIST_REQUEST:
            return { loading: true, provinsi: [] }
        case PROVINSI_LIST_SUCCESS:
            return {
                loading: false,
                provinsi: action.payload.provinsi,
            }
        case PROVINSI_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const provinsiDetailsReducer = (
    state = { provinsi: {} }, action) => {
    switch (action.type) {
        case PROVINSI_DETAILS_REQUEST:
            return { ...state, loading: true }
        case PROVINSI_DETAILS_SUCCESS:
            return { loading: false, provinsi: action.payload }
        case PROVINSI_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const provinsiCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PROVINSI_CREATE_REQUEST:
            return { loading: true }
        case PROVINSI_CREATE_SUCCESS:
            return { loading: false, success: true, users: action.payload }
        case PROVINSI_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PROVINSI_CREATE_RESET:
            return {}
        default:
            return state;
    }
}