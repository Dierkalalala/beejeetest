import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import tasksReducer from "./tasks/reducer";

const createRootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    tasks: tasksReducer,
})

export default createRootReducer
