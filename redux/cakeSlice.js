import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const cakeSlice = createSlice({
    name: 'cakes',
    initialState: {
        alertName: '',
        alertColor: '',
        dataUser: '',
    },
    reducers: {
        setAlert(state, action) {
            state.alertName = action.payload.text;
            state.alertColor = action.payload.color;
        },
        resetAlert(state) {
            state.alertName = '';
        },
        setDataUser(state, action) {
            state.dataUser = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.alertName = action.payload.cakes.alertName;
            state.alertColor = action.payload.cakes.alertColor;
            state.dataUser = action.payload.sdaem.dataUser;
        },
    },
});

export const { setAlert, resetAlert } = cakeSlice.actions;

export default cakeSlice.reducer;
