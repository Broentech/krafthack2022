import { createSlice} from "@reduxjs/toolkit";

const infoSlice = createSlice({
    name: 'info' ,
    initialState: {
        is_loading : false
    } ,
    reducers: {
        setIsLoading(state) {
            state.is_loading = true;
        } ,
        setLoadingCompleted(state) {
            state.is_loading = false;
        }
    }
});

export const infoActions = infoSlice.actions;
export default infoSlice;
