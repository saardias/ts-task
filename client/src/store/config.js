import { configureStore, combineReducers } from '@reduxjs/toolkit';
import reducers from './features';

const appReducer = combineReducers(reducers)

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default configureStore({
    reducer: rootReducer
})
