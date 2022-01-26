import React, { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import Services from "../services/movieData";
import Filters from './Filters'
import { GlobalStateContext } from '../states/GlobalStates'


const SearchResults = () => {
  const state = useContext(GlobalStateContext)
  // const {dataAPI, setDataAPI} = useContext(GlobalStateContext)
  const [data, setData] = state.dataAPI
  const [mediaType, setMediaType] = state.searchMedia
  const [searchParams, setSearchParams] = useSearchParams()

  console.log(mediaType)
  console.log(data)

  // Fetch data from Movie Database API
  useEffect(() => {
      Services
        .get(`search/${mediaType}`, `&query=${searchParams.get('query')}`, `&language=${searchParams.get('language')}`)
        .then(res => setData(res.results))
  }, [searchParams, setData, mediaType])


  const content = () => {
    // const data = []    
  
    return (
      <div>
        {
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
        }
      </div>
    )
  }
  

  return (
    <div>
      Movie Result:
      <ul>
        <Filters />
      {/* {
        data.map(datas => (
          <li key={datas.id}>
            {datas.title} <br/>
          </li>
        ))
      } */}
      {content()}
      </ul>
    </div>
  )
}

export default SearchResults