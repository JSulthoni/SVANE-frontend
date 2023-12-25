import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: ''
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        SET_NOTIFICATION: (state, action) => {
            state.message = action.payload;
        },
        RESET_NOTIFICATION: (state) => {
            state.message = '';
        }
    }
});


export const { SET_NOTIFICATION, RESET_NOTIFICATION } = notificationSlice.actions;

export default notificationSlice.reducer;