import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
    name: 'error' ,
    initialState: {
        error : {}
    },
    reducers: {
        setError(state, action) {
            if (action && action.payload && action.payload.errorTitle && action.payload.errorMessage) {
                state.error.title = action.payload.errorTitle;
                state.error.message = action.payload.errorMessage;
            }
        },
        clearError(state) {
            state.error.title = null;
            state.error.message = null;
        }
    }
});

export const errorActions = errorSlice.actions;
export default errorSlice;
