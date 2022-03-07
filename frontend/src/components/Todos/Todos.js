import {useEffect, Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {requestTodosAll, requestAddTodo} from "../../store/todos-actions";
import TodosList from "./TodosList";
import AddTodo from "./AddTodo";
import RingLoader from 'react-spinners/RingLoader';
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Todos = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);
    const is_loading = useSelector((state) => state.info.is_loading);
    const has_todos = todos.length > 0;

    useEffect(() => {
        dispatch(requestTodosAll());
    }, [dispatch]);

    const addInput = (title, description) => {
        dispatch(requestAddTodo({
            title: title ,
            description: description
        }));
    };

    return (
        <Fragment>
            {!is_loading && <AddTodo addInput={addInput}/>}
            {is_loading && <RingLoader css={override} size={250} />}
            {(!has_todos && !is_loading) && <h2>Empty Todos-list.. please add a Todo to get started</h2>}
            {has_todos && <TodosList todos={todos} /> }
        </Fragment>
    );
};

export default Todos;
