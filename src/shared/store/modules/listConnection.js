import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    getClick: (state, action) => {
      return (state = action.payload);
    }
  }
});

export const { getClick } = connectionSlice.actions;
export default connectionSlice.reducer;
