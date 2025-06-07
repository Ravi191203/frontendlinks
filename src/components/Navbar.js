import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>rrgs_dev_</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
