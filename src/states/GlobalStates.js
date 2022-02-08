import React, { useState } from "react";

export const GlobalStateContext = React.createContext()

const GlobalState = ({ children }) => {
  const [dataAPI, setDataAPI] = useState({})
  // const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('lang'))
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('lang') === null 
                                                  ? 'en' 
                                                  : localStorage.getItem('lang'))
  const [searchMedia, setSearchMedia] = useState('movie')
  // const [colorMode, setColorMode] = useState(localStorage.getItem('colorMode') === null 
  //                                   ? 'light' 
  //                                   : localStorage.getItem('colorMode'))

  return (
    <GlobalStateContext.Provider
      value={
        {
          // colorMode: [colorMode, setColorMode],
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