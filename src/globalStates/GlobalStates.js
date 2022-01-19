import React, { useState } from "react";

export const GlobalStateContext = React.createContext()

const GlobalState = ({ children }) => {
  const [search, setSearch] = useState('star wars')
  const [searchResult, setSearchResult] = useState()

  return (
    <GlobalStateContext.Provider
      value={
        {
          search: [search, setSearch],
          searchResult: [searchResult, setSearchResult]
        }
      }
    >
      {children}
    </GlobalStateContext.Provider>
  )
}

export default GlobalState