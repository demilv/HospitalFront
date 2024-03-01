import "./Paciente.css";
import * as React from 'react';
import Button from '@mui/material/Button';
import '@fontsource/roboto/400.css';


function Paciente({ ingresados, onDelete, onUpdate }) {

    const renderPacientes = () => {
        return ingresados.map((paciente) => 
        <div className="datosPaciente" key={paciente._id}>
            <ul className="datosPacienteList" >
                <div className="pacienteInfoDiv">
                    <li className="pacienteInfoLi">Nombre: {paciente.nombre}</li>
                    <li className="pacienteInfoLi">Habitación: {paciente.habitacion}</li>
                    <li className="pacienteInfoLi">Teléfono: {paciente.telefono}</li>
                </div>
                <li className="pacienteInfoLi2">Descripción: {paciente.descripcion}</li>
            </ul>
            <ul className="datosButton">           
                <Button variant="contained" sx={{ marginBottom: '20px' }} color="secondary" size="medium" className="datosButtonUp" onClick={() => onUpdate(paciente._id)}>Update</Button>
                <Button variant="contained" color="error" onClick={() => onDelete(paciente._id)}>Delete</Button>
            </ul>
        </div>)
    }

    return (
        <section className="roomSection">
            {renderPacientes()}
        </section>

    )
}
export default Paciente