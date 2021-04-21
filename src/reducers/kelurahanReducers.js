import {
    KELURAHAN_CREATE_FAIL,
    KELURAHAN_CREATE_REQUEST,
    KELURAHAN_CREATE_RESET,
    KELURAHAN_CREATE_SUCCESS,
    KELURAHAN_DETAILS_FAIL,
    KELURAHAN_DETAILS_REQUEST,
    KELURAHAN_DETAILS_SUCCESS,
    KELURAHAN_LIST_FAIL,
    KELURAHAN_LIST_REQUEST,
    KELURAHAN_LIST_SUCCESS
} from '../constants/kelurahanConstants';

export const kelurahanListReducer = (state = { kelurahan: [] }, action) => {
    switch (action.type) {
        case KELURAHAN_LIST_REQUEST:
            return { loading: true, kelurahan: [] }
        case KELURAHAN_LIST_SUCCESS:
            return {
                loading: false,
                kelurahan: action.payload.kelurahan,
            }
        case KELURAHAN_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const kelurahanDetailsReducer = (state = { kelurahan: {} }, action) => {
    switch (action.type) {
        case KELURAHAN_DETAILS_REQUEST:
            return { ...state, loading: true }
        case KELURAHAN_DETAILS_SUCCESS:
            return { loading: false, kelurahan: action.payload }
        case KELURAHAN_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const kelurahanCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case KELURAHAN_CREATE_REQUEST:
            return { loading: true }
        case KELURAHAN_CREATE_SUCCESS:
            return { loading: false, success: true, kelurahan: action.payload }
        case KELURAHAN_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case KELURAHAN_CREATE_RESET:
            return {}
        default:
            return state;
    }
}