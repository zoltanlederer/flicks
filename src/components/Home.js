import React, { useEffect, useContext, useState } from "react";
import Services from "../services/movieData";
import { GlobalStateContext } from '../states/GlobalStates'
import Search from "./Search";
import CardTrending from './CardTrending'

import '../styles/home.css'

import Container from "react-bootstrap/esm/Container";
import Spinner from 'react-bootstrap/Spinner'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

const Home = () =>{
  const {selectedLanguage, setSelectedLanguage} = useContext(GlobalStateContext)
  const [language, setLanguage] = selectedLanguage
  const [popular, setpopular] = useState([])
  const [timeframe, setTimeframe] = useState('week')
  const [trendingMediaType, setTrendingMediaType] = useState('movie')
  const [isLoading, setIsLoading] = useState(false);

  const selectPopularMedia = [
    { name: 'Movies', value: 'movie' },
    { name: 'TV Shows', value: 'tv' },
    { name: 'People', value: 'person' },
    { name: 'All', value: 'multi' },
  ];

  const selectTrendingTime = [
    { name: 'Week', value: 'week' },
    { name: 'Day', value: 'day' },
  ];

  // Fetch data from Movie Database API
  useEffect( () => {
    async function fetchData() {
      setIsLoading(true)
      await Services
      .get(`trending/${trendingMediaType}/${timeframe}`, ``, `&language=${language}`)
      .then(res => {
        setIsLoading(false)
        setpopular(res.results)
      })
    }
    fetchData();
    
  }, [setpopular, trendingMediaType, timeframe, language])

  const handleTimeframe = (e) => {
    // if (e.target.value === 'week') setTimeframe('week')
    // if (e.target.value === 'day') setTimeframe('day')
    setTimeframe(e.currentTarget.value)
  }

  const handleTrendingMediaType = (e) => {
    // console.log(e.target.value)
    // setMediaType(e.target.value)
    setTrendingMediaType(e.currentTarget.value)
  }


  return (
    <div>

      <Search />

      {/* <div>
        <select onChange={handleTrendingMediaType}>
          <option value='movie'>Movie</option>
          <option value='tv'>TV</option>
          <option value='person'>Person</option>
          <option value='multi'>All</option>
        </select>

        <select onChange={handleTimeframe}>
          <option value='week'>Week</option>
          <option value='day'>Day</option>
        </select>
      </div>     */}

      <h1>Trending</h1>

      <Container className="d-flex justify-content-between">

        <ButtonGroup size='sm'>
          {selectPopularMedia.map((media, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-popular-${idx}`}
              type="radio"
              variant={'outline-success'}
              name="radio-popular"
              value={media.value}
              checked={trendingMediaType === media.value}
              onChange={handleTrendingMediaType}
              className='shadow-none'
            >
              {media.name}
            </ToggleButton>
          ))}
        </ButtonGroup>

        <ButtonGroup size='sm' >
          {selectTrendingTime.map((time, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-timeframe-${idx}`}
              type="radio"
              variant={'outline-success'}
              name="radio-timeframe"
              value={time.value}
              checked={timeframe === time.value}
              onChange={handleTimeframe}
              className='shadow-none'
            >
              {time.name}
            </ToggleButton>
          ))}
        </ButtonGroup>

      </Container>

      <hr />
      
      { isLoading && <Container className="d-flex flex-column align-items-center"><Spinner animation="border"/></Container> }

      {/* <Container className="d-flex flex-column justify-content-center align-items-center align-self-center align-content-center text-center"> */}
        {/* <Container className="d-flex flex-wrap justify-content-between"> */}
        {/* <Container style={{display: 'flex', flexWrap: 'wrap'}}> */}

          <div className="custom-trending-container">
            <CardTrending popular={popular} mediaType={trendingMediaType} />  
          </div>
          


        {/* </Container> */}
      {/* </Container> */}
      
    </div>
  )
}

export default Home