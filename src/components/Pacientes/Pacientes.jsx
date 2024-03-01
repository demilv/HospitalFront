import "./Paciente.css";
import { useEffect, useState } from 'react';
import Paciente from './Paciente';
import EditarPaciente from "./EditarPaciente";

function Pacientes() {
    const [ingresados, setIngresados] = useState([]);
    const [eliminado, setEliminado] = useState([false]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [habitaciones, setHabitaciones] = useState([])
    const getDataApi = async () => {
        const res = await fetch(
          `https://hospital-back.vercel.app/pacientesBase`
        );
        const resJson = await res.json();
        setIngresados(resJson);

        const res2 = await fetch(
          "https://hospital-back.vercel.app/habitacionesBase"
        );
        const resJson2 = await res2.json();
        setHabitaciones(resJson2);
      };

      const handleDelete = async (id) => {
        try {
          console.log(id)
          const res = await fetch(
            `https://hospital-back.vercel.app/pacientesBase/delPaciente/${id}`, { method: 'DELETE' }
            );
      
          if (res.ok) {
            setEliminado((prevEliminado) => !prevEliminado);
            console.log(`El paciente con ID ${id} ha sido eliminado correctamente.`);
          } else {
            console.error(`No se pudo eliminar al paciente con ID ${id}.`);
          }
        } catch (error) {
          console.error(`Ocurrió un problema al intentar eliminar al paciente con ID ${id}.`, error);
        }
      };

      const handleUpdate = async (id) => {
        try {
          const res = await fetch(
            `https://hospital-back.vercel.app/pacientesBase/onePaciente/${id}`
          );
          const patientData = await res.json();
          setSelectedPatient(patientData);
          setIsEditing(true);
        } catch (error) {
          console.error(
            `Ocurrió un problema al intentar llamar al paciente con ID ${id}.`,
            error
          );
        }
      };



      useEffect(() => {
        const fetchData = async () => {
          await getDataApi();
        };
      
        fetchData();
      }, [eliminado]);

      return (
        <>
          <div className="roomSectionDiv">
            {isEditing ? (
              <EditarPaciente
                paciente={selectedPatient}
                onCancel={() => setIsEditing(false)}
                habitacion={habitaciones}
                onUpdate={getDataApi}
              />
            ) : (
              ingresados.length > 0 && (
                <Paciente
                  ingresados={ingresados}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              )
            )}
          </div>
        </>
      );
    }
    
    export default Pacientes;
    
