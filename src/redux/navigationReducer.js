import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: false,
    wishlist: false,
    cart: false,
    menu: false,
    nightmode: false
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    TOGGLE_SEARCH: (state, action) => {
        const { payload } = action.payload
        state.search = payload
    },
    TOGGLE_WISHLIST: (state, action) => {
        const { payload } = action.payload
        state.wishlist = payload
    },
    TOGGLE_CART: (state, action) => {
        const { payload } = action.payload
        state.cart = payload
    },
    TOGGLE_MENU: (state, action) => {
        const { payload } = action.payload
        state.menu = payload
    },
    TOGGLE_NIGHT: (state) => {
        state.nightmode = !state.nightmode
    }
  }
});


export const { TOGGLE_CART, TOGGLE_MENU, TOGGLE_NIGHT, TOGGLE_SEARCH, TOGGLE_WISHLIST } = navigationSlice.actions;

export default navigationSlice.reducer;