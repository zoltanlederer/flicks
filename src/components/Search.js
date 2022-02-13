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
    // { name: 'All', value: 'multi' },
  ];

  const handleSearch = (e) => {
    const name = e.target.value
    setSearch(name)
  }

  const submitSearch = (e) => {
    e.preventDefault()
    navigate(`/search/media?type=${mediaType}&query=${search.toLowerCase()}&language=${language}`)
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
                onChange={handleMediaType}
                className='shadow-none'
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
                className="shadow-none"
              />
              <Button variant="secondary" type="submit">
                Search
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
    <Outlet />
    </>
  )
}

export default Search