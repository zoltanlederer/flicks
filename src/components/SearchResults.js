import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import Services from "../services/movieData";
import Filters from './Filters'
import { GlobalStateContext } from '../states/GlobalStates'
import CardTrending from './CardTrending'

import PaginationCustom from './PaginationCustom'

import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'

const SearchResults = () => {
  const state = useContext(GlobalStateContext)
  const [data, setData] = state.dataAPI
  const [mediaType, setMediaType] = state.searchMedia
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1)

  // Fetch data from Movie Database API
  useEffect( () => {
    async function fetchData() {
      setIsLoading(true)
      await Services
      .get(`search/${mediaType}`, `&query=${searchParams.get('query')}&page=${pageNumber}`, `&language=${searchParams.get('language')}`)
      .then(res => {
        setIsLoading(false)
        setData(res)
      })
    }
    fetchData();
       
  }, [searchParams, setData, mediaType, pageNumber])


  // const content = () => {
  
  //   return (
      
  //   )
  // }
  

  return (
    <div>
      Movie Result:
        <Filters />
        { isLoading && <Container className="d-flex flex-column align-items-center"><Spinner animation="border"/></Container> }

        {/* <Container className='d-flex flex-wrap justify-content-between'> */}
        <div className="custom-trending-container">    
          <CardTrending popular={data.results} mediaType={mediaType} />  
        </div>
        {/* {
          data.map(item => (
            <li key={item.id}>
              {mediaType === 'person' ? item.name 
              : mediaType === 'tv' ? item.name
              : mediaType === 'movie' ? item.title
              : mediaType === 'multi' && item.media_type === 'tv' ? item.name 
              : mediaType === 'multi' && item.media_type === 'movie' ? item.title
              : mediaType === 'multi' && item.media_type === 'person' ? item.name : ''
              }
            </li>
          ))
        } */}
      {/* </Container> */}
      <div className="d-flex justify-content-center my-4">
        <PaginationCustom popular={data} pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </div> 
    </div>
  )
}

export default SearchResults