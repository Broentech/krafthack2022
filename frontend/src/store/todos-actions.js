import axios from 'axios';
import store from "./index";
import {todosActions} from "./todos-slice";
import {errorActions} from "./error-slice";
import {infoActions} from "./info-slice";

const GET_TODO_ALL_URL = 'http://localhost:8899/todo/all';
const POST_TODO_URL = 'http://localhost:8899/todo';

export const requestTodosAll = () => {
    return async (dispatch) => {
        const get_todos = async () => {
            const headers = {
                'Authorization' : store.getState().auth.token.toString() ,
                'Content-Type' : 'application/json'
            };
            const response = await axios(GET_TODO_ALL_URL, {
                // mode : 'no-cors' ,
                headers : headers
            });
            return response.data;
        };

        try {
            dispatch(infoActions.setIsLoading());
            const ret = await get_todos();
            dispatch(infoActions.setLoadingCompleted());
            dispatch(todosActions.setTodos({
                todos : ret
            }));
        } catch (error) {
            dispatch(infoActions.setLoadingCompleted());
            dispatch(errorActions.setError({
                errorTitle: 'Failed to retrieve Todos' ,
                errorMessage: error.toString()
            }));
        }
    };
};

export const requestAddTodo = (todoObj) => {
    return async (dispatch) => {
        const addTodo = async () => {
            const headers = {
                'Authorization' : store.getState().auth.token.toString() ,
                'Content-Type' : 'application/json'
            };
            const response = await axios.post(POST_TODO_URL , {
                title : todoObj['title'] ,
                description : todoObj['description']
            } , {
                headers : headers
            });
            if (!response || !response.data) {
                throw new Error('Signup failed');
            }
            return response.data;
        };

        try {
            dispatch(infoActions.setIsLoading());
            const ret = await addTodo();
            dispatch(infoActions.setLoadingCompleted());
            dispatch(todosActions.addTTodo({
                todo : ret
            }));
        } catch (error) {
            dispatch(infoActions.setLoadingCompleted());
            dispatch(errorActions.setError({
                errorTitle: 'Failed to add Todo' ,
                errorMessage: error.toString()
            }));
        }
    }
};

export const requestDeleteTodo = (id) => {
    return async (dispatch) => {
        const deleteTodo = async () => {
            const headers = {
                'Authorization' : store.getState().auth.token.toString() ,
                'Content-Type' : 'application/json'
            };
            const url = POST_TODO_URL + '/' + id;
            const response = await axios.delete(url ,
                {headers : headers});
            if (!response || !response.data) {
                throw new Error('Signup failed');
            }
            return response.data;
        };

        try {
            dispatch(infoActions.setIsLoading());
            await deleteTodo();
            dispatch(infoActions.setLoadingCompleted());
            dispatch(todosActions.deleteTodo({
                id : id
            }));
        } catch (error) {
            dispatch(infoActions.setLoadingCompleted());
            dispatch(errorActions.setError({
                errorTitle: 'Failed to delete Todos' ,
                errorMessage: error.toString()
            }));
        }
    }
};
