
import TodoItem from "./TodoItem";
import classes from './TodosList.module.css'
import Card from "../UI/Card";

const TodosList = (props) => {

    const todos = props.todos.map(todo => (
        <TodoItem
            key={todo._id}
            id={todo._id}
            title={todo.title}
            description={todo.description}
        />
    ));

    return (
        <section className={classes.todoslist}>
            <p>Num todos : {todos.length}</p>
            <Card>
                <ul>{todos}</ul>
            </Card>
        </section>
    );
};

export default TodosList;
