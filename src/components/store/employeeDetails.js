import { createSlice } from '@reduxjs/toolkit';
import employeeDetails from './employee.json';

const initialState = {
    ...employeeDetails
}

export const employeeDetailSlice = createSlice({
  name: 'employeeDetail',
  initialState,
  reducers: {
    update: (state, action) => {


    state.name = action.payload.name;
    state.emailId= action.payload.emailId;
    state.phoneNumber = action.payload.phoneNumber;
    state.employeeId =  action.payload.employeeId
    state.buHead= action.payload.buHead
    state.reportingManagaer= action.payload.reportingManagaer
    state.dateOfJoining= action.payload.dateOfJoining
    state.dateOfBirth = action.payload.dateOfBirth
    state.overAllExperience= action.payload.overAllExperience
    state.successiveExperience = action.payload.successiveExperience
    state.currentDesignation = action.payload.currentDesignation
    state.previousDesignation = action.payload.previousDesignation
    state.earlierProject =action.payload.earlierProject
    state.currentProject = action.payload.currentProject
    state.projectType = action.payload.projectType
    state.primarySkills = action.payload.primarySkills
    state.secondraySkills = action.payload.secondraySkills
    }
  },
})

// Action creators are generated for each case reducer function
export const { update } = employeeDetailSlice.actions

export default employeeDetailSlice.reducer