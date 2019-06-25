import React from 'react';

export default class ToDoItem extends React.Component {

    state = {
        editing: false,
        edtingTaskText: ''
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    componentWillMount() {
        document.addEventListener('click', this.handleClickOutside);
        this.setState({
            edtingTaskText: this.props.task.text
        });
    }

    editingHandler = () => {
        const {editing} = this.state;
        
        this.setState({ editing: !editing })
        if (editing) {     
            const {updateEditedTasks, taskId} = this.props,
                {edtingTaskText} = this.state;

            updateEditedTasks(edtingTaskText, taskId);
        }
    };

    handleClickOutside = ({target}) => {
        if (this.state.editing && !target.classList.contains('todo-item__editing')) {
            this.editingHandler();
        }
    }

    closeEdit = ({key}) => (key === 'Enter') && this.editingHandler();

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
                <label className={taskClassName}>
                    <span onDoubleClick={this.editingHandler}>{text}</span>
                </label>
                <button 
                    className="remove"
                    onClick={() => removeTask(taskId)}
                >×</button>
            </div>
        );
    };

    showEditingTask = () => {
        return (
            <label>
                <input 
                    type="text"
                    className="todo-item__editing"
                    onChange={({target}) => this.setState({ edtingTaskText: target.value })}
                    onKeyPress={this.closeEdit}
                    value={this.state.edtingTaskText}
                    ref={input => input && input.focus()}
                />
            </label>
        );
    };
    
    render() {
        const {editing} = this.state;

        return(
            <li className="todo-list__item">
                {!editing ? this.showDefaultTask() : this.showEditingTask()}
            </li>
        );
    };
};