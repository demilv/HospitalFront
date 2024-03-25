
import '../styles/App.css';
import { useEffect, useState } from 'react';
import { dark } from './Context/darkContext';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Navbar from "./Navbar/Navbar"
import Home from "./Home/Home"
import Contacto from "./Contacto/Contacto"
import Footer from "./Footer/Footer"
import Login from "./Login/Login"
import Habitaciones from "./Habitaciones/Habitaciones";
import Pacientes from "./Pacientes/Pacientes";
import AnadirNuevo from './AnadirNuevo/AnadirNuevo';
import EnConstruccion from './EnConstruccion/EnConstruccion';

function App() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser(token);
        }
    }, []);

    const logoutUser = () => {
        console.log(user)
        setUser(null);
        navigate('/');
    };

    const handleDark = () => {
        setIsDark(!isDark); 
    };

    const updateUser = (loggedIn) => {
      setUser(loggedIn);
  };

    return (
        <dark.Provider value={{isDark, handleDark}}>
            <div className={`mode ${isDark ? 'dark' : 'light'}`}>
                <Navbar  logoutUser={logoutUser} />   
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/login" element={<Login updateUser={updateUser} />} />
                    {user && (
                        <>
                            <Route path="/habitaciones" element={<Habitaciones />} />
                            <Route path="/pacientes" element={<Pacientes />} />
                            <Route path="/anadirNuevo" element={<AnadirNuevo />} />
                        </>
                    )}
                    <Route path="/enConstruccion" element={<EnConstruccion />} />
                </Routes>
                <Footer handleDark={handleDark}></Footer>
            </div> 
        </dark.Provider>
    );
}
export default App;
