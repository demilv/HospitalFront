import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import "./Navbar.css";

const NavBar = ({  logoutUser }) => {
  const location = useLocation();

  const token = localStorage.getItem("token");
  
  let logged = false;

  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;     
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
    } else {
      logged = true;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <Navbar bg="terciary" style={{ backgroundColor: "#90D5FD" }} expand="lg">
      <Navbar.Brand className="navbarTitle">¡Saludos! Disfruta de nuestro programa</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" variant="tabs">          
          <Nav.Item>
            <Nav.Link as={Link} to="/contacto" eventKey="/contacto">Contacto</Nav.Link>
          </Nav.Item>
          {logged ? (
            <>
              <Nav.Item>
                <Nav.Link as={Link} to="/habitaciones" eventKey="/habitaciones">Habitaciones</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/pacientes" eventKey="/pacientes">Listado Pacientes</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/anadirNuevo" eventKey="/anadirNuevo">Nuevo Paciente</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/" onClick={() => { handleLogout(); logoutUser(); }}>Cerrar sesión</Nav.Link>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item>
                <Nav.Link as={Link} to="/" eventKey="/">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/login" eventKey="/login">Login</Nav.Link>
              </Nav.Item>
            </>
          )}
          <Nav.Item>
            <Nav.Link as={Link} to="/enConstruccion" eventKey="/enConstruccion">En Construcción</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
