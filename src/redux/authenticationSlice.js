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
            console.log(action.payload)
            state.user = action.payload;
            state.loading = false;
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload));
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
            localStorage.removeItem('user');
        },
    }
});

export const { SIGNIN_START, SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNOUT } = authenticationSlice.actions;

export default authenticationSlice.reducer;