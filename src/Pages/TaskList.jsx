//importo componente taskrow
import TaskRow from "../components/TaskRow";

//importo variabile globale, risultato da chiamata api
import { useGlobalTasks } from "../context/TaskContext";

//import del relativo css
import './TaskList.css';


function TaskList() {

  const { tasks } = useGlobalTasks();

  return (
    <>
      <section className='taks-row'>
        <h1>Tabella Tasks</h1>
        <table className="table-width">
          <thead>
            <tr>
              <th className="table-task">Titolo</th>
              <th className="table-task">Stato</th>
              <th className="table-task">Data Creazione</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              // Passo l oggetto task specifico come prop
              <TaskRow key={t.id || t.title} task={t} />
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default TaskList
