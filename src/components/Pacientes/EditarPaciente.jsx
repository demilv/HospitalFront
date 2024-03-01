import React, { useState, useEffect } from 'react';
import "./EditarPaciente.css";

function EditarPaciente({ paciente, onCancel, habitacion, onUpdate }) {
  const [editedPatient, setEditedPatient] = useState({
    nombre: paciente.nombre,
    telefono: paciente.telefono,
    descripcion: paciente.descripcion,
    habitacion: paciente.habitacion,
  });

  const [habitacionCambiada, setHabitacionCambiada] = useState(false);

  useEffect(() => {
    setEditedPatient((prev) => ({ ...prev, habitacionOriginal: paciente.habitacion }));
  }, [paciente.habitacion]);

  const handleChange = (field, value) => {
    setEditedPatient((prev) => ({ ...prev, [field]: value }));
  };

  const handleHabitacionChange = () => {
    const habitacionesDisponibles = habitacion.filter(habitacion => !habitacion.ocupada);

    if (habitacionesDisponibles.length === 0) {
        console.log('No hay habitaciones disponibles.');
        return;
    }

    const randomIndex = Math.floor(Math.random() * habitacionesDisponibles.length);
    const randomHabitacion = habitacionesDisponibles[randomIndex];

    setEditedPatient(prev => ({
        ...prev,
        habitacion: randomHabitacion._id
    }));

    setHabitacionCambiada(true);
};

  const handleAceptarCambios = async () => {
    try {
      const res = await fetch(
        `https://hospital-back.vercel.app/pacientesBase/upPaciente/${paciente._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedPatient),
        }
      );

      if (res.ok) {
        console.log('Cambios aceptados correctamente.');
        onCancel(); // Volvemos a la vista principal después de aceptar cambios
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
          <label>Su Nombre Actual: </label>
          <input
            type="text"
            value={editedPatient.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
          />
        </li>
        <li className='editLi'>
          <label>Teléfono:</label>
          <input
            type="text"
            value={editedPatient.telefono}
            onChange={(e) => handleChange('telefono', e.target.value)}
          />
        </li>
        <li className='editLi'>
          <label>Descripción/Prueba:</label>
          <input
            type="text"
            value={editedPatient.descripcion}
            onChange={(e) => handleChange('descripcion', e.target.value)}
          />
        </li>
        <li className='editLi'>
          <label>¿Desea cambiar la habitación?</label>
          <select value={habitacionCambiada ? 'yes' : 'no'} onChange={handleHabitacionChange}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
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

