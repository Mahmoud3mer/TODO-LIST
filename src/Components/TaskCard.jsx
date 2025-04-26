import { Box, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useToast } from '../Contexts/ToastContext';
import { useTasks } from '../Contexts/tasksContext';
// import { ToastContext } from '../Contexts/ToastContext';

export const TaskCard = ({ task, showDeletModal, handleEditTask }) => {
    const { tasks, setTasks } = useTasks();
    // const { showToast } = useContext(ToastContext);
    const { showToast } = useToast();

    const handleFinished = (e, id) => {
        const tasksInstance = tasks.map((t) => t.id === id ? {...t, finished: !t.finished} : t);
        setTasks(tasksInstance);

        if (!task.finished) {
            showToast('Task has finished.')
        }else{
            showToast('Task has removed.')
        }

        localStorage.setItem('todos', JSON.stringify(tasksInstance));
    }

    return (
        <>
            <Box
                sx={{
                    p: 3,
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    borderRadius: '4px',
                    marginBlock: '22px',
                    '&:hover':{
                        backgroundColor: 'secondary.main'
                    },
                    flexDirection:{
                        mobile: 'column',
                        tablet: 'row'
                    },
                    rowGap: '10px'
                }}
                display='flex' justifyContent='space-between' alignItems='center' 
            >
                <Box display='flex' flexDirection='column'>
                    <Typography
                        component='h6'
                        variant='h6'
                        sx={{ fontWeight: 'bold', fontSize:'18px', textDecoration: task.finished? 'line-through' : '' }}
                    >{task.title}</Typography>
                    <Typography component='p' sx={{ color: '#acd3d1' }}>{task.duration}</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between' alignItems='center' gap='25px'>
                    <DeleteOutlineOutlinedIcon
                        sx={{
                            backgroundColor:'background.default',
                            borderRadius:'50%',
                            p:'3px',
                            color:'error.main',
                            border: 1, borderColor:'error.main',
                            cursor:'pointer',
                            '&:hover':{
                                backgroundColor: 'error.main',
                                color:'primary.contrastText',
                            } 
                        }}

                        onClick={(e) => showDeletModal(e, task.id)}
                    />
                    <EditOutlinedIcon
                        sx={{
                            backgroundColor:'background.default',
                            borderRadius:'50%',
                            p:'3px',
                            color:'primary.main',
                            cursor:'pointer',
                            '&:hover':{
                                backgroundColor: 'primary.main',
                                color:'primary.contrastText',
                            } 
                        }}
                        onClick={(e) => handleEditTask(e, task.id)}
                    />
                    <CheckOutlinedIcon
                        sx={{
                            backgroundColor: task.finished ? '#64dd17' : 'background.default',
                            borderRadius:'50%',
                            p:'3px',
                            color:'primary.main',
                            cursor:'pointer',
                            '&:hover':{
                                backgroundColor: 'primary.main',
                                color:'primary.contrastText',
                            } 
                        }}

                        onClick={(e) => handleFinished(e, task.id)}
                    />
                </Box>
            </Box>
        </>
    )
}
