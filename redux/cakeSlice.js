import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const cakeSlice = createSlice({
    name: 'cakes',
    initialState: {
        alertName: '',
    },
    reducers: {
        setAlert(state, action) {
            state.alertName = action.payload;
        },
        resetAlert(state) {
            state.alertName = '';
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.alertName = action.payload.cakes.alertName;
        },
    },
});

export const { setAlert, resetAlert } = cakeSlice.actions;

export default cakeSlice.reducer;
