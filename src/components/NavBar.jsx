import { NavLink } from "react-router-dom"
import './NavBar.css'

function NavBar() {
  

  return (
    <>
      <header>
        <nav>
            <ul>
                <li>
                    <NavLink to="/">HomePage</NavLink>
                </li>
                <li>
                    <NavLink to="/TaskList">TaskList</NavLink>
                </li>
                <li>
                    <NavLink to="/AddTask">AddTask</NavLink>
                </li>
            </ul>
        </nav>
      </header>
    </>
  )
}

export default NavBar
