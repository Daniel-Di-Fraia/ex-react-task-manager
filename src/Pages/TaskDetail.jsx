//importo useparams da react router dom
import { useParams, Link, useNavigate } from 'react-router-dom';

//import useState da react
import { useState } from 'react';

//importo il context
import { useGlobalTasks } from "../context/TaskContext";

//importo il relativo css
import "./TaskDetail.css"

//importo la modale di conferma
import Modal from '../components/Modal';

export default function TaskDetail() {

    const { id } = useParams();

    //Recupero i task dal context
    // Estraggo la funzione remove task dal contesto globale
    const { tasks, removeTask } = useGlobalTasks();

    //variabile di stato per gestire visibilità modale
    const [isModalOpen, setIsModalOpen] = useState(false);

    //navigatore 
    const navigate = useNavigate();

    // Cerca il task specifico che corrisponde all'id dell'URL
    const task = tasks.find(t => String(t.id) === id);

    //Se la task non viene trovato 
    if (!task) {
        return <h1>Task non trovato!</h1>;
    }

    const handleConfirmDelete = async () => {
        try {
            await removeTask(task.id);

            //setto a false lo stato della modale per chiuderla dopo la conferma
            setIsModalOpen(false);

            //conferma eliminazione
            alert('Task eliminata con successo!');

            //rendirizzo l utente alla lista
            navigate('/TaskList');

        } catch (err) {
            alert('Errore: ' + err.message);
        }
    };
    
    return (
        <>
            <h1>Task numero: {id}</h1>
            <section>
                <ul className="task-flex-container">
                    <li><strong>Titolo:</strong> {task.title}</li>
                    <li><strong>Descrizione:</strong> {task.description}</li>
                    <li><strong>Stato:</strong> {task.status}</li>
                    <li><strong>Creato il:</strong> {task.createdAt}</li>
                </ul>
                <div>
                    <button onClick={()=> setIsModalOpen(true)} id="delete-btn">Elimina Task</button>
                    <Link to="/TaskList">
                        <button>Torna alla lista</button>
                    </Link>
                </div>
            </section>

            {/* componente modale con i relativi props */}
            <Modal 
                show={isModalOpen}
                title="Conferma Eliminazione"
                content={`Sei sicuro di voler eliminare la task: "${task.title}"?`}
                onClose={()=> setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                onConfrimText="Task Eliminata!"
            />
        </>
    );
}
