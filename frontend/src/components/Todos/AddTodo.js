
import {useRef} from 'react';
import classes from './AddTodo.module.css';

const AddTodo = (props) => {

    const titleInput = useRef();
    const descriptionInput = useRef();

    const submitHandler = event => {
        event.preventDefault();
        props.addInput(titleInput.current.value, descriptionInput.current.value);
        descriptionInput.current.value = '';
        titleInput.current.value = '';
    };

    return (
        <section className={classes.addtodo}>
            <form onSubmit={submitHandler}>
                <h1>Add New Todo</h1>
                <div className={classes.control}>
                    <label>Title</label>
                    <input type="text" required ref={titleInput}/>
                </div>
                <div className={classes.control} >
                    <label>Description</label>
                    <textarea cols="50" rows="10" required ref={descriptionInput}/>
                </div>
                <div className={classes.actions}>
                    <button
                        type="submit">OK - Add Todo</button>
                </div>
            </form>
        </section>
    );
};

export default AddTodo;
