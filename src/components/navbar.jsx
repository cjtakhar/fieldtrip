import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/nav.css";

const NavBar = () => {
    return (
      <Navbar className="navBar" expand="lg">
        <Navbar.Brand className="navBrand" as={Link} to="/lfg">FieldTrip</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
      </Navbar>
    );
  };
  
  export default NavBar;
  