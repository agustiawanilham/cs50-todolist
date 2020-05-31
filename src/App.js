import React from "react";

const Todo = (props) => (
  <li key>
    <input type="checkbox" checked={props.todo.checked} onChange={props.onToggle}/>
    <button onClick={props.onDelete}>Delete</button>
    <span>{props.todo.text}</span>
  </li>
);

let id = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  addTodo() {
    const text = prompt("Masukan todo");
    this.setState({
      todos: [...this.state.todos, { id: id++, text: text, checked: false }],
    });
  }

  deleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  }

  checkTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) {
          return todo;
        }
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        };
      }),
    });
  }

  render() {
    return (
      <div>
        <h1>To do List</h1>
        <div>Total todo : {this.state.todos.length}</div>
          <div>Checked Todo : {this.state.todos.filter(todo => todo.checked === true).length}</div>
        <div>Unchecked Todo : {this.state.todos.filter(todo => todo.checked === false).length}</div>
        <button onClick={() => this.addTodo()}>Add Todo</button>
        <ol>
          {this.state.todos.map((todo) => (
            <Todo onToggle={()=>this.checkTodo(todo.id)} onDelete={() => this.deleteTodo(todo.id)} todo={todo} />
          ))}
        </ol>
      </div>
    );
  }
}

export default App;
