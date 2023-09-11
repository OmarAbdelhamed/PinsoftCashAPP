import { configureStore } from '@reduxjs/toolkit'
import cashSlice from './cashSlice'

export const store = configureStore({
  reducer: {
    cash: cashSlice,
  },
})