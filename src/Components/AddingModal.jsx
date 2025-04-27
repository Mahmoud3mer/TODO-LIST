import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { v4 as uuidv4 } from 'uuid';
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

export default function AddingModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let {tasks, setTasks} = useTasks();

    const [newTask, setNewTask] = React.useState({
        id: '',
        title: '',
        duration: '',
        finished: false,
    });

    const { showToast } = useToast();

    const handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        setNewTask({
            ...newTask,
            id: uuidv4(),
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setTasks([...tasks, newTask]);
        localStorage.setItem('todos', JSON.stringify([...tasks, newTask]));

        setNewTask({
            id: '',
            title: '',
            duration: '',
            finished: false,
        });

        showToast('Added successed.')
    }

    return (
        <div>
            <Button onClick={handleOpen}>Add New Task</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="div" component="div" display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Task
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
                        onSubmit={handleSubmit}
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
                                value={newTask.title}
                                error={newTask.title === '' ? true : false}
                                helperText={newTask.title === 'Field must be not empty.' ? true : false}
                                onChange={handleChange}
                                variant="filled"
                            />
                            <TextField
                                id="filled-basic"
                                label="duration"
                                name='duration'
                                value={newTask.duration}
                                error={newTask.duration === '' ? true : false}
                                helperText={newTask.title === 'Field must be not empty.' ? true : false}
                                variant="filled"
                                onChange={handleChange}
                            />
                        </Box>

                        <Button 
                            variant="contained"
                            type='submit'
                            disabled={newTask.title === '' || newTask.duration ==='' ? true : false}
                            sx={{marginTop:'10px',cursor: newTask.title === '' || newTask.duration ==='' ? 'not-allowed' : 'pointer'}}
                        >Add</Button>
                    </Box>


                </Box>
            </Modal>
        </div>
    );
}