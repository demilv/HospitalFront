import "./Paciente.css";


function Paciente({ ingresados, onDelete }) {

    const renderPacientes = () => {
        return ingresados.map((paciente) => 
        <div className="datosPac" key={paciente._id}>
            <ul className="articlePac" >
                <li className="pacienteInfo">Nombre: {paciente.nombre}</li>
                <li className="pacienteInfo">Habitación: {paciente.habitacion}</li>
                <li className="pacienteInfo">Teléfono: {paciente.telefono}</li>
                <li className="pacienteInfo">Descripción: {paciente.descripcion}</li>
            </ul>
            <ul className="articlePac2">           
                <button className="Up">Update</button>
                <button className="Down" onClick={() => onDelete(paciente._id)}>Delete</button>
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