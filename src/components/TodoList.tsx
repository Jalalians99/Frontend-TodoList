import { useState } from "react";
import { Todo } from "../types";
import TodoTable from "./TodoTable";

function TodoList() {
  const [todo, setTodo] = useState<Todo>({ description: "", duedate: "" });
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = () => {
    if (!todo.description) alert("Please enter some values first");
    else {
      setTodos([todo, ...todos]);
      setTodo({
        description: "",
        duedate: "",
      });
    }
  };

  const handleDelete = (row: number) => {
    setTodos(todos.filter((_, index) => row !== index));
  };

  return (
    <>
      <h2>Todo List</h2>
      <input
        type="text"
        placeholder="Description"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <input
        type="date"
        placeholder="Due Date"
        value={todo.duedate}
        onChange={(e) => setTodo({ ...todo, duedate: e.target.value })}
      />
      <button onClick={handleAdd}>Add</button>
      <TodoTable todos={todos} handleDelete={handleDelete} />
    </>
  );
}

export default TodoList;
