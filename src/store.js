import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    provinsiCreateReducer,
    provinsiDeleteReducer,
    provinsiDetailsReducer,
    provinsiListReducer,
    provinsiUpdateReducer
} from './reducers/provinsiReducers';
import {
    kotaCreateReducer,
    kotaDetailsReducer,
    kotaListReducer
} from './reducers/kotaReducers';
import {
    kecamatanCreateReducer,
    kecamatanDetailsReducer,
    kecamatanListReducer,
} from './reducers/kecamatanReducers';
import {
    kelurahanCreateReducer,
    kelurahanDetailsReducer,
    kelurahanListReducer,
} from './reducers/kelurahanReducers';
import {
    kodeposCreateReducer,
    kodeposDetailsReducer,
    kodeposListReducer,
} from './reducers/kodeposReducers';

const reducer = combineReducers({
    provinsiList: provinsiListReducer,
    provinsiDetail: provinsiDetailsReducer,
    provinsiCreate: provinsiCreateReducer,
    provinsiUpdate: provinsiUpdateReducer,
    provinsiDelete: provinsiDeleteReducer,
    kotaList: kotaListReducer,
    kotaDetail: kotaDetailsReducer,
    kotaCreate: kotaCreateReducer,
    kecamatanList: kecamatanListReducer,
    kecamatanDetail: kecamatanDetailsReducer,
    kecamatanCreate: kecamatanCreateReducer,
    kelurahanList: kelurahanListReducer,
    kelurahanDetail: kelurahanDetailsReducer,
    kelurahanCreate: kelurahanCreateReducer,
    kodeposList: kodeposListReducer,
    kodeposDetail: kodeposDetailsReducer,
    kodeposCreate: kodeposCreateReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store