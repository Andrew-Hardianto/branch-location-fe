import {
    KECAMATAN_CREATE_FAIL,
    KECAMATAN_CREATE_REQUEST,
    KECAMATAN_CREATE_RESET,
    KECAMATAN_CREATE_SUCCESS,
    KECAMATAN_DETAILS_FAIL,
    KECAMATAN_DETAILS_REQUEST,
    KECAMATAN_DETAILS_SUCCESS,
    KECAMATAN_LIST_FAIL,
    KECAMATAN_LIST_REQUEST,
    KECAMATAN_LIST_SUCCESS
} from '../constants/kecamatanConstants';

export const kecamatanListReducer = (state = { kecamatan: [] }, action) => {
    switch (action.type) {
        case KECAMATAN_LIST_REQUEST:
            return { loading: true, kecamatan: [] }
        case KECAMATAN_LIST_SUCCESS:
            return {
                loading: false,
                kecamatan: action.payload.kecamatan,
            }
        case KECAMATAN_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const kecamatanDetailsReducer = (state = { kecamatan: {} }, action) => {
    switch (action.type) {
        case KECAMATAN_DETAILS_REQUEST:
            return { ...state, loading: true }
        case KECAMATAN_DETAILS_SUCCESS:
            return { loading: false, kecamatan: action.payload }
        case KECAMATAN_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const kecamatanCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case KECAMATAN_CREATE_REQUEST:
            return { loading: true }
        case KECAMATAN_CREATE_SUCCESS:
            return { loading: false, success: true, kecamatan: action.payload }
        case KECAMATAN_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case KECAMATAN_CREATE_RESET:
            return {}
        default:
            return state;
    }
}