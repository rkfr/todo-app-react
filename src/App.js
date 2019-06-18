import React, {Component} from 'react';
import './App.css';
import Header from './components/Header';
import NewToDo from './components/NewToDo';
import ToDoList from './components/ToDoList';
import Footer from './components/Footer';

class App extends Component {
  
  state = {
    tasks: []
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

  render() {
    const {tasks} = this.state;
    
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
        <Footer />
      </section>
    );
  };
}

export default App;
