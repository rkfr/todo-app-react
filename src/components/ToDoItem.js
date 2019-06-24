import React from 'react';

const ToDoItem = ({
                task,
                removeTask,
                taskId,
                statusHandler,
                editTask
            }) => {

    const {status, text} = task,
        taskClassName = (status === 'active') ? 'todo-list__task-text' : 'todo-list__task-text todo-list__task-text--completed';
    
    return(
    <li 
        className="todo-list__item"
        onDoubleClick={() => {
            editTask(task, taskId);
        }}
    >
        <div className="todo-list__content">
            <input 
                type="checkbox"
                className="todo-list__checkbox"
                onClick={() => statusHandler(taskId)}
            />
            <label className={taskClassName}>{text}</label>
            <button 
                className="remove"
                onClick={() => removeTask(taskId)}
            >×</button>
        </div>
    </li>
    )
};

export default ToDoItem;