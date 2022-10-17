import { configureStore } from '@reduxjs/toolkit';
import cakeReducer from './cakeSlice';
import { createWrapper } from 'next-redux-wrapper';

export function makeStore() {
    return configureStore({
        reducer: {
            cakes: cakeReducer,
        },
    });
}

export const wrapper = createWrapper(makeStore);
