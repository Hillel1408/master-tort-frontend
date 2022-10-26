import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const cakeSlice = createSlice({
    name: 'cakes',
    initialState: {
        data: null,
        status: 'loading',
    },
    reducers: {
        checkAuth(state, action) {
            state.data = action.payload;
            localStorage.setItem('token', action.payload.accessToken);
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.data = action.payload.cakes.data;
            state.status = action.payload.cakes.status;
        },
    },
});

export const { checkAuth } = cakeSlice.actions;

export default cakeSlice.reducer;
