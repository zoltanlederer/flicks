import React from 'react'
import './App.css'
import MovieList from './components/MovieList'
import Nav from './components/Nav'
import Search from './components/Search'
import GlobalState from './globalStates/GlobalStates'


function App() {
  return (
    <div>
      <GlobalState>
        <Nav />
        <Search />
        <MovieList />  
      </GlobalState>
    </div>
  );
}

export default App;
