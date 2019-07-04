import React, { Component } from 'react';

export default class NewToDo extends Component {
    state = {
      currentTask: {
        text: '',
      },
    }

    taskHandler = ({ target }) => {
      const { tasksLength } = this.props;

      this.setState({
        currentTask: {
          status: 'active',
          text: target.value,
          id: `${tasksLength}${Date.now()}`,
        },
      });
    }

    keyPressHandler = (e) => {
      const { addTask } = this.props;
      const { currentTask } = this.state;
      const { key } = e;

      if (key === 'Enter') {
        e.preventDefault();
        addTask(currentTask);
        this.setState({
          currentTask: {
            status: 'active',
            text: '',
          },
        });
      }
    }

    render() {
      const { currentTask } = this.state;
      const { text } = currentTask;
      const { tasksLength } = this.props;
      const { changeStatusToAllTasks, allTasksIsCompleted } = this.props;
      const pointerClassName = !allTasksIsCompleted ? 'pointer-wrapper' : 'pointer-wrapper pointer-wrapper--checked';

      return (
        <div className="new-todo">
          <form>
            {!!tasksLength
                    && (
                    <label 
                      className={pointerClassName}
                      onMouseDown={e => e.preventDefault()}
                      >
                      <input
                        className="new-todo__item"
                        type="button"
                        value=""
                        onClick={changeStatusToAllTasks}
                      />
                    </label>
                    )
                    }
            <label className={`new-todo__label ${!tasksLength && 'empty-list'}`}>
              <input
                className="new-todo__item new-todo__item_input"
                type="text"
                name="todo"
                placeholder="What needs to be done?"
                onKeyPress={this.keyPressHandler}
                onChange={this.taskHandler}
                value={text}
              />
            </label>
          </form>
        </div>
      );
    }
}
