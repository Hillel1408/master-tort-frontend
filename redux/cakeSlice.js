import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const cakeSlice = createSlice({
    name: 'cakes',
    initialState: {},
    reducers: {},
    extraReducers: {
        [HYDRATE]: (state, action) => {},
    },
});

export default cakeSlice.reducer;
