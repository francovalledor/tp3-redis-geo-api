import { Container, Nav, Navbar } from "react-bootstrap";

const NavigationBar: React.FC = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Puntos de Interés: </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="pois">POIS</Nav.Link>
            <Nav.Link href="add-poi">Agregar POI</Nav.Link>
            <Nav.Link href="add-place">Agregar Lugar</Nav.Link>
            <Nav.Link href="search">Buscar</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
