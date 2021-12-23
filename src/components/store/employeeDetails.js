import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

export const employeeDetailSlice = createSlice({
  name: 'employeeDetail',
  initialState,
  reducers: {
    update: (state, action) => {
    state.fullName = action.payload.fullName;
    state.mailId= action.payload.mailId;
    state.mobileNumber = action.payload.mobileNumber;
    state.employeeNumber =  action.payload.employeeNumber
    state.buHead= action.payload.buHead
    state.reportingManager= action.payload.reportingManager
    state.dateOfJoining= action.payload.dateOfJoining
    state.dateOfBirth = action.payload.dateOfBirth
    state.overallExperience= action.payload.overallExperience
    state.successiveExperience = action.payload.successiveExperience
    state.currentDesignation = action.payload.currentDesignation
    state.previousDesignation = action.payload.previousDesignation
    state.earlierProject =action.payload.earlierProject
    state.currentProject = action.payload.currentProject
    state.projectType = action.payload.projectType
    state.primaryKeySkill = action.payload.primaryKeySkill
    state.secondaryKeySkill = action.payload.secondaryKeySkill
    }
  },
})

// Action creators are generated for each case reducer function
export const { update } = employeeDetailSlice.actions

export default employeeDetailSlice.reducer