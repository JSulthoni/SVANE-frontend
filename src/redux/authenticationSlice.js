import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    error: null
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        SIGNIN_START: (state) => {
            state.loading = true;
            state.error = null; 
        },
        SIGNIN_SUCCESS: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        SIGNIN_FAILURE: (state, action) => {
            state.loading = false;
            if (action.payload.split(' ').includes('404')) {
                state.error = 'Credentials not found!'
            } else {
                state.error = action.payload
            };
        },
        SIGNOUT: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    }
});

export const { SIGNIN_START, SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNOUT } = authenticationSlice.actions;

export default authenticationSlice.reducer;