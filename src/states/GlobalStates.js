import React, { useState } from "react";

export const GlobalStateContext = React.createContext()

const GlobalState = ({ children }) => {
  const [dataAPI, setDataAPI] = useState({})
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('lang') === null 
                                                  ? 'en' 
                                                  : localStorage.getItem('lang'))
  const [searchMedia, setSearchMedia] = useState('movie')

  return (
    <GlobalStateContext.Provider
      value={
        {
          dataAPI: [dataAPI, setDataAPI],
          selectedLanguage: [selectedLanguage, setSelectedLanguage],
          searchMedia: [searchMedia, setSearchMedia]
        }
      }
    >
      {children}
    </GlobalStateContext.Provider>
  )
}

export default GlobalState