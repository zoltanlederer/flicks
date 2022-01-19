import React, { useContext } from "react";
import { GlobalStateContext } from '../globalStates/GlobalStates'

const SearchTemplate = ({ submitSearch }) => {
  const { search } = useContext(GlobalStateContext)
  const [searchValue, setSearchValue] = search

  const handlSearchValue = (e) => {
    console.log(e.target.value)
    setSearchValue(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    submitSearch()
  }

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input value={searchValue} onChange={handlSearchValue} />
        <button>Search</button>
      </form>
    </div>
  )
}

export default SearchTemplate