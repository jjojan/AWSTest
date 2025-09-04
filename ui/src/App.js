import CssBaseline from "@mui/material/CssBaseline";
import { AddTaskForm } from "./components/AddTaskForm";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Task } from "./components/Task";
import axios from "axios";
import { useState, useEffect } from "react";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  const [task, setTask] = useState([])

  const fetchTasks = async() =>{
    try {
      const {data} = await axios.get(API_URL)
      
      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [])
  
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
         <AddTaskForm fetchTasks={fetchTasks}/>
         {task.map((task) => (<Task task={task} key = {task.id} fetchTasks={fetchTasks}/>
         ))}
         <Task task={task}/>
      </ThemeProvider>
    
    </div>
  );
}

export default App;
