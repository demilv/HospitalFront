import '../styles/App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { dark } from './Context/darkContext'

import Navbar from "./Navbar/Navbar"
import Home from "./Home/Home"
import Contact from "./Contact/Contact"
import Footer from "./Footer/Footer"
import Login from "./Login/Login"
import Habitaciones from "./Habitaciones/Habitaciones";
import Pacientes from "./Pacientes/Pacientes";
import AddNew from './AddNew/AddNew';

function App() {
    const navigate = useNavigate();
    // primer estado del user null, aun no se  define
    const [user, setUser] = useState(null);
    const [loginError, setLoginError] = useState('');
    const loginUser = (formData, prevRoute) => {
    /*  const existsUser = usuarios.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );
      if (existsUser) {
        // segundo estado del user, informacion del usuario logado
        setUser(existsUser);
        setLoginError('');
        // en caso que el login se haya realizado a partir de una ruta protegida a la cual no se tenia acceso, un vez has iniciado sesion devuelvete a la ruta protegida y sino ve al home
        navigate(prevRoute || '/');
      } else {
        // tercer estado del user false, ha tratado de hacer login y no pudo
        setUser(false);
        setLoginError('Usuario o contraseña incorrecta');
      }
      */
    };
    
    const logoutUser = () => {
      setUser(null);
      navigate('/');
    };

    return (
        <div /*className={`App-header ${background ? 'black' : 'orange'}`}*/>
        <Navbar user={user} logoutUser={logoutUser} />    
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Habitaciones" element={<Habitaciones />} />
        <Route path="/Pacientes" element={<Pacientes />} />
        <Route path="/AddNew" element={<AddNew />} />      
        </Routes>
        <Footer></Footer>
      </div> 
    );
}
export default App;