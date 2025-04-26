import React, { useContext, useMemo } from 'react'
import { TaskCard } from './TaskCard'
import { useTasks } from '../Contexts/tasksContext';

export const Unfinished = ({ value, index, showDeletModal, handleEditTask  }) => {
    let {tasks, setTasks} = useTasks();

    let unFinishedTasks = useMemo(() => {
        return tasks.filter((t) => {
            return t.finished === false
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
                //    !task.finished &&  <TaskCard key={task.id} task={task} />
                // )

                unFinishedTasks?.map((task) =>
                    <TaskCard key={task.id} task={task} showDeletModal={showDeletModal} handleEditTask={handleEditTask} />
                 )
            }
        </div>
    )
}
