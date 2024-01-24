import "./Habitaciones.css";


function AlaHabitacion({ rooms }) {

    const renderRooms = () => {
        return rooms.map((room) => 
        <article className="articleHab" key={room.id}>
            <h4 className="roomLeftData">Habitación {room.numero}</h4>
            <h4 className="roomRightData">{room.ocupada ? "Ocupada" : "No Ocupada"}</h4>
        </article>)
    }

    return (
        <section className="roomSection">
            {renderRooms()}
        </section>
    )
}
export default AlaHabitacion