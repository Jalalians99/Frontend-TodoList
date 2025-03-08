import { useRef, useState } from "react";
import { Todo } from "../types";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial } from "ag-grid-community";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { autocompleteClasses, NativeSelect } from "@mui/material";




// Register the AllCommunityModule
ModuleRegistry.registerModules([AllCommunityModule]);

function TodoList() {
  const [todo, setTodo] = useState<Todo>({
    description: "",
    duedate: "",
    priority: "",
  });
  const [todos, setTodos] = useState<Todo[]>([]);
   // Column definitions for the ag-grid
  const [colDefs] = useState<ColDef[]>([
    {
      field: "description",
      // filter: "agTextColumnFilter",
      // floatingFilter: true,
      headerName: "Description",
    },
    {
      field: "duedate",
      // filter: "agDateColumnFilter",
      // floatingFilter: true,
      sortable: false,
      headerName: "Date",
    },
 {
      field: "priority",
      editable: true,
      headerName: "Priority",
      // filter: "agTextColumnFilter",
      // floatingFilter: true,
      cellStyle: (params) =>
      params.value === "High" ? { color: "red" } : params.value === "Medium" ? { color: "yellow" } : { color: "green" },
    },
  ]);


  // Reference
  const gridRef = useRef<any>(null);
  // onChange function for date picker
  const handleDateChange = (date: any) => {
    if (date) {
      setTodo({
        ...todo,
        duedate: date.format ("MM/DD/YYYY")});
      }
      else {
        setTodo({
          ...todo,
          duedate: ""});
    }
  }
  // Add button function
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
  // Delete button function
  const handleDelete = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (_, index) => index != Number(gridRef.current?.getSelectedNodes()[0].id)
        )
      );
    } else {
      alert("Select a row first!");
    }
  };


  return (
    <>
      <Stack direction={"row"} spacing={2}
        alignItems={"center"} 
        justifyContent={"center"}
      > 
      <TextField
        variant="outlined"
        size="medium"
        label="Description"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      {/* <TextField
        label="Date"
        size="small"
        variant="outlined"
        value={todo.duedate}
        onChange={(e) => setTodo({ ...todo, duedate: e.target.value })}
        /> */}
      
      {/* // Material UI Date Picker */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          value={todo.duedate ? dayjs(todo.duedate) : null}
          onChange={(date: dayjs.Dayjs | null) => handleDateChange(date)}
          slotProps={{ textField: { variant: 'outlined' } }}
        />
      </LocalizationProvider>

      <FormControl variant="outlined" size="medium" sx={{ m: 1, minWidth: 170 }}>
        <InputLabel htmlFor="priority">Priority</InputLabel>
          <Select
          value={todo.priority}
          onChange={(e: SelectChangeEvent) => setTodo({ ...todo, priority: e.target.value })}
          input={<OutlinedInput label="Priority" id="priority" />}
        >
          <MenuItem value={"High"} style={{ color: "red" }}>High</MenuItem>
          <MenuItem value={"Medium"} style={{ color: "yellow" }}>Medium</MenuItem>
          <MenuItem value={"Low"} style={{ color: "green" }}>Low</MenuItem>
        </Select>
      </FormControl>


      
      <Button 
          variant="outlined"
          size="large" 
          onClick={handleAdd}>Add
      </Button>
      <Button 
          variant="outlined"
          size="large"
          color="error" 
          onClick={handleDelete}>Delete
      </Button>
      </Stack>
      <div style={{ width: '90%', margin: 'auto'}}>
      <div style={{ height: 400, width: 600 }}  className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          theme={themeMaterial}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowData={todos}
          columnDefs={colDefs}
          rowSelection={"single"}
          defaultColDef={{ resizable: true }}
        />
        </div>
      </div>
      
    </>
  );
}

export default TodoList;
