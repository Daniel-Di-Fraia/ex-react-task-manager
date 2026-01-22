//importo componente taskrow
import TaskRow from "../components/TaskRow";

//importo variabile globale, risultato da chiamata api
import { useGlobalTasks } from "../context/TaskContext";

//importo useMemo e useState da react
import { useState, useMemo, useRef, useCallback } from 'react';

//import del relativo css
import './TaskList.css';

//oggetto per ordinamento colonna stato
const orderingStatus = {
  "To do": 1,
  "Doing": 2,
  "Done": 3
};

//funzione debounce generica
function debounce(callback, delay){
  let timer;
  return(value)=>{
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  }
}


function TaskList() {

  //prova renders per debounce
  console.log('render');

  const { tasks } = useGlobalTasks();

  //variabili di stato per ordinamento
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState(1);

  //variabile di stato per ricerca
  const [search, setSearch] = useState('');

  const debounceSearch = useCallback(debounce(setSearch, 500));

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
  const filteredAndOrderedTasks = useMemo(() => {
    // const cloneTask = [...tasks];

    //filtriamo l'array di partenza
    const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));

    //ordiniamo il nuovo array filtrato con condizioni
    filteredTasks.sort((a, b) => {
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

    //ritorniamo il nuovo array filtrato e ordinato
    return filteredTasks;

  }, [tasks, sortBy, sortOrder, search]);

  //useRef per tenere in memoria l id del timer tra i render
  // const timeoutRef = useRef(null);

  // const handleSearchTime = useCallback((e) => {
  //   const value = e.target.value;

  //   if (timeoutRef.current) {
  //     clearTimeout(timeoutRef.current);
  //   }

  //   timeoutRef.current = setTimeout(() => {
  //     setSearch(value);
  //   }, 500);

  // }, []);

  return (
    <>
      <section className='taks-row'>
        <h1>Tabella Tasks</h1>
        <input
          type="text"
          placeholder="Cerca una task..."
          onChange={(e) => debounceSearch(e.target.value)}
          className="search-input"
        />

        <table className="table-width">
          <thead>
            <tr>
              <th onClick={() => handleOrder('title')} className="table-task">Titolo</th>
              <th onClick={() => handleOrder('status')} className="table-task">Stato</th>
              <th onClick={() => handleOrder('createdAt')} className="table-task">Data Creazione</th>
            </tr>
          </thead>
          <tbody>
            {/* passo il nuovo array con logica di ordinamento ivnece di tasks */}
            {filteredAndOrderedTasks.map((t) => (
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
