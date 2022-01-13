import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

export const pocFilterSlice = createSlice({
    name: 'pocFilter',
    initialState,
    reducers: {
        update: (state, action) => {
            state.name = action.payload.fullName;
            state.techStack = action.payload.techStack
        }
    },
})

// Action creators are generated for each case reducer function
export const { update } = pocFilterSlice.actions

export default pocFilterSlice.reducer;