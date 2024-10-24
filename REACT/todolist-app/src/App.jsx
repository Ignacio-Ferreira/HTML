import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { useState, useEffect } from 'react';
import TodoDetail from './components/TodoDetail'; 

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title) => {
    const lastId = todos.length > 0 ? todos[todos.length - 1].id : 0;

    const newTodo = {
      id: lastId + 1,
      title,
      completed: false,
    };

    const todoList = [...todos, newTodo];
    setTodos(todoList);
  };

  const handleSetComplete = (id) => {
    const updatedList = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedList);
  };


  const handleDelete = (id) => {
    const updatedList = todos.filter((todo) => todo.id !== id);
    setTodos(updatedList);
  };

  const handleEditTodo = (id, newTitle) => {
    const updatedList = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      }
      return todo;
    });
    setTodos(updatedList);
  };

  return (
    <div className="bg-cyan-900 text-gray-200 flex items-center justify-center py-20 px-4 min-h-screen h-full">
      <div className="container flex flex-col max-w-xl">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TodoForm addTodo={addTodo} />
                <TodoList
                  todos={todos}
                  handleSetComplete={handleSetComplete}
                  handleDelete={handleDelete}
                  handleEditTodo={handleEditTodo}
                />
              </>
            }
          />
          <Route path="/todos/:id" element={<TodoDetail todos={todos} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;