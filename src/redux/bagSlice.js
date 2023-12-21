import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    wishlist: [],
};

export const bagSlice = createSlice({
    name: 'bag',
    initialState,
    reducers: {
        ADD_TO_CART: (state, action) => {
            const item = state.cart.find((item) => item.product._id === action.payload.product._id)
            
            if (item) {
                item.quantity += action.payload.quantity
            } else {
                state.cart = [...state.cart, action.payload]
            }
        },
        REMOVE_ITEM: (state, action) => {
            state.cart = state.cart.filter((item) => item.product._id !== action.payload)
        },
        RESET_CART: (state) => {
            state.cart = []
        },
        INCREMENT_ITEM_IN_CART: (state, action) => {
            const item = state.cart.find((item) => item.product._id === action.payload)
            if (item) {
                item.quantity += 1
            }
        },
        DECREMENT_ITEM_IN_CART: (state, action) => {
            const item = state.cart.find((item) => item.product._id === action.payload)
            if (item) {
                item.quantity -= 1
            }
        },
        ADD_TO_WISH: (state, action) => {
            const item = state.wishlist.find((item) => item.product._id === action.payload.product._id)      
            if (!item) {
                state.wishlist = [...state.wishlist, action.payload]
            }
        },
        REMOVE_WISH: (state, action) => {
            state.wishlist = state.wishlist.filter((item) => item.product._id !== action.payload)
        },
        RESET_WISH: (state) => {
            state.wishlist = []
        },
        SET_BAG: (state, action) => {
            const { cart, wishlist } = action.payload
            state.cart = [ ...cart ]
            state.wishlist = [ ...wishlist ]
        },
    }
});


export const { ADD_TO_CART, ADD_TO_WISH, REMOVE_ITEM, RESET_CART, REMOVE_WISH, RESET_WISH, INCREMENT_ITEM_IN_CART, DECREMENT_ITEM_IN_CART, SET_BAG } = bagSlice.actions;

export default bagSlice.reducer;