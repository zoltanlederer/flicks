import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { GlobalStateContext } from '../states/GlobalStates'


const ToggleColorMode = () => {
  const state = useContext(GlobalStateContext)
  const [color, setColor] = state.colorMode
  const theme = useTheme();

  const handleColor = () => (
    color === 'dark' ? setColor('light') : setColor('dark')
  )

  return (
    <>
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} onClick={handleColor} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </>
  );
}

export default ToggleColorMode