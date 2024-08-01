import React from 'react';
import { useParams, Link } from 'react-router-dom';

const TodoDetail = ({ todos }) => {
  const { id } = useParams();
  const todo = todos.find((todo) => todo.id === parseInt(id, 10));

  if (!todo) {
    return  <p className="text-white">Tarea no encontrada</p>;
  }

  return (
    <div className="text-white">
      <h2>Detalles de la Tarea</h2>
      <p>ID de la Tarea: {todo.id}</p>
      <p>Título: {todo.title}</p>
      <p>Completado: {todo.completed ? 'Sí' : 'No'}</p>
      <Link to="/" className="text-blue-500 underline">Volver a la lista de tareas</Link>
    </div>
  );
  
};

export default TodoDetail;