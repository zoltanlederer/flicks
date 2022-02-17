import React from 'react'
import { NavLink, Link } from "react-router-dom";
import ToggleLanguage from './ToggleLanguage';

import '../styles/header.css'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = () => {
  return (
    <>
    <Navbar variant="dark" expand="sm">
      <Container>
        <Navbar.Brand>
          <a href='/' >
            <img
              src={require(`../images/flicks-logo.png`)}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="Flicks logo"
            />  
          </a>          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"  className="justify-content-end">
          <Nav>
            <a href='/' className='custom-navlink-nonactive custom-navlink'>
                Home
            </a>

            {/* <NavLink to='/' className= {({isActive}) => isActive ? 'custom-navlink-active custom-navlink' : 'custom-navlink-nonactive custom-navlink' }    > */}              
              {/* Home */}
            {/* </NavLink> */}
            
            {/* <NavLink to='/search' className= {({isActive}) => isActive ? 'custom-navlink-active custom-navlink' : 'custom-navlink-nonactive custom-navlink' }    >
              Search
            </NavLink> */}

            <ToggleLanguage />

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header