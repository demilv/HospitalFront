import "./AddNew.css";

function AddNew() {
    
    const handleCreate = async () => {
        try {

            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const descripcion = document.getElementById('descripcion').value;

            const data = {
                nombre,
                telefono,
                descripcion
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
                <form className="PacienteForm">
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" placeholder="Ingrese el nombre del paciente" />

                <label htmlFor="telefono">Teléfono:</label>
                <input type="tel" id="telefono" name="telefono" placeholder="Ingrese el teléfono del paciente" />

                <label htmlFor="descripcion">Descripción:</label>
                <textarea id="descripcion" name="descripcion" placeholder="Ingrese la descripción del paciente"></textarea>

                <button type="button" onClick={() => handleCreate()}>Guardar</button>
                </form>
        </div>
      );
}

export default AddNew;