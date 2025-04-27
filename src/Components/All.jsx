import React from 'react'
import { TaskCard } from './TaskCard';
import { useTasks } from '../Contexts/tasksContext';

export const All = ({ value, index, showDeletModal, handleEditTask }) => {

    let {tasks, setTasks} = useTasks();

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index &&
                tasks?.map((task) => 
                    <TaskCard key={task.id} task={task} showDeletModal={showDeletModal} handleEditTask={handleEditTask}/>
                )
            }
        </div>
    )
}
