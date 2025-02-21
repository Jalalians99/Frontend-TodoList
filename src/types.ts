export type Todo = {
  description: string;
  duedate: string;
};

export type TableProps = {
  todos: Todo[];
  handleDelete: (row: number) => void;
};
