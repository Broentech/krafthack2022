import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth' ,
    initialState: {
        token: null,
        email: null,
        expiresIn: null,
        is_logged_in: false
    } ,
    reducers: {
        setToken(state, action) {
            if (action && action.payload && action.payload.token) {
                state.token = action.payload.token;
                state.email = action.payload.email;
                state.expiresIn = action.payload.expiresIn;
                state.is_logged_in = (state.token.length > 0);
                state.failed = null;
            } else {
                console.log('authSlice::setToken - Invalid payload')
            }
        } ,
        logOut(state) {
            state.token = null;
            state.email = null;
            state.expiresIn = null;
            state.is_logged_in = false;
            state.failed = null;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;
