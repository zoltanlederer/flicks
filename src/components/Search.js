import React, { useState, useContext } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import { GlobalStateContext } from '../states/GlobalStates'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


// https://api.themoviedb.org/3/search/multi?api_key=ba0c945c141b8fb9b78869c1c9811e6b&language=en&query=star
// https://api.themoviedb.org/3/search/movie?api_key=ba0c945c141b8fb9b78869c1c9811e6b&language=en-US&query=star
// https://api.themoviedb.org/3/search/tv?api_key=ba0c945c141b8fb9b78869c1c9811e6b&language=en-US&query=star

const Search = () => {
  const state = useContext(GlobalStateContext)
  const [language, setLanguage] = state.selectedLanguage  
  const [mediaType, setMediaType] = state.searchMedia
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const selectMedia = [
    { name: 'Movies', value: 'movie' },
    { name: 'TV Shows', value: 'tv' },
    { name: 'People', value: 'person' },
    { name: 'All', value: 'multi' },
  ];

  const handleSearch = (e) => {
    const name = e.target.value
    setSearch(name)
  }

  const submitSearch = (e) => {
    e.preventDefault()
    console.log(search)
    // const query = search.replace(/\s/g, '-')
    navigate(`/search/${mediaType}?query=${search.toLowerCase()}&language=${language}`)
  }

  const handleMediaType = (e) => {
    setMediaType(e.currentTarget.value)
  }

  return (
    <>
    <Container className='my-5'>
      <Row className='justify-content-center'>
        <Col lg={8}>
          <ButtonGroup size='sm'>
            {selectMedia.map((media, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-media-${idx}`}
                type="radio"
                variant={'outline-success'}
                name="radio-media"
                value={media.value}
                checked={mediaType === media.value}
                // onChange={(e) => setRadioValue(e.currentTarget.value)}
                onChange={handleMediaType}
              >
                {media.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col>
      </Row>

      <Row className='justify-content-center'>
        <Col lg={8}>
          <Form onSubmit={submitSearch}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search for a movie, tv show, person....."
                aria-label="Search for a movie, tv show, person....."
                value={search} onChange={handleSearch}
              />
              <Button variant="secondary" type="submit">
                Search
              </Button>
            </InputGroup>
          </Form>
        </Col>
        {/* Movie Search */}
        {/* <select name='selectSearchType' onChange={handleMediaType} defaultValue={mediaType}>
          <option value='movie' >Movie</option>
          <option value='tv' >TV</option>
          <option value='person' >Person</option>
          <option value='multi' >Multi</option>
        </select> */}
    
        {/* <form onSubmit={submitSearch}>
          <input value={search} onChange={handleSearch} />
          <button>Search</button>
        </form> */}
    
        
      </Row>
    </Container>
    <Outlet />
    </>
  )
}

export default Search