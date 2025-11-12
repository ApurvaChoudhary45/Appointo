import { configureStore } from '@reduxjs/toolkit'
import { darkReducer } from './Dark/dark'

export const store =  configureStore({
  reducer: {
    darker : darkReducer
  }
})