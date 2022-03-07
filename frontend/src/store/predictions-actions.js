import axios from 'axios';
import store from "./index";
import {errorActions} from "./error-slice";
import {infoActions} from "./info-slice";
import {authActions} from "./auth-slice";

//const GET_MODELS_ALL_URL = 'http://localhost:5000/getmodels';
const GET_MODELS_ALL_URL = 'https://krafthack2022-hbr5fwevba-uc.a.run.app/getmodels'

export const requestModels = () => {
    return async (dispatch) => {
        const get_models = async () => {
            const headers = {
                'Authorization' : store.getState().auth.token.toString() ,
                'Content-Type' : 'application/json'
            };
            const response = await axios(GET_MODELS_ALL_URL, {
                headers : headers
            });
            return response.data;
        };

        try {
            dispatch(infoActions.setIsLoading());
            const ret = await get_models();
            dispatch(infoActions.setLoadingCompleted());
            console.log('MODELS : ' , ret);
            // dispatch(todosActions.setTodos({
            //     todos : ret
            // }));
        } catch (error) {
            dispatch(authActions.logOut());
            dispatch(infoActions.setLoadingCompleted());
            dispatch(errorActions.setError({
                errorTitle: 'Failed to retrieve Todos' ,
                errorMessage: error.toString()
            }));
        }
    };
};
