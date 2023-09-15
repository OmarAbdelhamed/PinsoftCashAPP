import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  userId: '',
  targetId: '',
  user: '',
  balance: 0,
  balanceToBeSent: null,
};

export const cashSlice = createSlice({
  name: 'cash',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setTargetId: (state, action) => {
      state.targetId = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setbalanceToBeSent: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTargetId,
  setUserId,
  setUser,
  setToken,
  setBalance,
  setbalanceToBeSent,
} = cashSlice.actions;

export default cashSlice.reducer;
