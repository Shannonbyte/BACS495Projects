import React, { useState } from 'react';
import './App.css';

function Todo({todo, index, crossTodo, removeTodo}){
  return (
    <div className = "Todo">
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
      <div>
        <button className = "Button-Check" onClick = {() => crossTodo(index)}>✓</button>
        <button className = "Button-Delete" onClick = {() => removeTodo(index)}>✕</button>
      </div>
    </div>
  );
}

function TodoForm({addTodo}) {

  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return(
    <form onSubmit={handleSubmit}>
      <input
        className = "Add-Textbox"
        type = "text"
        value = {value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add new todo"
      />
      <button className = "Submit-Button" type = "submit">
        Add To-do!
      </button>
    </form>
  );
}

export default function App() {
  const [todos, setTodos] = useState([
    {
      text: "This is a sample todo",
      isDone: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const crossTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className = "App">
      <div className = "App-Container">
        <div className = "App-Header-Container">
          <h3 className = "Todo-Header"> To-Do List </h3>
        </div>
        <div className = "Todo-Form">
          <TodoForm addTodo={addTodo} />
        </div>
        <div className = "Todos-List" >
          {todos.map((todo, index) => (
          <div>
            <div>
              <Todo
              key = {index}
              index = {index}
              todo = {todo}
              crossTodo = {crossTodo}
              removeTodo = {removeTodo}
              />
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}
