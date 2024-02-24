import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../modules/test';
import search from '../modules/search';

export default configureStore({
  reducer: {
    tod: todoReducer,
    search
  }
});
