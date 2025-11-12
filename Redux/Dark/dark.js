import { createSlice } from '@reduxjs/toolkit'

export const darkSlice = createSlice({
  name: 'darker',
  initialState: {
    darkMode: false
  },
  reducers: {
    isDark: state => {
        state.darkMode = !state.darkMode
    },
    
  }
})

export const { isDark} = darkSlice.actions

export const darkReducer =  darkSlice.reducer