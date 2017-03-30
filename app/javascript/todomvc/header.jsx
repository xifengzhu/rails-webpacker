import React, { Component } from 'react';

const ENTER_KEY = 13;

export default class Header extends Component {

  constructor(props) {
    super(props)
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    if(event.keyCode == ENTER_KEY){
      let { addTodo } = this.props;
      event.preventDefault();
      addTodo(event.target.value, event);
      this.setState({value: ''});
    } else {
      return;
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <input type="text"
               className="new-todo"
               placeholder="What needs to be done?"
               value={this.state.value}
               onKeyDown={this.handleSubmit}
               onChange={this.handleChange}
               autoFocus={true} />
      </header>

    );
  }
}
