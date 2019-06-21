import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoList = props => {
    const {tasks, removeTask, statusHandler, showMode} = props,
        tasksToShow = showMode === 'all' ? tasks : tasks.filter(task => task.status.toLowerCase() === showMode);

    return(
        <ul className="todo-list">
            {tasksToShow.map((task, idx) => (

                <ToDoItem 
                    task={task} 
                    key={`${idx}${task}`}
                    taskId={task.id}
                    removeTask={removeTask}
                    statusHandler={statusHandler}
                />
            ))}
        </ul>
    );
};

export default ToDoList;