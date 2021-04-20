import {
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