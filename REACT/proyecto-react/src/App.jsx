import React, { useState, useEffect } from 'react';
import{ Routes, Route} from 'react-router-dom'
import Header from "c:/Users/Notebook/OneDrive/Escritorio/HTML/REACT/proyecto-react/src/Components/Header";
import TodoForm from "c:/Users/Notebook/OneDrive/Escritorio/HTML/REACT/proyecto-react/src/Components/TodoForm";
import TodoList from "c:/Users/Notebook/OneDrive/Escritorio/HTML/REACT/proyecto-react/src/Components/TodoList";
import TaskDetails from "c:/Users/Notebook/OneDrive/Escritorio/HTML/REACT/proyecto-react/src/Components/TaskDetails"
import Navigation from "c:/Users/Notebook/OneDrive/Escritorio/HTML/REACT/proyecto-react/src/Components/Navigation"

const App = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = (task) => {
        setTodos([...todos,{text: task, completed:false}]);
    };

    const removeTodo = (index) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);

    }

    const toggleComplete = (index) => {
      const newTodos = [...todos];
      newTodos[index].completed = !newTodos[index].completed;
      setTodos(newTodos);
  };

    useEffect(() => {
     localStorage.setItem('todos',JSON.stringify(todos));
    }, [todos])

    useEffect(() =>{
      const savedTodos = JSON.parse(localStorage.getItem('todos'));
      if (savedTodos) {
        setTodos(savedTodos);
      }
    }, []);

    return (
        <div className="bg-cyan-900 text-gray-200 flex items-center justify-center py-20 px-4 min-h-screen h-full ">
            <div className="container flex flex-col max-w-xl">
            <Header />
            <Navigation />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <TodoForm addTodo={addTodo} />
                            {todos.length===0? (
                              <p className='text-center'> NO HAY TAREAS EN LA LISTA </p>
                            ) : (
                              <TodoList todos={todos} removeTodo={removeTodo} toggleComplete={toggleComplete} />
                          )}
                        </>
                    }
                />
                <Route path="/details/:taskId" element={<TaskDetails />} />
            </Routes>
          </div> 
        </div>
    );
};

export default App;
