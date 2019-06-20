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

  addTask = task => {
    const {tasks} = this.state;
    tasks.push(task);
    
    this.setState({ tasks });
  };

  removeTask = taskIdx => {
    const {tasks: newTasks} = this.state;
    newTasks.splice(taskIdx, 1);

    this.setState({
      tasks: newTasks
    });
  };

  statusHandler = taskIdx => {
    const {tasks} = this.state,
      newTasks = tasks.map((task, idx) => {
      const currentTask = task;

      if (taskIdx === idx) {
        currentTask.status = !currentTask.status;
      }

      return currentTask;
    });

    this.setState({
      tasks: newTasks
    });
  };

  modeHandler = (showMode) => this.setState({ showMode });

  render() {
    const {tasks, showMode} = this.state,
      items = tasks.length;
    
    return (
      <section className="todo-app">
        <Header />
        <section className="main">
          <NewToDo
            addTask={this.addTask}
          />
          <ToDoList
            tasks={tasks}
            removeTask={this.removeTask}
            statusHandler={this.statusHandler}
          />
        </section>
        <Footer 
          modeHandler={this.modeHandler}
          showMode={showMode}
          items={items}
        />
      </section>
    );
  };
}

export default App;
