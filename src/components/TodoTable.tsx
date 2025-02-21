import { TableProps } from "../types";

function TodoTable(props: TableProps) {
  return (
    <table>
      <thead>
        <th>Description</th>
        <th>Due Date</th>
        <th>Action</th>
      </thead>
      <tbody>
        {props.todos.map((todo, index) => (
          <tr key={index}>
            <td>{todo.description}</td>
            <td>{todo.duedate}</td>
            <td>
              <button onClick={() => props.handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TodoTable;
