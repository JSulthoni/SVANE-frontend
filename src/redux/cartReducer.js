import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    wishlist: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const item = state.products.find((item) => item.id === action.payload.id)
        
        if (item) {
            item.quantity += action.payload.quantity
        } else {
            state.products.push(action.payload)
        }
    },
    removeItem: (state, action) => {
      state.products = state.products.filter((item) => item.id !== action.payload)
    },
    resetCart: (state) => {
      state.products = []
    },
    addToWish: (state, action) => {
      const item = state.wishlist.find((item) => item.id === action.payload.id)      
      if (item) {
        item.quant += action.payload.quant
      } else {
        state.wishlist.push(action.payload)
    }
    },
    removeWish: (state, action) => {
      state.wishlist = state.wishlist.filter((item) => item.id !== action.payload)
    },
    resetWish: (state) => {
      state.wishlist = []
    }
  }
})


export const { addToCart, removeItem, resetCart, addToWish, removeWish, resetWish } = cartSlice.actions

export default cartSlice.reducer