import React, { useContext } from "react";
import { dark } from '../Context/darkContext';
import "./Footer.css";

const Footer = () => {
    const { isDark, handleDark } = useContext(dark);

    const darkColor = "dark"
    const lightColor = "light"

    return (
        <footer className={`footer ${isDark ? darkColor : lightColor}`} style={{ backgroundColor: "#90D5FD" }}>
            <button className="footerButton footerButton-pushable" onClick={handleDark}>
            <span className="footerButtonS1"></span>
            <span className="footerButtonS2"></span>
            <span className="footerButtonS3">Activar modo oscuro</span></button>
            <p>&copy; 2023 Hospital App. All rights reserved.</p>
        </footer>
    );
};

export default Footer;