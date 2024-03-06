import React, { useState, useEffect } from 'react';
import "./EditarPaciente.css";

function EditarPaciente({ paciente, onCancel, habitacion, onUpdate }) {
  const [editedPatient, setEditedPatient] = useState({
    _id: paciente._id,
    nombre: paciente.nombre,
    telefono: paciente.telefono,
    descripcion: paciente.descripcion,
    habitacion: paciente.habitacion,
  });

  const [habitacionCambiada, setHabitacionCambiada] = useState(false);
  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState([]);

  useEffect(() => {
    const habitacionesDisponibles = habitacion.filter(habitacion => !habitacion.ocupada);
    setHabitacionesDisponibles(habitacionesDisponibles);
  }, [habitacion]);

  useEffect(() => {
    setEditedPatient((prev) => ({ ...prev, habitacionOriginal: paciente.habitacion }));
  }, [paciente.habitacion]);

  const handleChange = (field, value) => {
    setEditedPatient((prev) => ({ ...prev, [field]: value }));
  };

  const handleHabitacionChange = (value) => {
    if (value === 'yes') {
        const habitacionesDisponibles = habitacion.filter(habitacion => !habitacion.ocupada);
        
        if (habitacionesDisponibles.length === 0) {
            console.log('No hay habitaciones disponibles.');
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * habitacionesDisponibles.length);
        const randomHabitacion = habitacionesDisponibles[randomIndex];
        
        setEditedPatient(prev => ({
            ...prev,
            habitacion: [randomHabitacion._id]
        }));
        
        setHabitacionCambiada(true);
    } else {
        setHabitacionCambiada(false);
    }
};


const messages = {
  nombre: "El campo no debe estar vacío y debe escribir su nombre correctamente sin números",
  telefono: "El campo no debe estar vacío y debe estar escrito correctamente (8 o 9 números)",
  descripcion: "El campo no debe estar vacío y no superar los 50 caracteres",
};

const patterns = {
  nombre: /^[a-z ,.'-]+$/i,
  telefono: /^[0-9]{8,9}$/,
  descripcion: /^.{0,50}$/,
};

const isFormValid = () => {
  const telefonoValido = patterns.telefono.test(editedPatient.telefono) && editedPatient.telefono.length >= 8 && editedPatient.telefono.length <= 9;
  return (
      editedPatient.nombre.trim() !== "" &&
      editedPatient.telefono.toString().trim() !== "" &&
      editedPatient.descripcion.trim() !== "" &&
      telefonoValido &&
      patterns.nombre.test(editedPatient.nombre) &&
      patterns.telefono.test(editedPatient.telefono) &&
      patterns.descripcion.test(editedPatient.descripcion)
  );
};



  const handleAceptarCambios = async () => {

    console.log(paciente)
    delete editedPatient.habitacionOriginal;
    console.log(editedPatient)
    if (!isFormValid()) {
      console.log("Algo no funciona en el formulario.");
      return;
  }

    try {

      let res2;
      if (habitacionCambiada === true)
      {
        res2 = await fetch(
          `https://hospital-back.vercel.app/habitacionesBase/upRoom/${paciente.habitacion}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ocupada:false}),
          });
      } 

      const res = await fetch(
        `https://hospital-back.vercel.app/pacientesBase/upPaciente/${paciente._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedPatient),
        });       
           
        if (res.ok && (!habitacionCambiada || res2.ok))  {
        console.log('Cambios aceptados correctamente.');
        onCancel(); 
        onUpdate();
      } else {
        console.error('No se pudieron aceptar los cambios.');
      }
    } catch (error) {
      console.error('Ocurrió un problema al intentar aceptar los cambios.', error);
    }
  };

  

  return (
    <div className='editDiv'>
      <h2>Editar tu Paciente</h2>
      <ul className='editUl'>
        <li className='editLi'>
          <div>
          <label>Su Nombre Actual: </label>
          <input
            type="text"
            value={editedPatient.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
            maxLength={50}
          />
          </div>
          {editedPatient.nombre !== "" && !patterns.nombre.test(editedPatient.nombre) && (
            <span style={{ color: "orange" }}>{messages.nombre}</span>
          )}
        </li>
        <li className='editLi'>
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            value={editedPatient.telefono}
            onChange={(e) => handleChange('telefono', e.target.value)}
            maxLength={9}
            minLength={8}
          />
          </div>
          {editedPatient.telefono !== "" && !patterns.telefono.test(editedPatient.telefono) && (
            <span style={{ color: "orange" }}>{messages.telefono}</span>
          )}
        </li>
        <li className='editLiDescripcion'>
        <div className='editLiDivTextarea'>
          <label>Descripción/Prueba:</label>
        </div>
        <div>
          <textarea
          className='editLiTextarea'
            value={editedPatient.descripcion}
            onChange={(e) => handleChange('descripcion', e.target.value)}
            maxLength={50}
          />
        </div>
          {editedPatient.descripcion !== "" && !patterns.descripcion.test(editedPatient.descripcion) && (
            <span style={{ color: "orange" }}>{messages.descripcion}</span>
          )}
        </li>
        <li className='editLi'>
          
          <div>
          <label>¿Desea cambiar la habitación?</label>
            <input
              type="radio"
              id="yes"
              name="habitacion"
              value="yes"
              checked={habitacionCambiada}
              disabled={habitacionesDisponibles.length === 0}
              onChange={() => handleHabitacionChange('yes')}
            />
            <label htmlFor="yes">Sí</label>

            <input
              type="radio"
              id="no"
              name="habitacion"
              value="no"
              checked={!habitacionCambiada}
              onChange={() => handleHabitacionChange('no')}
            />
            <label htmlFor="no">No</label>
          </div>
        </li>
      </ul>
      <div className='editDivButton'>      
        <button className='editButtonGreen' onClick={handleAceptarCambios}>Aceptar Cambios</button>
        <button className='editButtonRed' onClick={onCancel}>Volver</button>
      </div>
    </div>
  );
}

export default EditarPaciente;
