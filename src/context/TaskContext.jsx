import { createContext, useContext, useState, useEffect } from 'react';

//oggetto che servirà per condividere dati tra componenti senza dover passare props
const TasksContext = createContext();

// richiamo variabile di ambiente
const url = import.meta.env.VITE_API_URL;

//creazione provider che conterrà i valori del contesto condivisibili in tutta la pagina
const TasksProvider = ({ children }) => {

    //stato per raccogliere dati chiamata api
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    //funzione per chiamata api
    async function fetchTasks() {

        try {
            const response = await fetch(`${url}/tasks`);
            if (!response.ok) {
                throw new Error('errore nel caricamento dei dati');
            }
            const data = await response.json();
            console.log("Dati ricevuti dall'API:", data);
            setTasks(data);
        } catch (err) {
            console.error("Errore durante la fetch:", err);
            setError(err.message);
        }

    }

    //effettuiamo la chiamata solo al primo render
    useEffect(() => {
        fetchTasks();
    }, []);

    //provider del contesto
    return (
        <TasksContext.Provider
            // dati resi disponibili 
            value={{ tasks }}>
            {/* componenti figli inclusi dal provider */}
            {children}
        </TasksContext.Provider>
    )
}

const useTasks = () => {
    const context = useContext(TasksContext);
    return context;
};

export { TasksProvider, useTasks }