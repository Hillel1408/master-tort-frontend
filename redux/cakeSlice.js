import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const cakeSlice = createSlice({
    name: 'cakes',
    initialState: {
        alertName: '',
        alertColor: '',
    },
    reducers: {
        setAlert(state, action) {
            state.alertName = action.payload.text;
            state.alertColor = action.payload.color;
        },
        resetAlert(state) {
            state.alertName = '';
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.alertName = action.payload.cakes.alertName;
            state.alertColor = action.payload.cakes.alertColor;
        },
    },
});

export const { setAlert, resetAlert } = cakeSlice.actions;

export default cakeSlice.reducer;
