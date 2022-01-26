import React, { useState, useContext } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import { GlobalStateContext } from '../states/GlobalStates'

// https://api.themoviedb.org/3/search/multi?api_key=ba0c945c141b8fb9b78869c1c9811e6b&language=en&query=star
// https://api.themoviedb.org/3/search/movie?api_key=ba0c945c141b8fb9b78869c1c9811e6b&language=en-US&query=star
// https://api.themoviedb.org/3/search/tv?api_key=ba0c945c141b8fb9b78869c1c9811e6b&language=en-US&query=star

const Search = () => {
  const state = useContext(GlobalStateContext)
  const [language, setLanguage] = state.selectedLanguage  
  const [mediaType, setMediaType] = state.searchMedia
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

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
    setMediaType(e.target.value)
  }


  return (
    <div>
      Movie Search
      <select name='selectSearchType' onChange={handleMediaType} defaultValue={mediaType}>
        <option value='movie' >Movie</option>
        <option value='tv' >TV</option>
        <option value='person' >Person</option>
        <option value='multi' >Multi</option>
      </select>
      <form onSubmit={submitSearch}>
        <input value={search} onChange={handleSearch} />
        <button>Search</button>
      </form>
      <Outlet />
    </div>
  )
}

export default Search