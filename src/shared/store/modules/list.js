import { createSlice } from '@reduxjs/toolkit';

//초기값
const initialState = {};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addList: (state, action) => {
      return (state = action.payload);
    }
  }
});

export const { addList } = listSlice.actions;

export default listSlice.reducer;
