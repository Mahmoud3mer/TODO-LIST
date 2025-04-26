import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useTasks } from '../Contexts/tasksContext';
import { useToast } from '../Contexts/ToastContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 500,
    minWidth: 180,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function EditTaskModel({open, setOpenEdit, task, setTaskEdit}) {
    const handleClose = () => setOpenEdit(false);

    let {tasks, setTasks} = useTasks();

    // const { showToast } = React.useContext(ToastContext);
    const { showToast } = useToast()

    const handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        setTaskEdit({
            ...task,
            [name]: value
        })  
    }

    const handleSubmit = (e, taskId) => {
        e.preventDefault();   
        if (task.title !== '' && task.duration !== '') {
            const tasksInstance = tasks.map((t) =>  t.id === taskId ? {...t, title: task.title, duration: task.duration} : t);
            setTasks(tasksInstance);

            localStorage.setItem('todos', JSON.stringify(tasksInstance));

            showToast('Edited successed.')
        }
        
        setOpenEdit(false);
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="div" component="div" display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit Task
                        </Typography>
                        <Typography component="span" sx={{
                            '&:hover':{
                                cursor:'pointer',
                                color:'error.main'
                            }
                        }} onClick={handleClose}>
                            <CloseOutlinedIcon/>
                        </Typography>
                    </Typography>
                    <Box
                        component='form'
                        sx={{
                            marginBlock:'10px'
                        }}
                        onSubmit={(e) => handleSubmit(e, task.id)}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: {
                                    mobile: 'column',
                                    tablet: 'row'
                                },
                                gap: '10px',
                            }}
                        >
                            <TextField
                                id="filled-basic"
                                label="Title" name='title'
                                value={task.title}
                                onChange={handleChange}
                                variant="filled"
                            />
                            <TextField
                                id="filled-basic"
                                label="duration"
                                name='duration'
                                value={task.duration}
                                variant="filled"
                                onChange={handleChange}
                            />
                        </Box>

                        <Button
                            variant="contained"
                            type='submit'
                            disabled={task.title === '' || task.duration ==='' ? true : false}
                            sx={{marginTop:'10px',cursor: task.title === '' || task.duration ==='' ? 'not-allowed' : 'pointer'}}
                        >Confirm</Button>
                    </Box>


                </Box>
            </Modal>
        </div>
    );
}