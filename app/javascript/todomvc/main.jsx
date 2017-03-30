import React, { Component } from 'react';
import TodoItem from './todoItem';

export default class Main extends Component {

  constructor(props) {
    super(props)
    this.updateEditing = this.updateEditing.bind(this);
    this.state = {
      editing: '',
    }
  }

  updateEditing(id = null) {
    this.setState({editing: id});
  }

  render() {
    let { todos, delTodo, toggleTodo, updateContent, toggleAll } = this.props;
    return (
      <section className="main">
        <input type="checkbox" className="toggle-all" value="on" />
        <label onClick={toggleAll}></label>
        <ul className="todo-list">
          {
            todos.map((todo) =>
              <TodoItem key={todo.id}
                        todo={ todo }
                        delTodo={delTodo}
                        toggleTodo={toggleTodo}
                        updateContent={updateContent}
                        updateEditing={this.updateEditing}
                        editing={this.state.editing} />
            )
          }
        </ul>
      </section>
    );
  }
}
