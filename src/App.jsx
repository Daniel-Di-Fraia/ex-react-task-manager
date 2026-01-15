//import per css
import './App.css'

//importiamo browser router per rotte
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//importiamo pagine componenti
import TaskList from './Pages/TaskList'
import AddTask from './Pages/AddTask'
import HomePage from './Pages/HomePage';
import NavBar from './components/NavBar';

function App() {
  

  return (
    <>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/TaskList" element={<TaskList />} />
          <Route path="/AddTask" element={<AddTask />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
