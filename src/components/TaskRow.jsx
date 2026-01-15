//import del relativo css
import './TaskRow.css'

//importo memo
import { memo } from 'react';

const TaskRow = memo(function TaskRow({ task }) {

    //mappa per colore e valore corrispondente
    const statusClasses = {
        "To do": "bg-red",
        "Doing": "bg-yellow",
        "Done": "bg-green"
    };

    // Recuperiamo la classe dinamica
    const colorClass = statusClasses[task.status] || "";

    return (
        <tr>
            <td className="table-task">{task.title}</td>
            <td className={`${colorClass} table-task black-font`}>
                {task.status}
            </td>
            <td className="table-task">{task.createdAt}</td>
        </tr >
    );
});

export default TaskRow