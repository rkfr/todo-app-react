import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoList = props => {
    const {tasks, removeTask, statusHandler} = props;

    return(
        <ul className="todo-list">
            {tasks.map((task, idx) => (
                <ToDoItem 
                    task={task} 
                    key={idx}
                    taskId={idx}
                    removeTask={removeTask}
                    statusHandler={statusHandler}
                />
            ))}
        </ul>
    );
};

export default ToDoList;