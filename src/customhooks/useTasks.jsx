//importo useState e useEffect da react
import { useState, useEffect } from "react";

export default function useTasks() {

    //variabili di stato per chiamata api ed errori
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    // richiamo variabile di ambiente
    const url = import.meta.env.VITE_API_URL;

    //funzione per aggiungere tasks
    const addTask = async (newTask) => {
        try {
            const response = await fetch(`${url}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask) // Trasformo l'oggetto in testo
            });

            const data = await response.json(); //risposta server

            if (data.success) {

                setTasks((prev) => [...prev, data.task]);
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            throw err;
        }
    };


    //funzione per rimuovere tasks
    const removeTask = () => {
        console.log('task rimossa!');
    }

    //funzione per modificare tasks
    const updateTask = () => {
        console.log('task modificata!');
    }

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

    //ritorno la variabile di stato con i dati presi dalla chiamata e le funzioni per le tasks
    return { addTask, removeTask, updateTask, tasks };

}

