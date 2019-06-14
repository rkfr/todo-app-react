import React from 'react';

const ToDoItem = () => (
    <li className="todo-list__item">
        <div className="todo-list__content">
            <input 
                type="checkbox"
                className="todo-list__checkbox"
            />
            <label className="todo-list__task-text">task 1</label>
            <button className="remove">×</button>
        </div>
    </li>
);

export default ToDoItem;