import { createSlice } from '@reduxjs/toolkit';

//
//초기값 설정
const initialState = {};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    //추가하기
    addTodo: (state, action) => {
      return [...state, action.payload];
    },
    //삭제하기
    removeTodo: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    //수정하기
    switchTodo: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, isDone: !item.isDone };
        } else {
          return item;
        }
      });
    }
  }
});

export const { addTodo, removeTodo, switchTodo } = todoSlice.actions;
export default todoSlice.reducer;
