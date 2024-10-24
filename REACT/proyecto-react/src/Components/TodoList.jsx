import React from 'react';

const TodoList =({todos, removeTodo, toggleComplete}) =>{
    return (
        <ul>
            {todos.map((todo, index) =>( 
                <li key={index}
                    className= {todo.completed ? 'completed': ''}
                    onClick = {() => toggleComplete (index)}
                    >
                    {todo.text}
                    <button  className='bg-blue-950 text-indigo-100 j '
                        onClick= {(event) =>{
                   }}>Editar</button> 

                   <button  className='bg-blue-950 text-indigo-100 j '
                        onClick= {(event) =>{
                        event.stopPropagation();
                        removeTodo(index);
                   }}>Eliminar</button> 
                    
                </li>
            ))}    
        </ul>
    )
}

export default TodoList;
