import { createSlice } from '@reduxjs/toolkit';
import searchApi from '../api/search-api';

const initialState = {
    currentQuery: '',
    results: [],
    metadata: {
        total: 0,
        page: 1
    },
    loading: false,
    error: null,
};

const _cleanState = (state, action) => {
    state.results = [];
    state.metadata = {
        total: 0,
        page: 1
    };
    state.loading = false;
    state.error = null;
};

const _searchtart = (state, action) => {
    state.metadata = {
        total: 0,
        page: 1
    };
    state.loading = true;
    state.error = null;
};

const _searchFailed = (state, action) => {
    state.currentQuery = '';
    state.results = [];
    state.loading = false;
    state.error = action.payload.error;
};

const _searchSuccess = (state, { payload }) => {
    state.currentQuery = payload.text;
    state.results = payload.results;
    state.metadata = payload.metadata;
    state.loading = false;
};

export const TackSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {
        cleanState: _cleanState,
        searchtart: _searchtart,
        searchFailed: _searchFailed,
        searchSuccess: _searchSuccess
    }
});

const { actions, reducer } = TackSlice;

export const { cleanState, searchtart, searchFailed, searchSuccess } = actions;

export default reducer;

export const searchForResults = (text, page, limit) => {
    return async (dispatch) => {
        try {
            dispatch(searchtart());
            const { data, status, error } = await searchApi.searchByText(text, page, limit);

            if (status === 200) {
                return dispatch(searchSuccess({
                    text: text,
                    results: data.results,
                    metadata: data.metadata
                }));
            } else {
                return dispatch(searchFailed({ error: error }));
            }
        } catch (error) {
            return dispatch(searchFailed({ error }));

        }
    }
}

export const recordSearchForResults = (text, page, limit) => {
    return async (dispatch) => {
        try {
            dispatch(searchtart());
            const { data, status, error } = await searchApi.recordSearchByText(text, page, limit);

            if (status === 200) {
                return dispatch(searchSuccess({
                    text: text,
                    results: data.results,
                    metadata: data.metadata
                }));
            } else {
                return dispatch(searchFailed({ error: error }));
            }
        } catch (error) {
            return dispatch(searchFailed({ error }));

        }
    }
}