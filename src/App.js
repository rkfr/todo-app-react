import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import NewToDo from './components/NewToDo';
import ToDoList from './components/ToDoList';
import Footer from './components/Footer';

class App extends Component {
  state = {
    tasks: [],
    showMode: '',
    allTasksIsCompleted: false
  }

  componentDidMount() {
    const appData = localStorage.getItem('appData');

    if (appData) {
      const { showMode, tasks, allTasksIsCompleted } = JSON.parse(appData);

      this.setState({ 
        tasks,
        showMode,
        allTasksIsCompleted
      });
    }
    else {
      this.setState({
        tasks: [],
        showMode: 'all',
        allTasksIsCompleted: false 
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.setDataToLocalStorage();
    }
  }

  setDataToLocalStorage = () => {
    const { tasks, showMode, allTasksIsCompleted } = this.state;

    const appData = {
      tasks,
      showMode,
      allTasksIsCompleted
    };

    localStorage.setItem('appData', JSON.stringify(appData));
  };

  addTask = (task) => {
    const { tasks } = this.state;
    tasks.push(task);

    this.setState({ tasks });
  };

  removeTask = (taskId) => {
    const { tasks } = this.state;
    const newTasks = tasks.filter(task => task.id !== taskId);


    this.setState({
      tasks: newTasks,
    });
  };

  statusHandler = (taskId) => {
    const { tasks } = this.state;
    const newTasks = tasks.map((task) => {
      if (taskId === task.id) {
        task.status = (task.status === 'completed') ? 'active' : 'completed';
      }
      return task;
    });

    this.setState({
      tasks: newTasks,
    });
  };

  modeHandler = showMode => this.setState({ showMode });

  changeStatusToAllTasks = () => {
    const { tasks, allTasksIsCompleted } = this.state;
    const isActive = tasks.some(task => task.status === 'active');

    if (isActive) {
      tasks.forEach(task => ((task.status = 'completed'), task));
    } else {
      tasks.forEach(task => ((task.status = 'active'), task));
    }

    this.setState({ 
      tasks,
      allTasksIsCompleted: !allTasksIsCompleted
    });
  }

  removeTasks = () => {
    const { tasks } = this.state;
    const activeTasks = tasks.filter(task => task.status !== 'completed');

    this.setState({
      tasks: activeTasks,
    });
  }

  updateEditedTasks = (newText, id) => {
    const { tasks } = this.state;
    tasks.find(task => task.id === id).text = newText;

    this.setState({ tasks });
  }

  getActiveItems = () => {
    const { tasks } = this.state;
    return (tasks.length) ? tasks.filter(task => task.status === 'active') : [];
  };

  render() {
    const { tasks, showMode, allTasksIsCompleted } = this.state;
    const activeItems = this.getActiveItems();
    const activeItemsCount = activeItems.length;
    const isAreAnyCompleted = tasks.some(task => task.status === 'completed');
    const tasksLength = tasks.length;

    return (
      <section className="todo-app">
        <Header />
        <section className="main">
          <NewToDo
            addTask={this.addTask}
            tasksLength={tasksLength}
            changeStatusToAllTasks={this.changeStatusToAllTasks}
            allTasksIsCompleted={allTasksIsCompleted}
          />
          {tasks
          && (
          <ToDoList
            tasks={tasks}
            removeTask={this.removeTask}
            statusHandler={this.statusHandler}
            showMode={showMode}
            updateEditedTasks={this.updateEditedTasks}
          />
          )
          }
        </section>
        {(!!activeItemsCount || !!tasksLength)
        && (
        <Footer
          modeHandler={this.modeHandler}
          showMode={showMode}
          items={activeItemsCount}
          removeTasks={this.removeTasks}
          isAreAnyCompleted={isAreAnyCompleted}
        />
        )
        }
      </section>
    );
  }
}

export default App;
