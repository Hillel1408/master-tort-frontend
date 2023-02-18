import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import cakeReducer from './cakeSlice';

export function makeStore() {
    return configureStore({
        reducer: {
            cakes: cakeReducer,
        },
    });
}

export const wrapper = createWrapper(makeStore, { debug: true });
