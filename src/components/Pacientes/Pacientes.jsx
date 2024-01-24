import "./Paciente.css";
import { useEffect, useState } from 'react';
import Paciente from './Paciente';

function Pacientes() {
    const [ingresados, setIngresados] = useState([]);
    const [eliminado, setEliminado] = useState([false])
    const getDataApi = async () => {
        const res = await fetch(
          `https://hospital-back.vercel.app/pacientesBase`
        );
        const resJson = await res.json();
        setIngresados(resJson);
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

      useEffect(() => {
        const fetchData = async () => {
          await getDataApi();
        };
      
        fetchData();
      }, [eliminado]);

      return (
        <>                   
          <div>
      {ingresados.length > 0 &&(
        <Paciente 
          ingresados={ingresados}
          onDelete={handleDelete}
        />
      )}
    </div>
        </>
      );
    }
    
    export default Pacientes;
    
