import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Footer from './footer';
import Main from './main';

export class TodoMVC extends Component {

  constructor(props) {
    super(props)
    this.addTodo = this.addTodo.bind(this);
    this.delTodo = this.delTodo.bind(this);
    this.updateShowTodos = this.updateShowTodos.bind(this);
    this.uuid = this.uuid.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.filterTodos = this.filterTodos.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
    this.bothUpdateTodos = this.bothUpdateTodos.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.state = {
      "todos": [
        {
          "id": 1,
          "content": "job1",
          "completed": true
        }, {
          "id": 2,
          "content": "job2",
          "completed": true
        }, {
          "id": 3,
          "content": "job3",
          "completed": false
        }
      ],
      "showTodos": [
        {
          "id": 1,
          "content": "job1",
          "completed": true
        }, {
          "id": 2,
          "content": "job2",
          "completed": true
        }, {
          "id": 3,
          "content": "job3",
          "completed": false
        }
      ],
      "editing": ''
    }
  }

  uuid() {
    let uuid = '';
    for (let i = 0; i < 32; i++) {
      let random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
  }

  bothUpdateTodos (newTodos) {
    this.updateShowTodos(newTodos);
    this.updateTodos(newTodos);
  }

  addTodo(text, event) {
    const newTodo = {id: this.uuid(), content: text, completed: false};
    const newTodos = this.state.showTodos.concat([newTodo])
    this.bothUpdateTodos(newTodos);
  }

  delTodo(id, event) {
    const todos = this.state.showTodos.filter((todo) => {
      return todo.id != id;
    });
    this.bothUpdateTodos(todos);
  }

  updateShowTodos(todos) {
    this.setState({showTodos: todos});
  }

  updateTodos(todos) {
    this.setState({todos: todos});
  }

  updateTodo(id, func, content = ''){
    const todo = this.state.showTodos.filter((todo) => {
      return todo.id == id;
    })[0];
    const newTodo = func(todo, content);
    const index = this.state.showTodos.indexOf(todo);
    const newTodos = this.state.showTodos.slice();
    newTodos[index] = newTodo;
    this.bothUpdateTodos(newTodos);
  }

  toggleTodo(id) {
    this.updateTodo(id, (todo) => {
      return Object.assign({}, todo, {"completed": !todo.completed});
    });
  }

  updateContent(id, content){
    this.updateTodo(id, (todo, content) => {
      return Object.assign({}, todo, {"content": content});
    }, content);
  }

  filterTodos(state) {
    const showTodos = this.state.todos.filter((todo) => {
      switch(state) {
        case "completed":
          return todo.completed;
          break;
        case "active":
          return !todo.completed;
          break;
        default:
          return true;
      }
    });
    this.setState({showTodos: showTodos});
  }

  toggleAll(){
    let newState = ''
    const uncompletedTodos = this.state.showTodos.filter((todo) => {
      return todo.completed == false;
    });

    if(uncompletedTodos.length > 0){
      newState = {"completed": true}
    } else {
      newState = {"completed": false}
    }
    const oldShowTodos = this.state.showTodos.slice();
    const oldAllTodos = this.state.todos.slice();
    const newShowTodos = oldShowTodos.map((todo) => {
      return Object.assign({}, todo, newState);
    });
    const newAllTodos = oldAllTodos.map((todo) => {
      return Object.assign({}, todo, newState);
    });
    this.setState({showTodos: newShowTodos});
    this.setState({todos: newAllTodos});
  }

  render() {
    return (
      <div>
        <Header addTodo={this.addTodo} />
        <Main todos={this.state.showTodos}
              delTodo={this.delTodo}
              toggleTodo={this.toggleTodo}
              updateContent={this.updateContent}
              toggleAll={this.toggleAll} />
        <Footer
          todos={this.state.todos}
          filterTodos={this.filterTodos} />
      </div>
    );
  }
}

ReactDOM.render(<TodoMVC />, document.getElementById('root'));
