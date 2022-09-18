import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const storeTodos = JSON.parse(localStorage.getItem("todos"));
    return storeTodos ?? [];
  });
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    setTodos((prev) => {
      const newTodo = [todo, ...prev];
      const jsonJobs = JSON.stringify(newTodo);
      localStorage.setItem("todos", jsonJobs);
      return newTodo;
    });
  };
  const completeTodo = (id) => {
    let updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
        console.log(todo.isComplete);
      }
      return todo;
    });
    setTodos(() => {
      const jsonJobs = JSON.stringify(updateTodos);
      localStorage.setItem("todos", jsonJobs);
      return updateTodos;
    });
  };
  const updateTodo = (id, newVal) => {
    if (!newVal.text || /^\s*$/.test(newVal.text)) {
      return;
    }
    setTodos((prev) => {
      const reTodo = prev.map((items) => (items.id === id ? newVal : items));
      const jsonJobs = JSON.stringify(reTodo);
      localStorage.setItem("todos", jsonJobs);
      return reTodo;
    });
  };
  const removeTodo = (id) => {
    const RemoveArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(() => {
      const jsonJobs = JSON.stringify(RemoveArr);
      localStorage.setItem("todos", jsonJobs);
      return RemoveArr;
    });
  };

  return (
    <div>
      <h1>What's the plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default TodoList;
