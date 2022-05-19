import { createSlice } from '@reduxjs/toolkit';
import searchApi from '../api/search-api';

const initialState = {
    history: [],
    loading: false,
    error: null,
};

const _cleanState = (state, action) => {
    state.history = [];
    state.loading = false;
    state.error = null;
};

const _addQuery = (state, action) => {
    const updatedHistory = [...state.history]
    updatedHistory.unshift(action.payload)
    state.history = updatedHistory;
};

const _loadStart = (state, action) => {
    state.loading = true;
    state.error = null;
};

const _failed = (state, action) => {
    state.loading = false;
    state.error = action.payload.error;
};

const _success = (state, { payload }) => {
    state.history = payload.history;
    state.loading = false;
};

export const HistorySlice = createSlice({
    name: 'searchHistory',
    initialState: initialState,
    reducers: {
        cleanHistoryState: _cleanState,
        addQuery: _addQuery,
        loadStart: _loadStart,
        failed: _failed,
        success: _success
    }
});

const { actions, reducer } = HistorySlice;

export const { cleanHistoryState, addQuery, loadStart, success, failed } = actions;

export default reducer;

export const fetchSearchHistory = () => {
    return async (dispatch) => {
        try {
            dispatch(loadStart());
            const { data, status, error } = await searchApi.getHistory();

            if (status === 200) {
                return dispatch(success({
                    history: data.history,
                }));
            } else {
                return dispatch(failed({ error: error }));
            }
        } catch (error) {
            return dispatch(failed({ error }));

        }
    }
}