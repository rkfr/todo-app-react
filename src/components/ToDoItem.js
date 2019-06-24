import React from 'react';

export default class ToDoItem extends React.Component {

    state = {
        editing: false,
        taskData: this.props.task.text
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    componentWillMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = ({target}) => {
        const {editing} = this.state;

        if (editing && !target.classList.contains('todo-item__editing')) {
            this.setState({ editing: !editing });
        }
    }

    showDefaultTask = () => {
        const {task, taskId, statusHandler, removeTask} = this.props,
        {status, text} = task,
        taskClassName = (status === 'active') ? 'todo-list__task-text' : 'todo-list__task-text todo-list__task-text--completed';

        return (
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
        );
    };

    editTask = ({target}) => {

        this.setState({ 
            taskData: target.value
        });
    }

    editingTask = () => {
        const {taskData} = this.state;

        return (
            <label>
                <input 
                    type="text"
                    className="todo-item__editing"
                    onChange={this.editTask}
                    value={taskData}
                />
            </label>
        );
    };
    
    render() {
        const { task, taskId, editTask } = this.props,
            {editing} = this.state;

        return(
            <li 
                className="todo-list__item"
                onDoubleClick={() => {

                    this.setState({editing: !editing})
                    editTask(task, taskId);
                }}
            >
                {!editing ? this.showDefaultTask() : this.editingTask()}
            </li>
        );
    };
};