import React from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {
  return (
    <Container>
      <Row >
        <Col>
          <Header /> 
          <Outlet />
        </Col>          
      </Row>        
    </Container>
  )
}

export default App;
