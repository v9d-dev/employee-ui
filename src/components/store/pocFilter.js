import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    techStack:''
}

export const pocFilterSlice = createSlice({
    name: 'pocFilter',
    initialState,
    reducers: {
        updateName: (state, action) => {
            state.name = action.payload.name;
        },
        updateTechStack: (state, action) => {
            state.techStack = action.payload.techStack;
        },
        reset: (state)=>{
            state.name = '';
            state.techStack = '';
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateName,  updateTechStack, reset } = pocFilterSlice.actions

export default pocFilterSlice.reducer;