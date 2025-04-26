import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { All } from './All';
import { Unfinished } from './Unfinished';
import { Finished } from './Finished';
import { useTasks } from '../Contexts/tasksContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditTaskModel from './EditTaskModel';
import { useToast } from '../Contexts/ToastContext';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Navigation() {
  const [value, setValue] = React.useState(0);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const { tasks, setTasks } = useTasks();
  const [taskID, setTaskID] = React.useState('');

  const [openEdit, setOpenEdit] = React.useState(false);
  const [taskEdit, setTaskEdit] = React.useState({});
  
  const { showToast } = useToast();



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleConfirmDelete = () => {
    const tasksInstance = tasks.filter((t) => t.id !== taskID);
    setTasks(tasksInstance);
    localStorage.setItem('todos', JSON.stringify(tasksInstance));
    showToast('Deleted successed.')
    setOpenDeleteModal(false);
  }

  const handleCloseDeleteModal = () => {
      setOpenDeleteModal(false);
  };

  const handleShowDeleteModal = (e, taskId) => {
    setOpenDeleteModal(true);
    setTaskID(taskId);    
};

const handleEditTask = (e, taskId) => {
  setTaskEdit(
      tasks.find((t) => t.id === taskId)
  );
  setOpenEdit(true)
}

  return (

    <>
      {/* Modal confirm Delete */}
      <Dialog
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">
              {"Are you sure about deleting the task?"}
          </DialogTitle>
          <DialogContent>
              <DialogContentText id="alert-dialog-description">
              A deletion cannot be undone once it has been completed.
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={handleCloseDeleteModal}>
                  Discard
              </Button>
              <Button sx={{color: 'error.main'}} onClick={() => handleConfirmDelete()} autoFocus>
                    Confirm
              </Button>
          </DialogActions>
      </Dialog>
      {/* Modal confirm */}


      {/* Modal edit task */}
        <EditTaskModel open={openEdit} setOpenEdit={setOpenEdit} task={taskEdit} setTaskEdit={setTaskEdit}/>
      {/* Modal edit task */}

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: '20px'}} display='flex' justifyContent='center'>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="Unfinished" {...a11yProps(1)} />
            <Tab label="Finished" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <All value={value} index={0} showDeletModal={handleShowDeleteModal} handleEditTask={handleEditTask}/>
        <Unfinished value={value} index={1} showDeletModal={handleShowDeleteModal} handleEditTask={handleEditTask}/>
        <Finished value={value} index={2} showDeletModal={handleShowDeleteModal} handleEditTask={handleEditTask}/>
      </Box>
    </>
  );
}