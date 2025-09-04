import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { fetchTasks } from '../../../api/task';

export const AddTaskForm = ({fetchTasks}) => {
    const [newTask , setNewTask] = useState("");

    const addNewTask = async () => {
        try {
            await axios.post(API_URL, {
                name: newTask,
                completed: false,
            });
            await fetchTasks();
            setNewTask("");
        } catch (error) {
            console.log(error)    
        }
    };
  return (
    <div>
          <Typography align='center' variant='h2' paddingTop={2}>
            Task List
          </Typography>
          <div className='addTaskForm'>
            <TextField
           size='small'
                    label="Add" 
                    variant="outlined"
                    value={newTask} 
                    onChange={(e) => setNewTask(e.target.value)} />
          <Button 
          disabled={!newTask.length} 
          variant='outlined'
           onClick={addNewTask}>
            <AddIcon></AddIcon>
          </Button>
          </div>
    
    </div>
  )
}
