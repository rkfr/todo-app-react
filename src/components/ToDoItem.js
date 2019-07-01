import React from 'react';

export default class ToDoItem extends React.Component {
    state = {
      editing: false,
      edtingTaskText: '',
    }

    componentWillMount() {
      const { task } = this.props;
      const { text: edtingTaskText } = task;

      document.addEventListener('click', this.handleClickOutside);
      this.setState({ edtingTaskText });
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside);
    }

    editingHandler = () => {
      const { editing } = this.state;

      this.setState({ editing: !editing });
      if (editing) {
        const { updateEditedTasks, taskId } = this.props;
        const { edtingTaskText } = this.state;

        updateEditedTasks(edtingTaskText, taskId);
      }
    };

    handleClickOutside = ({ target }) => {
      const { editing } = this.state;

      if (editing && !target.classList.contains('todo-item__editing')) {
        this.editingHandler();
      }
    }

    closeEdit = ({ key }) => (key === 'Enter') && this.editingHandler();

    showDefaultTask = () => {
      const {
        task, taskId, statusHandler, removeTask,
      } = this.props;
      const { status, text } = task;
      const taskClassName = (status === 'active') ? 'todo-list__task-text' : 'todo-list__task-text todo-list__task-text--completed';

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
            type="button"
            className="remove"
            onClick={() => removeTask(taskId)}
          >


×
          </button>
        </div>
      );
    };

    showEditingTask = () => (
      <label>
        <input
          type="text"
          className="todo-item__editing"
          onChange={({ target }) => this.setState({ edtingTaskText: target.value })}
          onKeyPress={this.closeEdit}
          value={this.state.edtingTaskText}
          ref={input => input && input.focus()}
        />
      </label>
    );

    render() {
      const { editing } = this.state;

      return (
        <li className="todo-list__item">
          {!editing ? this.showDefaultTask() : this.showEditingTask()}
        </li>
      );
    }
}
