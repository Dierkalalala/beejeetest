import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk"
import createRootReducer from './reducer';
import {createBrowserHistory} from 'history';
import {composeWithDevTools} from 'redux-devtools-extension';

const initialState = {};

const store = createStore(
    createRootReducer(createBrowserHistory),
    initialState,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store;
