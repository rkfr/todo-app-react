import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoList = () => {
    return(
        <ul className="todo-list">
            <ToDoItem />
        </ul>
    );
};

export default ToDoList;