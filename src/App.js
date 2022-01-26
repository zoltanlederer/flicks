import React, { useContext } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import { GlobalStateContext } from './states/GlobalStates'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {
  const state = useContext(GlobalStateContext)
  const [color, setColor] = state.colorMode

  const theme = createTheme({
    palette: {
      mode: color,
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ border: 1, borderColor: 'error.main'}}>
          <Nav /> 
          <Outlet />                  
        </Container>    
      </ThemeProvider>    
    </>
  );
}

export default App;
