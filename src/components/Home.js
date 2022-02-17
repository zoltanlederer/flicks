import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom'
import Services from "../services/movieData";
import { GlobalStateContext } from '../states/GlobalStates'
import Search from "./Search";
import CardTrending from './CardTrending'
import PaginationCustom from './PaginationCustom'

import Container from "react-bootstrap/esm/Container";
import Spinner from 'react-bootstrap/Spinner'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

const Home = () =>{
  const navigate = useNavigate()
  const [urlParams, seturlParams] = useSearchParams()
  const {selectedLanguage, setSelectedLanguage} = useContext(GlobalStateContext)
  const [language, setLanguage] = selectedLanguage
  const [trending, setTrending] = useState({})
  const [timeframe, setTimeframe] = useState(urlParams.get('time') ||'week')
  const [trendingMediaType, setTrendingMediaType] = useState(urlParams.get('type') || 'movie')
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(Number(urlParams.get('page')) || 1)

  const selectTrendingMedia = [
    { name: 'Upcoming', value: 'upcoming' },
    { name: 'Movies', value: 'movie' },
    { name: 'TV Shows', value: 'tv' },
    // { name: 'People', value: 'person' },
    // { name: 'All', value: 'multi' },
  ];

  const selectTrendingTime = [
    { name: 'Week', value: 'week' },
    { name: 'Day', value: 'day' },
  ];

  console.log('trending', trending)
  console.log('PAGE', urlParams.get('page'))
  console.log('PAGENUMBER', pageNumber)

  // Fetch data from Movie Database API
  useEffect( () => {   
    navigate(`/trending?type=${trendingMediaType}&time=${timeframe}&page=${pageNumber}&language=${language}`)
    async function fetchData() {
      setIsLoading(true)
      if (trendingMediaType === 'upcoming' && urlParams.get('type') === 'upcoming') {
        await Services
        .get(`movie/${urlParams.get('type')}`, `&page=${urlParams.get('page')}`, `&language=${urlParams.get('language')}`)
        .then(res => {
          console.log(res.results)
          setIsLoading(false)
          setTrending(res)
        })
      } 
      else {
        await Services         
          .get(`trending/${urlParams.get('type')}/${urlParams.get('time')}`, `&page=${urlParams.get('page')}`, `&language=${urlParams.get('language')}`)
          .then(res => {
            console.log(res.results)
            setIsLoading(false)
            setTrending(res)
          })
      }
    }
    fetchData();
  }, [setTrending, trendingMediaType, timeframe, pageNumber, language, urlParams, navigate])

  const handleTimeframe = (e) => {
    setTimeframe(e.currentTarget.value)
  }

  const handleTrendingMediaType = (e) => {
    setTrendingMediaType(e.currentTarget.value)
  }

  return (
    <div>
      <Search />

      <h1>Trending</h1>

      <Container className="d-flex justify-content-between">

        <ButtonGroup size='sm'>
          {selectTrendingMedia.map((media, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-trending-${idx}`}
              type="radio"
              variant={'outline-success'}
              name="radio-trending"
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

      <div className="custom-trending-container">
        <CardTrending data={trending.results} />  
      </div>

      <div className="d-flex justify-content-center my-4">
        <PaginationCustom data={trending} pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </div>      
    </div>
  )
}

export default Home