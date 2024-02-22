import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../modules/test';

export default configureStore({
  reducer: {
    tod: todoReducer
  }
});
