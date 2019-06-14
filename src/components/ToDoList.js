import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoList = () => {
    return(
        <ul className="todo-list">
            <ToDoItem />
            <ToDoItem />
        </ul>
    );
};

export default ToDoList;