//importo createContext e useContext da react
import { createContext, useContext } from 'react';

//importo il custom hook
import useTasks from '../customhooks/useTasks';

//oggetto che servirà per condividere dati tra componenti senza dover passare props
const TasksContext = createContext();

//creazione provider che conterrà i valori del contesto condivisibili in tutta la pagina
const TasksProvider = ({ children }) => {

    const { addTask, removeTask, updateTask, tasks } = useTasks();

    //provider del contesto
    return (
        <TasksContext.Provider
            // dati resi disponibili 
            value={{ tasks, addTask, removeTask, updateTask }}>
            {/* componenti figli inclusi dal provider */}
            {children}
        </TasksContext.Provider>
    )
}

const useGlobalTasks = () => {
    const context = useContext(TasksContext);
    if (!context) {
        throw new Error("useGlobalTasks deve essere usato all'interno di un TasksProvider");
    }
    return context;
};

export { TasksProvider, useGlobalTasks }