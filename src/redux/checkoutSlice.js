import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    payload: [],
    option: null,
};

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        SET_CHECKOUT: (state, action) => {
            const { payload } = action.payload
            state.payload = [ ...payload ]

        },
        SET_OPTION: (state, action) => {
            state.option = action.payload
        },
        RESET_CHECKOUT: (state) => {
            state.payload = [];
            state.option = null;
        },
    }
});


export const { SET_CHECKOUT, SET_OPTION, RESET_CHECKOUT } = checkoutSlice.actions;

export default checkoutSlice.reducer;