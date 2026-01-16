import { useState, useRef } from "react";
import { useGlobalTasks } from "../context/TaskContext";

//import il relativo css
import './AddTask.css'

function AddTask() {

  //variabili di controllo input
  const [titolo, setTitolo] = useState("");

  //variabili per from senza controllo con useRef
  const statusRef = useRef();
  const descriptionRef = useRef();

  // Estraiamo la funzione addTask dal contesto globale
  const { addTask } = useGlobalTasks();

  const symbols = "!@#$%^&*()-_=+[]{}|;:',.<>?/`~";

  //controllo se il titolo è valido, non deve contenere simboli
  const isTitleValid = () => {
    const chars = titolo.split('');
    const hasSymbol = chars.some(char => symbols.includes(char));
    return hasSymbol;
  }

  //funzione per gestire il submit del form
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Controllo validità
    if (!isTitleValid()) {

      // oggetto con i dati aggiornati da utente
      const newTask = {
        title: titolo,
        description: descriptionRef.current.value,
        status: statusRef.current.value
      };

      try {

        await addTask(newTask);

        alert("Task creata con successo!");
        setTitolo("");
        statusRef.current.value = "";
        descriptionRef.current.value = "";
      } catch (err) {
        alert("Errore: " + err.message);
      }

    } else {
      alert('Il titolo non deve contenere simboli speciali');
    }
  };

  return (
    <>
      <h1>Aggiungi una nuova task</h1>
      <form onSubmit={handleSubmit} className="form-row">
        <label>Nome Task</label>
        <input
          placeholder="inserisci nome task"
          value={titolo}
          onChange={(e) => setTitolo(e.target.value)}
          type="text"
          required
        />
        <label>Stato</label>
        <select ref={statusRef}>
          <option value="">-- Seleziona --</option>
          <option value="To do">To Do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
        <label>Descrizione</label>
        <textarea
          ref={descriptionRef}
          type="text"
          placeholder="inserisci la descrizione della task"
          required
        />
        <button type="submit">Aggiungi Task</button>
      </form>
    </>
  )
}

export default AddTask
