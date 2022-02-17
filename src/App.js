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
      <Row>
        <Col className='text-center'>
          <p>
            <a href='https://www.themoviedb.org/' target='_blank' rel="noreferrer">
              <img src={require(`./images/tmdb-logo.png`)} alt="The Movie Database Logo" width="148px" />
            </a>
            <br />
            <span style={{ fontSize: '.9rem' }}>
              Created by <a href='https://zoltanlederer.com/' target='_blank' rel="noreferrer" style={{ color: '#fff', textDecoration: 'none'}}>zoltanlederer.com</a>
            </span>
          </p>
          
          
        </Col>
        
      </Row>
    </Container>
  )
}

export default App;
