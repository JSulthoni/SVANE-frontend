import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: false,
    wishlist: false,
    cart: false,
    menu: false,
    sign: false,
    nightmode: false
};

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        TOGGLE_SEARCH: (state, action) => {
            state.search = action.payload
        },
        TOGGLE_WISHLIST: (state, action) => {
            state.wishlist = action.payload
        },
        TOGGLE_CART: (state, action) => {
            state.cart = action.payload
        },
        TOGGLE_MENU: (state, action) => {
            state.menu = action.payload
        },
        TOGGLE_SIGN: (state, action) => {
            state.sign = action.payload
        },
        TOGGLE_NIGHT: (state) => {
            state.nightmode = !state.nightmode
        }
    }
});


export const { TOGGLE_CART, TOGGLE_MENU, TOGGLE_NIGHT, TOGGLE_SEARCH, TOGGLE_SIGN, TOGGLE_WISHLIST } = navigationSlice.actions;

export default navigationSlice.reducer;