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
    <div className="roomDiv">
      <div className="wingBar">
        <ul className="roomButtons">
                    <li className="roomButtonsList">
                        <button className="wingButton" value= "1" onClick={(ev) => setWing(ev.target.value)}> Ala 1 </button>
                    </li>
                    <li className="roomButtonsList">
                        <button className="wingButton" value= "2" onClick={(ev) => setWing(ev.target.value)}> Ala 2 </button>
                    </li>
                    <li className="roomButtonsList">
                        <button className="wingButton" value= "3" onClick={(ev) => setWing(ev.target.value)}> Ala 3 </button>
                    </li>
                    <li className="roomButtonsList">
                        <button className="wingButton" value= "4" onClick={(ev) => setWing(ev.target.value)}> Ala 4 </button>
                    </li>
                </ul>  
      </div>
      <div className="roomResults">
        <AlaHabitacion rooms={rooms}></AlaHabitacion>
      </div>
    </div>
    </>
  );
}

export default Habitaciones;