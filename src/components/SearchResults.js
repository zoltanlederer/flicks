import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Services from "../services/movieData";
import { GlobalStateContext } from '../states/GlobalStates'
import CardTrending from "./CardTrending";

import PaginationCustom from './PaginationCustom'

import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

const SearchResults = () => {
  const navigate = useNavigate()
  const state = useContext(GlobalStateContext)
  const [data, setData] = state.dataAPI
  const [mediaType, setMediaType] = state.searchMedia
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(Number(searchParams.get('page')) || 1)
  const [language, setLanguage] = useState(searchParams.get('language'))
  

  // Fetch data from Movie Database API
  useEffect( () => {
    navigate(`/search/media?type=${searchParams.get('type')}&query=${searchParams.get('query')}&page=${pageNumber}&language=${language}`)
    async function fetchData() {
      setIsLoading(true)
      await Services
      .get(`search/${searchParams.get('type')}`, `&type=${searchParams.get('type')}&query=${searchParams.get('query')}&page=${searchParams.get('page')}`, `&language=${searchParams.get('language')}`)
      .then(res => {
        setIsLoading(false)
        setData(res)
      })
    }
    fetchData();
       
  }, [searchParams, setData, mediaType, pageNumber, language, navigate])

  console.log('DATA', data)

  return (
    <div>
        { isLoading && <Container className="d-flex flex-column align-items-center"><Spinner animation="border"/></Container> }

        {Object.entries(data).length === 0 || data.results.length === 0 ? 
          <Alert variant="info" className="text-center"><h2>No Results</h2></Alert>
          :
          <div className="custom-trending-container">    
            <CardTrending data={data.results} mediaType={mediaType} />  
          </div>
        }        

        <div className="d-flex justify-content-center my-4">
          <PaginationCustom data={data} pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </div> 
    </div>
  )
}

export default SearchResults