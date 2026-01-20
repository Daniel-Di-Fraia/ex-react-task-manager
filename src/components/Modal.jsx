import ReactDOM from 'react-dom';

//importo il relativo css
import './Modal.css';

const Modal = ({ 
  title, 
  content, 
  show, 
  onClose, 
  onConfirm, 
  confirmText = "Conferma" 
}) => {
  // Se show è false, il componente non renderizza nulla
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-container">
        <header className="modal-header">
          <h2>{title}</h2>
        </header>
        <main className="modal-content">
          <p>{content}</p>
        </main>
        <footer className="modal-footer">
          <button onClick={onClose} className="btn-cancel">
            Annulla
          </button>
          <button onClick={onConfirm} className="btn-confirm">
            {confirmText}
          </button>
        </footer>
      </div>
    </div>,
    // Nodo DOM esterno
    document.getElementById('modal-root')
  );
};

export default Modal;
