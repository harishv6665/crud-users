import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../pages/Users/UsersSlice';

export default configureStore({
  reducer: {
    users: usersReducer
  },
});
