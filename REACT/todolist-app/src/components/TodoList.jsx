import React from "react";
import { Tarea } from "./Tarea";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './TodoList.css';

const TodoList = ({ todos, handleSetComplete, handleDelete, handleEditTodo }) => {
    return (
        <div className="flex flex-col mt-6 rounded-lg overflow-hidden shadow-2xl">
            {todos.length === 0 ? (
                <p className="text-center bg-gray-900 text-white py-4">No hay tareas pendientes</p>
            ) : (
                <>
                    <p className="text-center bg-gray-900 text-white py-4">
                        Tienes {todos.length} {todos.length === 1 ? 'tarea' : 'tareas'}
                    </p>
                    <TransitionGroup component="div" className="todo-list">
                        {todos.map(todo => (
                            <CSSTransition
                                key={todo.id}
                                timeout={300} 
                                classNames="fade"
                            >
                                <Tarea
                                    todo={todo}
                                    handleSetComplete={handleSetComplete}
                                    handleDelete={handleDelete}
                                    handleEditTodo={handleEditTodo}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </>
            )}
        </div>
    );
};

export { TodoList };