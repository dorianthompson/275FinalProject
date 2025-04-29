import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'; 

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

              <Nav.Link as={Link} to="/" className={`element ${isHomeHovered ? 'elementHome-hover' : ''}`}
           onMouseEnter={() => setIsHomeHovered(true)}
           onMouseLeave={() => setIsHomeHovered(false)}style={{color: '#FFD200'}}>Home</Nav.Link>
           <Nav.Link as={Link} to="/basic" className={`element ${isBasicHovered ? 'elementBasic-hover' : ''}`}
           onMouseEnter={() => setIsBasicHovered(true)}
           onMouseLeave={() => setIsBasicHovered(false)}style={{color: '#FFD200'}}
         >Basic</Nav.Link>
           <Nav.Link  as={Link} to="/detailed" className={`element ${isDetailedHovered ? 'elementDetailed-hover' : ''}`}
           onMouseEnter={() => setIsDetailedHovered(true)}
           onMouseLeave={() => setIsDetailedHovered(false)}style={{color: '#FFD200'}} >Detailed</Nav.Link>

            </Nav>
            </Container>

      </Navbar>
    </div>
  )
  }