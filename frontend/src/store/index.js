import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import errorSlice from "./error-slice";
import infoSlice from "./info-slice";
import predictionsSlice from "./predictions-slice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer ,
        error : errorSlice.reducer ,
        info : infoSlice.reducer ,
        pred : predictionsSlice.reducer
    }
});

export default store;
