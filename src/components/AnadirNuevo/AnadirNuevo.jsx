import "./AnadirNuevo.css";
import React, { useState, useEffect } from 'react';

function AnadirNuevo() {
    const [ingresados, setIngresados] = useState([]);

    const getDataApi = async () => {
        try {
            const res = await fetch(`https://hospital-back.vercel.app/pacientesBase`);
            const resJson = await res.json();
            setIngresados(resJson);
        } catch (error) {
            console.error("Error al obtener los datos de la API:", error);
        }
    };

    useEffect(() => {
        getDataApi();
    }, []);

    const [newPatient, setNewPatient] = useState({
        nombre: '',
        telefono: '',
        descripcion: ''
    });

    const messages = {
        nombre: "El campo no debe estar vacío y debe escribir su nombre correctamente sin números",
        telefono: "El campo no debe estar vacío y debe estar escrito correctamente (8 o 9 numeros)",
        descripcion: "El campo no debe estar vacío y no superar los 50 caracteres",
    };

    const patterns = {
        nombre: /^[a-z ,.'-]+$/i,
        telefono: /^[0-9]+$/,
        descripcion: /^.{0,50}$/,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPatient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreate = async () => {
        try {
            if (!isFormValid()) {
                console.log("Algo no funciona en el formulario.");
                return;
            }

            const data = {
                nombre: newPatient.nombre,
                telefono: newPatient.telefono,
                descripcion: newPatient.descripcion
            };

            const res = await fetch(
                `https://hospital-back.vercel.app/pacientesBase/newPaciente`,
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (res.ok) {
                console.log(`El paciente ha sido creado correctamente.`);
                window.location.reload();
            } else {
                console.error(`No se pudo crear el paciente.`);
            }
        } catch (error) {
            console.error(`Ocurrió un problema al intentar añadir el paciente.`, error);
        }
    };

    const isFormValid = () => {
        const telefonoValido = patterns.telefono.test(newPatient.telefono) && newPatient.telefono.length >= 8 && newPatient.telefono.length <= 9;
        return (
            newPatient.nombre.trim() !== "" &&
            newPatient.telefono.trim() !== "" &&
            newPatient.descripcion.trim() !== "" &&
            telefonoValido &&
            patterns.nombre.test(newPatient.nombre) &&
            patterns.telefono.test(newPatient.telefono) &&
            patterns.descripcion.test(newPatient.descripcion)
        );
    };

    return (
        <div>
            {ingresados.length < 24 ? (
                <form className="pacienteForm">
                    <input
                        className="pacienteFormInput"
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={newPatient.nombre}
                        onChange={handleChange}
                        placeholder="Ingrese el nombre del paciente"
                        maxLength={50}
                    />
                    {newPatient.nombre !== "" && !patterns.nombre.test(newPatient.nombre) && (
                        <span style={{ color: "orange" }}>{messages.nombre}</span>
                    )}

                    <input
                        className="pacienteFormInput"
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={newPatient.telefono}
                        onChange={handleChange}
                        placeholder="Ingrese el teléfono del paciente"
                        maxLength={9}
                        minLength={8}
                    />
                    {newPatient.telefono !== "" && !patterns.telefono.test(newPatient.telefono) && (
                        <span style={{ color: "orange" }}>{messages.telefono}</span>
                    )}

                    <textarea
                        className="pacienteFormTextarea"
                        id="descripcion"
                        name="descripcion"
                        value={newPatient.descripcion}
                        onChange={handleChange}
                        placeholder="Ingrese la descripción del paciente"
                        maxLength={50}
                    ></textarea>
                    {newPatient.descripcion !== "" && !patterns.descripcion.test(newPatient.descripcion) && (
                        <span style={{ color: "orange" }}>{messages.descripcion}</span>
                    )}

                    <button
                        className="pacienteFormButton"
                        type="button"
                        onClick={() => handleCreate()}
                    >
                        Guardar
                    </button>
                </form>
            ) : (
                <div className="divFull">
                    <h3 className="h3Full">Ahora mismo la lista de pacientes está llena, debes eliminar algunos primero en la pestaña de pacientes</h3>
                </div>
            )}
        </div>
    );
}

export default AnadirNuevo;
