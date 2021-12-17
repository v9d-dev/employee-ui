import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeDetails';

export default configureStore({
  reducer: {employeeReducer},
})