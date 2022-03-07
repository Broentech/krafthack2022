import { createSlice} from "@reduxjs/toolkit";

const infoSlice = createSlice({
    name: 'info' ,
    initialState: {
        is_loading : false ,
        recently_updated_buyreq : false ,
        recently_updated_sellreq : false
    } ,
    reducers: {
        setIsLoading(state) {
            state.is_loading = true;
        } ,
        setLoadingCompleted(state) {
            state.is_loading = false;
        } ,
        setRecentlyUpdatedBuyReq(state, action) {
            if (action && action.payload) {
                state.recently_updated_buyreq = action.payload.val;
            }
        } ,
        setRecentlyUpdatedSellReq(state, action) {
            if (action && action.payload) {
                state.recently_updated_sellreq = action.payload.val;
            }
        }
    }
});

export const infoActions = infoSlice.actions;
export default infoSlice;
