import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { GlobalStateContext } from '../states/GlobalStates'
import ToggleColorMode from './ToggleColorMode';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Nav = () => {
  const {selectedLanguage, setSelectedLanguage} = useContext(GlobalStateContext)
  const [language, setLanguage] = selectedLanguage

  const handleLanguage = (e) => {
    setLanguage(e.target.value)
  }

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Link to='/'>Home</Link> | {' '}
          <Link to='/search'>Search</Link> | {' '}            
        </Box>

        <Box>
          <Box component="div" sx={{ display: 'inline', marginRight: 2 }}>
           <FormControl variant='standard' sx={{ border: 0}}>
              <Select value={language} onChange={handleLanguage} sx={{ border: 0}}>
                <MenuItem value={'en'}>English</MenuItem>
                <MenuItem value={'hu'}>Magyar</MenuItem>
              </Select>
            </FormControl> 
          </Box>
          

          <ToggleColorMode />
        </Box>

      </Box>
    </div>
  )
}

export default Nav