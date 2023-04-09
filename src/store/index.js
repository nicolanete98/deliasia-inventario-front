import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../functions/testFunctionSlice/'
import authSlice from './auth/authSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice
  },
})