import React, {Component} from 'react';
import './App.css';
import Header from './components/Header';
import NewToDo from './components/NewToDo';
import ToDoList from './components/ToDoList';
import Footer from './components/Footer';

class App extends Component {
  
  state = {
    tasks: [],
    showMode: 'all'
  }

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('tasks')),
    showMode = localStorage.getItem('showMode');
    
    this.setState({ tasks, showMode });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.localStorageHandler();
    }
  }

  addTask = task => {
    const {tasks} = this.state;
    tasks.push(task);
    
    this.setState({ tasks });
  };

  removeTask = taskId => {
    const {tasks} = this.state,
      newTasks = tasks.filter(task => task.id !== taskId);
    
    
    this.setState({
      tasks: newTasks
    });
  };

  statusHandler = taskId => {
    const {tasks} = this.state,
      newTasks = tasks.map(task => {

      if (taskId === task.id) {
        (task.status === 'completed') ? task.status = 'active': task.status = 'completed';
      }

      return task;
    });

    this.setState({
      tasks: newTasks
    });
  };

  modeHandler = (showMode) => this.setState({ showMode });

  localStorageHandler = () => {
    const {tasks, showMode} = this.state;

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('showMode', showMode);
  };

  markHandler = () => {
    const {tasks} = this.state,
      isActive = tasks.some(task => task.status === 'active');

    if (isActive) {
      tasks.forEach(task => (task.status = 'completed', task));
    }
    else {
      tasks.forEach(task => (task.status = 'active', task));
    }

    this.setState({tasks});
  }

  removeTasks = () => {
    const {tasks} = this.state;

    this.setState({
      tasks: tasks.filter(task => task.status !== 'completed')
    });
  }

  render() {
    const {tasks, showMode} = this.state,
      activeItemsCount = tasks.filter(task => task.status === 'active').length,
      isAreAnyCompleted = tasks.some(task => task.status === 'completed'),
      tasksLength = tasks.length;

    return (
      <section className="todo-app">
        <Header />
        <section className="main">
          <NewToDo
            addTask={this.addTask}
            tasksLength={tasksLength}
            tasksLength={tasks.length}
            markHandler={this.markHandler}
          />
          <ToDoList
            tasks={tasks}
            removeTask={this.removeTask}
            statusHandler={this.statusHandler}
            showMode={showMode}
          />
        </section>
        {(!!activeItemsCount || !!tasks.length) && 
        <Footer 
          modeHandler={this.modeHandler}
          showMode={showMode}
          items={activeItemsCount}
          removeTasks={this.removeTasks}
          isAreAnyCompleted={isAreAnyCompleted}
        />
        }
      </section>
    );
  };
}

export default App;
