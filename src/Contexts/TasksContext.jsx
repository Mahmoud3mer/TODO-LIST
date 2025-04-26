import { createContext, useContext, useEffect, useState } from "react";

let TasksContext = createContext({});

export const TasksProvider = ({ children} ) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const localStorageTasks = JSON.parse(localStorage.getItem('todos')) ?? [];
        setTasks([...localStorageTasks]);
    },[])

    return(
        <TasksContext.Provider value={{tasks:tasks, setTasks: setTasks}}>
            {children}
        </TasksContext.Provider>
    );
}

export const useTasks = () => {
    return useContext(TasksContext);
}