//import per css
import './App.css'

//importiamo browser router per rotte
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//importiamo pagine componenti
import TaskList from './Pages/TaskList'
import AddTask from './Pages/AddTask'
import HomePage from './Pages/HomePage';
import NavBar from './components/NavBar';
import TaskDetail from './Pages/TaskDetail';

//importo il provider
import { TasksProvider } from './context/TaskContext';

function App() {


  return (
    <>
    {/* avvolgo tutto app per rendere disponibili i dati in context */}
      <TasksProvider>
        {/* rotte applicazione */}
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/TaskList" element={<TaskList />} />
            <Route path="/AddTask" element={<AddTask />} />
            <Route path="/TaskList/:id" element={<TaskDetail />} />
          </Routes>
        </BrowserRouter>
      </TasksProvider>
    </>
  )
}

export default App
