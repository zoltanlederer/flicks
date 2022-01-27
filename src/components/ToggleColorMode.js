import React, { useEffect, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { GlobalStateContext } from '../states/GlobalStates'


const ToggleColorMode = () => {
  const state = useContext(GlobalStateContext)
  const [color, setColor] = state.colorMode
  const theme = useTheme();

  const handleColor = () => {
    const colorTheme = localStorage.getItem('colorMode')
    if (colorTheme === null) {
      localStorage.setItem('colorMode', 'dark' )
      setColor(localStorage.getItem('colorMode'))
    }
    
    if (colorTheme === 'dark') {
      localStorage.setItem('colorMode', 'light' )
      setColor(localStorage.getItem('colorMode'))
    }

    if (colorTheme === 'light') {
      localStorage.setItem('colorMode', 'dark' )
      setColor(localStorage.getItem('colorMode'))
    }
  }

  return (
    <>
      {theme.palette.mode.charAt(0).toUpperCase() + theme.palette.mode.slice(1)} mode
      <IconButton sx={{ ml: 1 }} onClick={handleColor} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </>
  );
}

export default ToggleColorMode