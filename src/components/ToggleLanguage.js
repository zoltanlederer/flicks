import React, { useContext } from 'react'
import { GlobalStateContext } from '../states/GlobalStates'

import '../styles/toggleLanguage.css'

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'


const ToggleLanguage = () => {
  const {selectedLanguage, setSelectedLanguage} = useContext(GlobalStateContext)
  const [language, setLanguage] = selectedLanguage

  const handleLanguage = (e) => {
    const lang = localStorage.getItem('lang')
    if (lang === null) {
      localStorage.setItem('lang', 'hu' )
      setLanguage(localStorage.getItem('lang'))
    }
    
    if (lang !== null) {
      localStorage.setItem('lang', e.target.value )
      setLanguage(localStorage.getItem('lang'))
    }
  }

  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text style={{ backgroundColor: '#20232a', color: '#8c8e92', border: '0', paddingRight: '1'}}><i className="bi bi-globe"></i></InputGroup.Text>
        <Form.Select className='pb-0 border-0 text-start shadow-none custom-select' value={language} onChange={handleLanguage} >
          <option value={'en'}>English</option>
          <option value={'hu'}>Magyar</option>
        </Form.Select>
      </InputGroup>
    </>
  )
}

export default ToggleLanguage