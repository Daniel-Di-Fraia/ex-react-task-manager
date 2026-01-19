//importo useparams da react router dom
import { useParams, Link } from 'react-router-dom';

//importo il context
import { useGlobalTasks } from "../context/TaskContext";

//importo il relativo css
import "./TaskDetail.css"

export default function TaskDetail() {
    const { id } = useParams();

    //Recupero i task dal context
    const { tasks } = useGlobalTasks();

    // Cerca il task specifico che corrisponde all'id dell'URL
    const task = tasks.find(t => String(t.id) === id);

    //Se la task non viene trovato 
    if (!task) {
        return <h1>Task non trovato!</h1>;
    }

    const deleteTask = () => {
        console.log("elimino task");
    }

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
                    <button onClick={deleteTask} id="delete-btn">Elimina Task</button>
                    <Link to="/TaskList">
                        <button>Torna alla lista</button>
                    </Link>
                </div>
            </section>
        </>
    );
}
