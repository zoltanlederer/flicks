import React, { useEffect, useContext, useState } from "react";
import Services from "../services/movieData";
import { GlobalStateContext } from '../states/GlobalStates'
import Search from "./Search";
import CardTrending from './CardTrending'
import PaginationCustom from './PaginationCustom'

import Container from "react-bootstrap/esm/Container";
import Spinner from 'react-bootstrap/Spinner'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Pagination from 'react-bootstrap/Pagination'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

const Home = () =>{
  const {selectedLanguage, setSelectedLanguage} = useContext(GlobalStateContext)
  const [language, setLanguage] = selectedLanguage
  const [popular, setpopular] = useState({})
  const [timeframe, setTimeframe] = useState('week')
  const [trendingMediaType, setTrendingMediaType] = useState('movie')
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1)

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
      .get(`trending/${trendingMediaType}/${timeframe}`, `&page=${pageNumber}`, `&language=${language}`)
      .then(res => {
        console.log(res.results)
        setIsLoading(false)
        setpopular(res)
      })
    }
    fetchData();
    
  }, [setpopular, trendingMediaType, timeframe, pageNumber, language])

  const handleTimeframe = (e) => {
    setTimeframe(e.currentTarget.value)
  }

  const handleTrendingMediaType = (e) => {
    setTrendingMediaType(e.currentTarget.value)
  }

  // const handlePagination = (e) => {
  //   console.log(pageNumber)
  //   console.log(Number(e.target.textContent))
  //   setPageNumber(Number(e.target.textContent))
  // }

  console.log(popular.results)

  // let active = 2;
  // const PaginationCustom = () => {
  //   let pages = [];
  //   for (let number = pageNumber; number <= pageNumber + 5; number++) {
  //     pages.push(
  //       // <Pagination.Item key={number} active={number === pageNumber} onClick={handlePagination}>
  //       <Pagination.Item key={number} onClick={e => setPageNumber(Number(e.target.textContent))}>
  //         {number}
  //       </Pagination.Item>
  //     );
  //   }

  //   return (
  //     <Pagination>        
  //       { pageNumber === 1 ? '' :
  //         <>
  //           <Pagination.First onClick={() => setPageNumber(1)} />
  //           <Pagination.Prev onClick={() => setPageNumber(pageNumber - 1)} />
  //         </>
  //        }
  //         {pages}
  //         {/* <Pagination.Item key={pageNumber} active={pageNumber} onClick={handlePagination}>
  //           {pageNumber}
  //         </Pagination.Item> */}
  //       { pageNumber === popular.total_pages - 5 ? '' :
  //         <>
  //           <Pagination.Next onClick={() => setPageNumber(pageNumber + 1)} />
  //           <Pagination.Last onClick={() => setPageNumber(popular.total_pages - 5)}/>
  //         </>
  //       }
  //     </Pagination>
  // )}  
  
  // const PaginationBasic = (
  //   <div>
  //     <Pagination>{pages}</Pagination>
  //   </div>
  // );


  return (
    <div>
      <Search />

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

      <div className="custom-trending-container">
        <CardTrending popular={popular.results} mediaType={trendingMediaType} />  
      </div>

      {/* <Pagination>{pages}</Pagination> */}
      <div className="d-flex justify-content-center my-4">
        <PaginationCustom popular={popular} pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </div>      
    </div>
  )
}

export default Home