import { useState } from "react";
import { Link } from 'react-router-dom';

const Tarea = ({ todo, handleSetComplete, handleDelete, handleEditTodo }) => {
  const { id, title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    handleEditTodo(id, newTitle);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-cyan-950">
      <div className="flex items-center">
        {completed ? (
          <div onClick={() => handleSetComplete(id)} className="p-1 rounded-full cursor-pointer">
            <img className="h-7 w-7 " src="./check-icon.svg" alt="Check Icon" />
          </div>
        ) : (
          <span onClick={() => handleSetComplete(id)} className="border border-white border-solid p-3 rounded-full cursor-pointer"></span>
        )}
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleChange}
            className="pl-2 ml-1 bg-cyan-800 rounded-xl w-96 text-white"
          />
        ) : (
          <Link to={`/todos/${id}`} className={"pl-3 " + (completed && "line-through")}>
            {title}
          </Link>
        )}
      </div>
      <div className="flex">
        {isEditing ? (
          <img
            onClick={handleSaveClick}
            className="mr-4 h-7 w-7 cursor-pointer transition-all"
            src="save-icon.svg"
            alt="Save Edit"
          />
        ) : (
          <img
            onClick={handleEditClick}
            className="h-7 w-7 cursor-pointer transition-all mr-4"
            src="edit-icon.svg"
            alt="Edit Icon"
          />
        )}
        <img
          onClick={() => handleDelete(id)}
          className="h-7 w-7 cursor-pointer transition-all"
          src="/delete-icon.svg"
          alt="Delete Icon"
        />
      </div>
    </div>
  );
};

export { Tarea };