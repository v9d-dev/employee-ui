import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fullName: '',
    overallExperience: 0,
    primaryKeySkill: '',
    secondaryKeySkill: ''
}

export const employeeListFilterSlice = createSlice({
    name: 'employeeListFilter',
    initialState,
    reducers: {
        updateName: (state, action) => {
            state.fullName = action.payload.fullName;
        },
        updateOverAllExp: (state, action) => {
            state.overallExperience = action.payload.overallExperience;
        },
        updatePrimarySkill: (state, action) => {
            state.primaryKeySkill = action.payload.primaryKeySkill;
        },
        updateSecondarySkill: (state, action) => {
            state.secondaryKeySkill = action.payload.secondaryKeySkill;
        },
        reset: (state)=>{
            state.fullName = '';
            state.overallExperience = 0;
            state.primaryKeySkill = '';
            state.secondaryKeySkill = '';
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateName,  updateOverAllExp, updatePrimarySkill, updateSecondarySkill, reset } = employeeListFilterSlice.actions

export default employeeListFilterSlice.reducer;