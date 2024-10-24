import React, {useState} from 'react';

const TodoForm = ({ addTodo }) => {
    const[ task, setTask] = useState('')

    const handleSubmit =(event) => {
        event.preventDefault();
        if (task.trim()) {
            addTodo(task);
            setTask('');
        }
    }


    return(
        <form className="mt-4 relative flex" onSubmit = {handleSubmit}>
            <input
                type="text"
                value={task}
                className='" focus:shadow-xl pl-12 w-full py-4 bg-cyan-950 rounded-full"'
                onChange={(event) => setTask(event.target.value)}
                placeholder= "Agregar una nueva tarea"
               
                />
             <button className="px-7 py-5 bg-gray-950 rounded-full" type= "Submit">+</button>
        </form>
    );

}

export default TodoForm;