import { useRef, useState } from "react";
import { Todo } from "../types";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";

// Register the AllCommunityModule
ModuleRegistry.registerModules([AllCommunityModule]);

function TodoList() {
  const [todo, setTodo] = useState<Todo>({
    description: "",
    duedate: "",
    priority: "",
  });
  const [todos, setTodos] = useState<Todo[]>([]);
  const [colDefs] = useState<ColDef[]>([
    {
      field: "description",
      filter: "agTextColumnFilter",
      floatingFilter: true,
      headerName: "Description",
    },
    {
      field: "duedate",
      filter: "agDateColumnFilter",
      floatingFilter: true,
      sortable: false,
      headerName: "Date",
    },
    {
      field: "priority",
      editable: true,
      headerName: "Priority",
      filter: "agTextColumnFilter",
      floatingFilter: true,
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "Black" },
    },
  ]);
  const gridRef = useRef<any>(null);

  const handleAdd = () => {
    if (!todo.description) alert("Please enter some values first");
    else {
      setTodos([todo, ...todos]);
      setTodo({
        description: "",
        duedate: "",
        priority: "",
      });
    }
  };

  const handleDelete = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (todo, index) => index != gridRef.current.getSelectedNodes()[0].id
        )
      );
    } else {
      alert("Select a row first!");
    }
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
      <input
        type="text"
        placeholder="Priority"
        value={todo.priority}
        onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
      />
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleDelete}>Delete</button>
      <div style={{ height: 400, width: 600 }} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowData={todos}
          columnDefs={colDefs}
          rowSelection={"single"}
          defaultColDef={{ resizable: true }}
        />
      </div>
    </>
  );
}

export default TodoList;
