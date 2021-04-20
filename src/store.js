import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { provinsiListReducer } from './reducers/provinsiReducers';

const reducer = combineReducers({
    provinsiList: provinsiListReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store