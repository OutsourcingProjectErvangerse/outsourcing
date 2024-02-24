import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    changeSearchText: (state, action) => {
      return (state = action.payload);
    }
  }
});

export const { changeSearchText } = searchSlice.actions;
export default searchSlice.reducer;
