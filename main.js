const inputBox = document.getElementById('inputBox');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('list-container');
const completedCounter = document.getElementById('completed-counter');
const uncompletedCounter = document.getElementById('uncompleted-counter');

// Función para agregar una nueva tarea
const addTask = () => {
    const task = inputBox.value.trim();
    if (!task) {
        alert('Por favor ingrese una tarea!!');
        return;
    }

    // Crear un nuevo elemento de lista
    const listItem = document.createElement('li');

    // Crear un checkbox para marcar la tarea como completada
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', updateCounters);

    // Crear un elemento de texto para la tarea
    const taskText = document.createElement('span');
    taskText.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className="eliminar-boton";
    deleteButton.addEventListener('click', () => {
        listItem.remove();
        updateCounters();
    });

    // Agregar el checkbox , el texto al elemento de lista y el boton para eliminar
    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(deleteButton);

    // Agregar la tarea a la lista
    taskList.appendChild(listItem);

    // Limpiar el cuadro de texto
    inputBox.value = '';

    // Actualizar los contadores
    updateCounters();
};

// Función para actualizar los contadores de tareas completadas y no completadas
const updateCounters = () => {
    const completedTasks = document.querySelectorAll('input[type="checkbox"]:checked').length;
    const uncompletedTasks = document.querySelectorAll('li:not(.completed)').length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = taskList.children.length - completedTasks;
};

// click del botón para agregar una tarea
addTaskButton.addEventListener('click', addTask);

// Función para marcar una tarea como completada o no completada
taskList.addEventListener('change', (event) => {
    const checkbox = event.target;
    const listItem = checkbox.parentElement;

    if (checkbox.checked) {
        listItem.classList.add('completed');
    } else {
        listItem.classList.remove('completed');
    }

    updateCounters();
});
