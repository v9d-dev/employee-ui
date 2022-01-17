import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeDetails';
import certificationFilterReducer from './certificationFilter';
import employeeListFilterReducer from './employeeListFilter';
import pocFilterReducer from './pocFilter';

export default configureStore({
  reducer: { employeeReducer, employeeListFilterReducer, certificationFilterReducer, pocFilterReducer },
})