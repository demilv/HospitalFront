import { Link } from "react-router-dom";
// import NavLogged from "./NavLogged"
import "./Navbar.css";

const NavBar = ({ user, logoutUser }) => {


    return (        
        <nav className="navbar">
            <div className="header">
                <h1 className="logo">
                    <Link to="/">Hospital App</Link>
                </h1>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/habitaciones">Habitaciones</Link>
                    </li>
                    <li>
                        <Link to="/pacientes">Pacientes</Link>
                    </li>
                    <li>
                        <Link to="/addnew">New</Link>
                    </li>
                </ul>    

              {/* {user && user.role === "admin" ? <NavLogged /> : null} */}
   

                {/*<h1>
                    {user ? <button onClick={logoutUser}>Logout</button> : <Link to="/login">Login</Link>}
                </h1> */}
                
            </div>
        </nav>
    )
}

export default NavBar;