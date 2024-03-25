import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ updateUser }) {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        nombreusuario : '',
        password : ''
    });    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleCheck = async () => {
        try{

        const data = {
            username: usuario.nombreusuario,
            password: usuario.password.toString()
        };

        console.log(data)

        const res = await fetch(
                `https://hospital-back.vercel.app/usuariosBase/Login`,
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (res.ok) {
                const responseData = await res.json();
                const token = responseData.token;       
                localStorage.setItem("token", token); 
                updateUser(true);
                navigate("/habitaciones");
            } else {
                console.error(`No pudo loguearse.`);
            }
        } catch (error) {
            console.error(`Ocurrió un problema al intentar hacer login.`, error);
        }
    }

    

    return (
        <div className="divLogin">
            <form className="divLoginForm">
                <p>Introduce tus datos de Login: </p>
                <input
                            className="divLoginNombreusuario"
                            type="text"
                            id="nombreusuario"
                            name="nombreusuario"
                            value={usuario.nombreusuario}
                            onChange={handleChange}
                            placeholder="Ingrese su nombre de usuario"
                            maxLength={25}
                        />
                <input
                    className="divLoginPassword"
                    type="password"
                    id="password"
                    name="password"
                    value={usuario.password}
                    onChange={handleChange}
                    placeholder="Ingrese su contraseña"
                    maxLength={15}
                    />
                <button
                    className="divLoginEnviar"
                    type="button"
                    onClick={() => handleCheck()}
                >
                    Enviar
                </button>
            </form>
        </div>
        );
}


export default Login;