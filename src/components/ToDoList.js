import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoList = (props) => {
  const {
    tasks, removeTask, statusHandler, showMode, updateEditedTasks,
  } = props;
  const tasksToShow = showMode === 'all' ? tasks : tasks.filter(task => task.status.toLowerCase() === showMode);

  return (
    <ul className="todo-list">
      {tasksToShow.map((task, idx) => (

        <ToDoItem
          task={task}
          key={`${idx}${task.text}`}
          taskId={task.id}
          removeTask={removeTask}
          statusHandler={statusHandler}
          updateEditedTasks={updateEditedTasks}
        />
      ))}
    </ul>
  );
};

export default ToDoList;
