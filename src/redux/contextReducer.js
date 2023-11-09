import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    wishlist: [],
    nightmode: false
}

export const contextSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
        const item = state.products.find((item) => item.id === action.payload.id)
        
        if (item) {
            item.quantity += action.payload.quantity
        } else {
            state.products.push(action.payload)
        }
    },
    REMOVE_ITEM: (state, action) => {
        state.products = state.products.filter((item) => item.id !== action.payload)
    },
    RESET_CART: (state) => {
        state.products = []
    },
    ADD_TO_WISH: (state, action) => {
        const item = state.wishlist.find((item) => item.id === action.payload.id)      
        if (item) {
            item.quantity += action.payload.quantity
        } else {
            state.wishlist.push(action.payload)
        }
    },
    REMOVE_WISH: (state, action) => {
        state.wishlist = state.wishlist.filter((item) => item.id !== action.payload)
    },
    RESET_WISH: (state) => {
        state.wishlist = []
    },
    TOGGLE_NIGHT: (state) => {
        state.nightmode = !state.nightmode
    }
  }
})


export const { ADD_TO_CART, REMOVE_ITEM, RESET_CART, ADD_TO_WISH, REMOVE_WISH, RESET_WISH, TOGGLE_NIGHT } = contextSlice.actions

export default contextSlice.reducer