import React, { Component } from 'react';

export default class Footer extends Component {

  constructor(props) {
    super(props)
    this.activeTodoCount = this.activeTodoCount.bind(this);
  }

  activeTodoCount() {
    let { todos } = this.props;
    return todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);
  }

  render() {
    let { todos, filterTodos } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count"><strong>{this.activeTodoCount()}</strong> items left</span>
        <ul className="filters">
          <li><a href="javascript:;" onClick={event => filterTodos('all')}>All</a></li>
          <li><a href="javascript:;" onClick={event => filterTodos('active')}>Active</a></li>
          <li><a href="javascript:;" onClick={event => filterTodos('completed')}>Completed</a></li>
        </ul>
      </footer>
    );
  }
}
