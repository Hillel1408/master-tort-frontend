import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const cakeSlice = createSlice({
    name: 'cakes',
    initialState: {
        alertName: '',
        alertColor: '',
        dataUser_2: '',
        recipes: '',
    },
    reducers: {
        setAlert(state, action) {
            state.alertName = action.payload.text;
            state.alertColor = action.payload.color;
        },
        resetAlert(state) {
            state.alertName = '';
        },
        setDataUser_2(state, action) {
            state.dataUser_2 = action.payload;
        },
        setRecipes(state, action) {
            state.recipes = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.alertName = action.payload.cakes.alertName;
            state.alertColor = action.payload.cakes.alertColor;
            state.dataUser_2 = action.payload.cakes.dataUser;
            state.recipes = action.payload.cakes.recipes;
        },
    },
});

export const { setAlert, resetAlert, setDataUser_2, setRecipes } =
    cakeSlice.actions;

export default cakeSlice.reducer;
