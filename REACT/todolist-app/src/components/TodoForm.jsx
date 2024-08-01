import { useState } from "react";

const TodoForm = ({addTodo}) => {

    const [title,setTitle] = useState('')

    const handleSubmit =(e) => {
        e.preventDefault();
        if (title.trim()) {
            addTodo(title);
            setTitle('');
        }
    }
    return (
         
            <form className="mt-4 relative flex" onSubmit = {handleSubmit}>
                <input
                    type="text"
                    value={title}
                    className=" focus:shadow-xl pl-12 w-full py-4 bg-cyan-950 rounded-full"
                    onChange={(e) => setTitle(e.target.value)}
                placeholder= "Agregar una nueva tarea"
               />
             <button className="px-7 py-5 bg-gray-900 rounded-full" type= "Submit">+</button>
            </form>
    );

}

export {TodoForm};