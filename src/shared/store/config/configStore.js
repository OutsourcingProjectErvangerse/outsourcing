import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../modules/test';
import search from '../modules/search';
import list from '../modules/list';
import connection from '../modules/listConnection';

export default configureStore({
  reducer: {
    tod: todoReducer,
    search,
    list,
    connection
  }
});
