import React from "react"
import {NavLink} from 'react-router-dom'
import "c:/Users/Notebook/OneDrive/Escritorio/HTML/REACT/proyecto-react/src/Components/Navigation.css";

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to = "/" exact activeClassName= "active">
                        LISTA DE TAREAS
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/details/1" activeClassName="active">
                        DETALLES DE LA TAREA
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;
