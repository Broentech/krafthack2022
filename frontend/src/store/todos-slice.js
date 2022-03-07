import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
    name: 'todos' ,
    initialState: {
        todos: []
    } ,
    reducers: {
        setTodos(state, action) {
            if(action && action.payload && action.payload.todos) {
                state.todos = action.payload.todos;
            }
        },
        addTTodo(state, action) {
            if (action && action.payload && action.payload.todo) {
                state.todos.push(action.payload.todo);
            }
        },
        deleteTodo(state, action) {
            if (action && action.payload && action.payload.id) {
                state.todos = state.todos.filter(item => item._id !== action.payload.id);
            }
        }
    }
});

export const todosActions = todosSlice.actions;
export default todosSlice;
