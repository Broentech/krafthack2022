import { authActions } from "./auth-slice";
import { errorActions } from "./error-slice";
import { infoActions } from "./info-slice";
import axios from 'axios';
import store from "./index";

const FIREBASE_API_KEY = 'AIzaSyCV3Wk9tNZPbotHg9lF9xDbzgm0e4-xEUI';
const LOGIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + FIREBASE_API_KEY;
const SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + FIREBASE_API_KEY;

const USER_URL = 'http://localhost:8080/user';

export const requestLoginToken = (userObj, is_logIn = false) => {
    return async (dispatch) => {

        const login = async (url , user) => {
            const response = await axios.post(url , user);
            if (!response || !response.data) {
                throw new Error('Signup/login failed');
            }
            return response.data;
        };

        try {
            dispatch(infoActions.setIsLoading());
            let url;
            if (is_logIn) {
                url = LOGIN_URL;
            } else {
                url = SIGNUP_URL
            }
            const ret = await login(url , {
                email: userObj.email ,
                password: userObj.password}
            );
            dispatch(authActions.setToken({
                token : ret.idToken ,
                email : userObj.email ,
                expiresIn : +ret.expiresIn
            }));
            dispatch(infoActions.setLoadingCompleted());

        } catch (error) {
            dispatch(infoActions.setLoadingCompleted());
            dispatch(errorActions.setError({
                errorTitle: 'Authentication failed' ,
                errorMessage: error.toString()
            }));
        }
    };
};

export const requestPostUser = (tokenObj) => {
    return async (dispatch) => {
        const postUser = async () => {
            const headers = {
                'Content-Type' : 'application/json'
            };
            const response = await axios.post(USER_URL , tokenObj, {headers:headers});
            if (!response || response.status !== 200) {
                throw new Error('Failed to delete user : ' + response.statusText);
            }
            return response.data;
        };

        try {
            const ret = await postUser();
            dispatch(authActions.setToken(tokenObj));
        } catch (error) {
            dispatch(errorActions.setError({
                errorTitle: 'Opps. Det skjedde en feil da vi skulle slette deg.' ,
                errorMessage: error.toString()
            }));
        }
    };
};

export const requestDeleteUser = () => {
    return async (dispatch) => {
        const deleteUser = async () => {
            const headers = {
                'Authorization' : store.getState().auth.token.toString() ,
                'Content-Type' : 'application/json'
            };
            const response = await axios.delete(USER_URL , {headers:headers});
            if (!response || response.status !== 200) {
                throw new Error('Failed to delete user : ' + response.statusText);
            }
            return response.data;
        };

        try {
            const ret = await deleteUser();
            dispatch(authActions.logOut());
        } catch (error) {
            dispatch(errorActions.setError({
                errorTitle: 'Opps. Det skjedde en feil da vi skulle slette deg.' ,
                errorMessage: error.toString()
            }));
        }
    };
};

