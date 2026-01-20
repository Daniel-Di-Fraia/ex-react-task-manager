import { useState, useEffect, useRef } from 'react';
import Modal from './Modal';

export default function EditTaskModal({ show, onClose, task, onSave }) {
    const editFormRef = useRef(null); // Riferimento per il submit manuale [web:4]

    // Stati controllati per i campi del form
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To do');

    // Sincronizza i campi quando il task cambia o la modale si apre
    useEffect(() => {
        if (task && show) {
            setTitle(task.title);
            setDescription(task.description || '');
            setStatus(task.status);
        }
    }, [task, show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Passiamo l'oggetto aggiornato alla funzione onSave [web:8]
        onSave({ 
            title, 
            description, 
            status 
        });
    };

    // Definiamo il contenuto da passare alla modale
    const formContent = (
        <form ref={editFormRef} onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
                <label>Nome:</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label>Descrizione:</label>
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <label>Stato:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="To do">To do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
            </div>
        </form>
    );

    return (
        <Modal 
            show={show}
            onClose={onClose}
            title="Modifica Task"
            content={formContent} // Passiamo il form come contenuto
            confirmText="Salva"
            // Attiva il submit del form tramite la ref [web:4]
            onConfirm={() => editFormRef.current.requestSubmit()}
        />
    );
}
