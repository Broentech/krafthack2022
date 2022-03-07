import { authActions } from "./auth-slice";
import { errorActions } from "./error-slice";
import { infoActions } from "./info-slice";
import axios from 'axios';

const FIREBASE_API_KEY = 'AIzaSyCV3Wk9tNZPbotHg9lF9xDbzgm0e4-xEUI';
const LOGIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + FIREBASE_API_KEY;
const SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + FIREBASE_API_KEY;

export const requestLoginToken = (userObj, is_logIn = false) => {
    return async (dispatch) => {
        const login = async () => {
            let url;
            if (is_logIn) {
                url = LOGIN_URL;
            } else {
                url = SIGNUP_URL
            }
            const response = await axios.post(url , {
                email: userObj.email ,
                password: userObj.password});
            if (!response || !response.data) {
                throw new Error('Signup failed');
            }
            return response.data;
        };

        try {
            dispatch(infoActions.setIsLoading());
            const ret = await login();
            dispatch(infoActions.setLoadingCompleted());
            dispatch(authActions.setToken({
                token : ret.idToken ,
                email : userObj.email ,
                expiresIn : +ret.expiresIn
            }));
        } catch (error) {
            dispatch(infoActions.setLoadingCompleted());
            dispatch(errorActions.setError({
                errorTitle: 'Authentication failed' ,
                errorMessage: error.toString()
            }));
        }
    };
};

