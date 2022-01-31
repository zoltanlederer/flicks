import React from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

// import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Select from 'react-bootstrap/Select';

const handle = (e) => {
  console.log(e.target.value)
}

function App() {
  return (
    // <Container style={{border: '1px solid red'}}>
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
