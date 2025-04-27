import React, { useMemo } from 'react'
import { useTasks } from '../Contexts/tasksContext';
import { TaskCard } from './TaskCard';

export const Finished = ({ value, index, showDeletModal, handleEditTask  }) => {
    let {tasks, setTasks} = useTasks();

    // let finishedTasks = tasks.filter((t) => {
    //     console.log('Completed todos')
    //     return t.finished === true
    // });

    // Use Cach
    let finishedTasks = useMemo(() => {
        return tasks.filter((t) => {
            return t.finished === true
        })
    }, [tasks]);

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index &&
                // tasks?.map((task) =>
                //     task.finished &&  <TaskCard key={task.id} task={task} />

                finishedTasks?.map((task) =>
                    <TaskCard key={task.id} task={task} showDeletModal={showDeletModal} handleEditTask={handleEditTask} />
                )
            }
        </div>
    )
}
