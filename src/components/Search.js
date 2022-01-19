import React, {useContext} from "react";
import SearchTemplate from "./SearchTemplate";
import { GlobalStateContext } from '../globalStates/GlobalStates'
import movieData from "../services/movieData";

const Search = () => {
  const { search, searchResult } = useContext(GlobalStateContext)
  const [searchValue, setSearchValue] = search
  const [result, setResult] = searchResult
  
  console.log(searchValue)

  const newSearch = () => {
    console.log(searchValue)
    movieData.get('search/movie', `&query=${searchValue}`)
      .then(res => {
        console.log(res)
        setResult(res)
      })

  }

  return (
    <div>
        <SearchTemplate submitSearch={newSearch} />      
    </div>
    
  )
}

export default Search