import React, {useEffect, useContext} from 'react'
import { GlobalStateContext } from '../globalStates/GlobalStates'
import movieData from '../services/movieData'
import MovieListTemplate from './MovieListTemplate'

const MovieList = () => {
  const { searchResult } = useContext(GlobalStateContext)
  const [result, setResult] = searchResult

  useEffect(() => {
    movieData
      .get('movie/popular', '&page=2')
      .then(data => {
        console.log(data)
        setResult(prevData => data)
      })
  }, [setResult])

  console.log(result)

  if (!result) {
    return null
  }

  return (
    <>
      <MovieListTemplate data={result} />
    </>
  )
  
}

export default MovieList