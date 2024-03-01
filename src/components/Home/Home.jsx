import { useContext } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="homeContainer">
        <div className="homeContainerColumn1"></div>
            <div className="homeContainerColumn2">
                    <div className="content">
                        <h2>Welcome to Our Hospital</h2>
                        <p>We are dedicated to providing quality healthcare...</p>
                        <h3>Press here to log in: <Link to="/login">Login</Link></h3>
                    </div>                
            </div>            
            <div className="homeContainerColumn3"></div>
        </div>
    );
}


export default Home;




    /*className={background ? "black" : "orange"}*/