import React, { useEffect, useContext, useState } from "react";
import Services from "../services/movieData";
import { GlobalStateContext } from '../states/GlobalStates'
import Search from "./Search";
import CardPopular from './CardPopular'
import Container from '@mui/material/Container'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';

const Home = () =>{
  const {selectedLanguage, setSelectedLanguage} = useContext(GlobalStateContext)
  const [language, setLanguage] = selectedLanguage
  const [popular, setpopular] = useState([])
  const [timeframe, setTimeframe] = useState('week')
  const [mediaType, setMediaType] = useState('movie')

  // Fetch data from Movie Database API
  useEffect(() => {
    Services
      .get(`trending/${mediaType}/${timeframe}`, ``, `&language=${language}`)
      .then(res => setpopular(res.results))
}, [setpopular, mediaType, timeframe, language])

const handleTimeframe = (e) => {
  if (e.target.value === 'week') setTimeframe('week')
  if (e.target.value === 'day') setTimeframe('day')
}

const handleMediaType = (e) => {
  // console.log(e.target.value)
  setMediaType(e.target.value)
}

return (
  <Container>
    <h1>Home</h1>
    <Search />
    <div>
      <select onChange={handleMediaType}>
        <option value='movie'>Movie</option>
        <option value='tv'>TV</option>
        <option value='person'>Person</option>
        <option value='multi'>All</option>
      </select>

      <select onChange={handleTimeframe}>
        <option value='week'>Week</option>
        <option value='day'>Day</option>
      </select>
    </div>
    

    <h1>Popular</h1>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <FormControl onChange={handleMediaType}>
        {/* <FormLabel id="popular-radio-buttons-group-label">Popular</FormLabel> */}
        <RadioGroup
          row
          aria-labelledby="popular-radio-buttons-group-label"
          defaultValue="movie"
          name="popular-radio-buttons-group"
        >
          <FormControlLabel value="movie" control={<Radio />} label="Movie" />
          <FormControlLabel value="tv" control={<Radio />} label="TV" />
          <FormControlLabel value="person" control={<Radio />} label="Person" />
          <FormControlLabel value="multi" control={<Radio />} label="All" />
        </RadioGroup>
      </FormControl>

      <FormControl onChange={handleTimeframe}>
        {/* <FormLabel id="popular-radio-buttons-group-label">&nbsp;</FormLabel> */}
        <RadioGroup
          row
          aria-labelledby="popularTimeFrame-radio-buttons-group-label"
          defaultValue="week"
          name="popularTimeFrame-radio-buttons-group"
        >
          <FormControlLabel value="week" control={<Radio />} label="Week" />
          <FormControlLabel value="day" control={<Radio />} label="Day" />
        </RadioGroup>
      </FormControl>
    </Box>



    <CardPopular popular={popular} mediaType={mediaType} />
  </Container>
  )
}

export default Home