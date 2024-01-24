import "./Habitaciones.css";
import { useEffect, useState } from 'react';
import AlaHabitacion from './AlaHabitacion';

function Habitaciones() {
const [rooms, setRooms] = useState([]);
  const [wing, setWing] = useState(1);
  const getDataApi = async (wing) => {
    const res = await fetch(
      `https://hospital-back.vercel.app/habitacionesBase/wingRoom/${wing}`
    );
    const resJson = await res.json();
    setRooms(resJson);
  };

  useEffect(() => {
    getDataApi(wing);
  }, [wing]);

  return (
    <>
      <div class="wingBar">
      <ul className="room-buttons">
                    <li>
                        <button classname="wingButton" value= "1" onClick={(ev) => setWing(ev.target.value)}> Ala 1 </button>
                    </li>
                    <li>
                        <button classname="wingButton" value= "2" onClick={(ev) => setWing(ev.target.value)}> Ala 2 </button>
                    </li>
                    <li>
                        <button classname="wingButton" value= "3" onClick={(ev) => setWing(ev.target.value)}> Ala 3 </button>
                    </li>
                    <li>
                        <button classname="wingButton" value= "4" onClick={(ev) => setWing(ev.target.value)}> Ala 4 </button>
                    </li>
                </ul>  
      </div>
      <div>
        <AlaHabitacion rooms={rooms}></AlaHabitacion>
      </div>
    </>
  );
}

export default Habitaciones;