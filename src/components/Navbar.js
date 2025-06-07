import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";


function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/" 
          className="fw-bold text-primary fs-4"
        >
          rrgs_dev_
        </Navbar.Brand>
        
        <Navbar aria-controls="basic-navbar-nav" />
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/register" 
              className="px-3 fw-medium text-light hover-effect"
            >
              Register
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/login" 
              className="px-3 fw-medium text-light"
            >
              Login
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/" 
              className="px-3 fw-medium text-light hover-effect"
            >
              Dashboard
            </Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;