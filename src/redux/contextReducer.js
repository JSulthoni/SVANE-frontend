import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    wishlist: [],
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
            state.products = [...state.products, action.payload]
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
})


export const { ADD_TO_CART, REMOVE_ITEM, RESET_CART, ADD_TO_WISH, REMOVE_WISH, RESET_WISH } = contextSlice.actions

export default contextSlice.reducer