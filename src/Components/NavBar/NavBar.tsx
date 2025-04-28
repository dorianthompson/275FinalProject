import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './Navbar.css'

import { useState } from 'react';

export default function NavBar() {
  const [isHomeHovered, setIsHomeHovered] = useState(false);
  const [isBasicHovered, setIsBasicHovered] = useState(false);
  const [isDetailedHovered, setIsDetailedHovered] = useState(false);
  return (
    <div>
      <Navbar style={{backgroundColor: "#00539F"}}>
    <Container fluid>
        <Nav
          style={{ maxHeight: '100px', color: '#FFD200' }}
          className={`me-auto`}
          navbarScroll
        >
          <Nav.Link className={`element ${isHomeHovered ? 'elementHome-hover' : ''}`}
          onMouseEnter={() => setIsHomeHovered(true)}
          onMouseLeave={() => setIsHomeHovered(false)}style={{color: '#FFD200'}} href="/">Home</Nav.Link>
          <Nav.Link className={`element ${isBasicHovered ? 'elementBasic-hover' : ''}`}
          onMouseEnter={() => setIsBasicHovered(true)}
          onMouseLeave={() => setIsBasicHovered(false)}style={{color: '#FFD200'}}
        href="/basic">Basic</Nav.Link>
          <Nav.Link  className={`element ${isDetailedHovered ? 'elementDetailed-hover' : ''}`}
          onMouseEnter={() => setIsDetailedHovered(true)}
          onMouseLeave={() => setIsDetailedHovered(false)}style={{color: '#FFD200'}} href="/detailed">Detailed</Nav.Link>
        </Nav>
        </Container>
  </Navbar>
    </div>
  )
}
