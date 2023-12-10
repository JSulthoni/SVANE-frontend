import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    wishlist: [],
};

export const contextSlice = createSlice({
    name: 'context',
    initialState,
    reducers: {
        ADD_TO_CART: (state, action) => {
            const item = state.products.find((item) => item.id === action.payload.id)
            
            if (item) {
                item.quantity += action.payload.quantity
            } else {
                state.products = [...state.products, action.payload]
            }
        },
        REMOVE_ITEM: (state, action) => {
            state.products = state.products.filter((item) => item.id !== action.payload)
        },
        RESET_CART: (state) => {
            state.products = []
        },
        INCREMENT_ITEM_IN_CART: (state, action) => {
            const item = state.products.find((item) => item.id === action.payload)
            
            if (item) {
                item.quantity += 1
            }
        },
        DECREMENT_ITEM_IN_CART: (state, action) => {
            const item = state.products.find((item) => item.id === action.payload)
            
            if (item) {
                item.quantity -= 1
            }
        },
        ADD_TO_WISH: (state, action) => {
            const item = state.wishlist.find((item) => item.id === action.payload.id)      
            if (item) {
                item.quantity += action.payload.quantity
            } else {
                state.wishlist = [...state.wishlist, action.payload]
            }
        },
        REMOVE_WISH: (state, action) => {
            state.wishlist = state.wishlist.filter((item) => item.id !== action.payload)
        },
        RESET_WISH: (state) => {
            state.wishlist = []
        }
    }
});


export const { ADD_TO_CART, ADD_TO_WISH, REMOVE_ITEM, RESET_CART, REMOVE_WISH, RESET_WISH, INCREMENT_ITEM_IN_CART, DECREMENT_ITEM_IN_CART } = contextSlice.actions;

export default contextSlice.reducer;