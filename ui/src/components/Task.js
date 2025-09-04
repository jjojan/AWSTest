import React, {useState} from 'react';
import {Button, Checkbox, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { UpdateTaskForm } from './UpdateTaskForm';
import classnames from "classnames";
import axios from 'axios';
import { API_URL } from '../utils';

export const Task = ({task, fetchTasks}) => {
    const {id, name, completed} = task;
    const [iscomplete, setIsComplete] = useState(completed);
    const [isDialogOpen, setisDialog] = useState(false)

    const handleUpdateTask = async () => {

        try {
            await axios.put(API_URL, {
                id, name, completed: !iscomplete,
            });
            setIsComplete((prev => !prev))
            
        } catch (error) {
            console.log(error)     
        }

    }

     const handleDeleteTask = async () => {
        try {
            await axios.delete('${API_URL}/task${task.id}');
            await fetchTasks();
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <div className='task'>
        <div className={classnames("flex", {done: iscomplete})}>
             <Checkbox checked={iscomplete} onChange={handleUpdateTask} />
        <Typography   variant="h4" >
        {name}
        </Typography>
        </div>
        <div className='taskButtons'>
            <Button variant='contained' onClick={() => setisDialog(true)}>
                <EditIcon/>
            </Button>
        <Button color="error" variant='contained' onClick={handleDeleteTask}>
            <DeleteIcon/>
        </Button>
        </div>

        <UpdateTaskForm 
        fetchTasks = {fetchTasks}
        isDialogOpen={isDialogOpen} 
        setisDialog={setisDialog} 
        task={task}/>
    </div>
  )
}
