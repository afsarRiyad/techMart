import { configureStore } from '@reduxjs/toolkit'
import  counterReducer  from '../features/counter/counterSlice'
import productPageReducer from '../features/products/productPageSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    productPage: productPageReducer,
  },
})