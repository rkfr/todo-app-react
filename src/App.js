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

  render() {
    const {tasks, showMode} = this.state,
      items = tasks.filter(task => task.status.toLowerCase() === 'active').length;


    return (
      <section className="todo-app">
        <Header />
        <section className="main">
          <NewToDo
            addTask={this.addTask}
            items={items}
            tasksLength={tasks.length}
          />
          <ToDoList
            tasks={tasks}
            removeTask={this.removeTask}
            statusHandler={this.statusHandler}
            showMode={showMode}
          />
        </section>
        {(!!items || !!tasks.length) && 
        <Footer 
          modeHandler={this.modeHandler}
          showMode={showMode}
          items={items}
        />
        }
      </section>
    );
  };
}

export default App;
