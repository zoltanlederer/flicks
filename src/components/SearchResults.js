import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import Services from "../services/movieData";
import Filters from './Filters'
import { GlobalStateContext } from '../states/GlobalStates'
import CardTrending from './CardTrending'

import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'

const SearchResults = () => {
  const state = useContext(GlobalStateContext)
  const [data, setData] = state.dataAPI
  const [mediaType, setMediaType] = state.searchMedia
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data from Movie Database API
  useEffect( () => {
    async function fetchData() {
      setIsLoading(true)
      await Services
      .get(`search/${mediaType}`, `&query=${searchParams.get('query')}`, `&language=${searchParams.get('language')}`)
      .then(res => {
        setIsLoading(false)
        setData(res.results)
      })
    }
    fetchData();
       
  }, [searchParams, setData, mediaType])


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
          <CardTrending popular={data} mediaType={mediaType} />  
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
    </div>
  )
}

export default SearchResults