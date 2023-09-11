import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:'',
  balance: 0,
  balanceToBeSent:null

}

export const cashSlice = createSlice({
  name: 'cash',
  initialState,
  reducers: {
    setUser: (state , action) => {
      state.user = action.payload
    },
    setBalance: (state ,action ) => {
      state.balance = action.payload
    },
    setbalanceToBeSent: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setBalance, setbalanceToBeSent } = cashSlice.actions

export default cashSlice.reducer