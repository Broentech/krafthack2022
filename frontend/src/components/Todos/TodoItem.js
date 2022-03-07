
import {useDispatch} from "react-redux";
import {requestDeleteTodo} from "../../store/todos-actions";

const TodoItem = (props) => {
    const dispatch = useDispatch();

    const deleteButtonClicked = () => {
        dispatch(requestDeleteTodo(props.id));
    };

    return (
        <li>
            <h1>{props.title} ({props.id})</h1>
            <p>{props.description}</p>
            <button onClick={deleteButtonClicked}>DELETE</button>
        </li>
    );
};

export default TodoItem;
