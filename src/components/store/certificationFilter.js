import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  techStack:[]
}

export const certificationSlice = createSlice({
    name: 'certificationFilter',
    initialState,
    reducers: {
        updateName: (state, action) => {
            state.name = action.payload.name;
        },
        updateTechStack: (state, action) => {
        console.log('state :', state);
        console.log('qqqqqqqqqqqqq', action.payload.techStack);
            state.techStack = action.payload.techStack;
        },
        reset: (state)=>{
            state.name = '';
            state.techStack = [];
        }
    },
    
})

// Action creators are generated for each case reducer function
export const { updateName,  updateTechStack, reset} = certificationSlice.actions

export default certificationSlice.reducer;