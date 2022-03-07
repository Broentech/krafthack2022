import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import todosSlice from "./todos-slice";
import errorSlice from "./error-slice";
import infoSlice from "./info-slice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer ,
        todos: todosSlice.reducer ,
        error : errorSlice.reducer ,
        info : infoSlice.reducer
    }
});

export default store;
