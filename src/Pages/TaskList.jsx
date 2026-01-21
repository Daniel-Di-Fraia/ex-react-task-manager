//importo componente taskrow
import TaskRow from "../components/TaskRow";

//importo variabile globale, risultato da chiamata api
import { useGlobalTasks } from "../context/TaskContext";

//importo useMemo e useState da react
import { useState, useMemo } from 'react';

//import del relativo css
import './TaskList.css';

//oggetto per ordinamento colonna stato
const orderingStatus = {
  "To do": 1,
  "Doing": 2,
  "Done": 3
};


function TaskList() {

  const { tasks } = useGlobalTasks();

  //variabili di stato per ordinamento
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState(1);

  //funzione al click intestazione colonna lista task
  const handleOrder = (nomeColonna) => {
    if (nomeColonna === sortBy) {
      setSortOrder(sortOrder * -1);
    } else {
      setSortBy(nomeColonna);
      setSortOrder(1);
    }
  }

  //funzione per ordinamento tasks
  const orderedTasks = useMemo(() => {
    const cloneTask = [...tasks];

    cloneTask.sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);

      } else if (sortBy === 'status') {
        comparison = orderingStatus[a.status] - orderingStatus[b.status];

      } else if (sortBy === 'createdAt') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      return comparison * sortOrder;

    });

    return cloneTask;

  }, [tasks, sortBy, sortOrder]);

  return (
    <>
      <section className='taks-row'>
        <h1>Tabella Tasks</h1>
        <table className="table-width">
          <thead>
            <tr>
              <th onClick={() => handleOrder('title')} className="table-task">Titolo</th>
              <th onClick={() => handleOrder('status')} className="table-task">Stato</th>
              <th onClick={() => handleOrder('createdAt')} className="table-task">Data Creazione</th>
            </tr>
          </thead>
          <tbody>
            {orderedTasks.map((t) => (
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
