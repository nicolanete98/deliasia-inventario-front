import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status:'Checking',
    id:null,
    user:null,
    error:null,
    token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state,action) => {
        state.status = 'Authenticated'
        state.token = action.payload.token
    },
    logout: (state,action) => {
      state.status = 'Not-authenticated'
      state.token = 'asdasdasdasd'
    },
    checklogin: (state) => {
      state.status = 'Checking'
    }
  }
});

export const {login, logout, checklogin} = authSlice.actions

export default authSlice.reducer