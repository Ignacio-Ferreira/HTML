import React from 'react'
import{ useParams} from 'react-router-dom'

const TaskDetails= () => {
    const { taskId } = useParams();

    return (
        <div>
            <h2>Detalles de la tarea</h2>
            <p>Mostrando detalles para la tarea :{taskId} </p>
        </div>
    )
}

export default TaskDetails;

