import React, { Component } from 'react';

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

export default class todoItem extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onEditing = this.onEditing.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.state = {
      editText: '',
    }
  }

  handleChange(event) {
    this.setState({editText: event.target.value});
  }

  handleKeyDown(event) {
    if (event.which === ESCAPE_KEY) {
      event.preventDefault();
      this.onCancel();
    } else if (event.which === ENTER_KEY) {
      event.preventDefault();
      this.updateTodo()
    } else {
      return;
    }
  }

  updateTodo() {
    let { todo: { id }, updateContent, updateEditing } = this.props;
    updateContent(id, this.state.editText);
    updateEditing();
  }

  itemClasses() {
    let { todo, editing } = this.props;
    let className = '';
    className += (todo.completed == true ? "completed" : '');
    className += (editing == todo.id ? " editing" : '');
    return className;
  }

  onEditing() {
    let { todo: { id, content }, updateEditing } = this.props;
    updateEditing(id);
    this.setState({editText: content});
  }

  onCancel(){
    let { todo: { content }, updateEditing } = this.props;
    updateEditing();
    this.setState({editText: content});
  }

  render() {
    let { todo, delTodo, toggleTodo, updateContent } = this.props;
    return (
      <li className={this.itemClasses()}>
        <div className="view">
          <input type="checkbox"
                 className="toggle"
                 value="on"
                 checked={todo.completed}
                 onChange={event => toggleTodo(todo.id, event)} />

          <label onClick={event => this.onEditing(event)}>{ todo.content }</label>
          <button className="destroy" onClick={event => delTodo(todo.id, event)}></button>
        </div>
        <input className="edit"
               value={this.state.editText}
               onBlur={this.updateTodo}
               onKeyDown={this.handleKeyDown}
               onChange={this.handleChange} />
      </li>
    );
  }
}
