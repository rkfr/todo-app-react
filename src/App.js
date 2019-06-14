import React, {Component} from 'react';
import './App.css';
import Header from './components/Header';
import NewToDo from './components/NewToDo';
import ToDoList from './components/ToDoList';

class App extends Component {
  
  render() {
    return (
      <section className="todo-app">
        <Header />
        <section className="main">
          <NewToDo />
          <ToDoList />
        </section>
      </section>
    );
  };
}

export default App;
