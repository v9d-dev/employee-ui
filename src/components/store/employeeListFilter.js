import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

export const employeeListFilterSlice = createSlice({
    name: 'employeeListFilter',
    initialState,
    reducers: {
        update: (state, action) => {
            state.fullName = action.payload.fullName;
            state.overallExperience = action.payload.overallExperience
            state.successiveExperience = action.payload.successiveExperience
            state.primaryKeySkill = action.payload.primaryKeySkill
        }
    },
})

// Action creators are generated for each case reducer function
export const { update } = employeeListFilterSlice.actions

export default employeeListFilterSlice.reducer;