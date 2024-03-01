import "./AnadirNuevo.css";
import React, { useState, useEffect } from 'react';


function AnadirNuevo() {

    const [ingresados, setIngresados] = useState([])

    const getDataApi = async () => {
        const res = await fetch(
          `https://hospital-back.vercel.app/pacientesBase`
        );
        const resJson = await res.json();
        setIngresados(resJson);
    }

    const [newPatient, setNewPatient] = useState({
        nombre: '',
        telefono: '',
        descripcion: ''
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPatient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleCreate = async () => {
        try {

            const data = {
                nombre: newPatient.nombre,
                telefono: newPatient.telefono,
                descripcion: newPatient.descripcion
            };

            console.log(data);

            const res = await fetch(
                `https://hospital-back.vercel.app/pacientesBase/newPaciente`, { method: 'POST', body: JSON.stringify(data), headers: {
                    'Content-Type': 'application/json'
                    }
                }
            );

            if (res.ok) {
                console.log(`El paciente ha sido creado correctamente.`);
            } else {
                console.error(`No se pudo crear el paciente.`);
            }
        } catch (error) {
            console.error(`Ocurrió un problema al intentar añadir el paciente. `, error);
        }
    };

    return (                        
        <div>  
            {ingresados.length < 24 ? (     
            <form className="pacienteForm">
                    <input  className="pacienteFormInput" type="text" id="nombre" name="nombre" value={newPatient.nombre} onChange={handleChange} placeholder="Ingrese el nombre del paciente" />

                    <input className="pacienteFormInput" type="tel" id="telefono" name="telefono" value={newPatient.telefono} onChange={handleChange}  placeholder="Ingrese el teléfono del paciente" />

                    <textarea className="pacienteFormTextarea" id="descripcion" name="descripcion" value={newPatient.descripcion} onChange={handleChange} placeholder="Ingrese la descripción del paciente"></textarea>

                    <button className="pacienteFormButton" type="button" onClick={() => handleCreate()}>Guardar</button>
          
            </form> ) : (
            <div className="divFull">
                <h3 className="h3Full">Ahora mismo la lista de pacientes está llena, debes eliminar algunos primero en la pestaña de pacientes</h3>
            </div>
            )}
        </div>
      );
}

export default AnadirNuevo;