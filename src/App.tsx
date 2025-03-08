
import React, {useState} from "react"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import TodoList  from "./components/TodoList"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { Tabs, Tab ,Box } from "@mui/material"

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Home() {
  return <Typography variant="h4">Welcome to the Todo List App</Typography>
}

function TodoListComponent() {
  return (
    <TodoList />
  );
}

function SimpleTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Home" {...a11yProps(0)} />
        <Tab label="Todo List" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Home />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TodoListComponent />
      </TabPanel>
    </div>
  );
}

function App() {
  return (
    <>
    <Container maxWidth="md">
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h5" sx={{flexGrow: 1}} >Todo List</Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Box sx={{my: 2}} />
      <SimpleTabs />
    </Container>
      </>
  )
}

export default App
