import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Search from './components/Search'
import SearchResults from './components/SearchResults'
import Home from './components/Home'
import GlobalState from './states/GlobalStates'
import DetailedPage from './components/DetailedPage';

ReactDOM.render(
  <GlobalState>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />

        <Route path='/trending' element={<Home />}>
          <Route path=':page' element={<Home />} />
        </Route>

        <Route path='/details' element={<DetailedPage />} />

        <Route path='search' element={<Search />}>
          <Route path=':searchQuery' element={<SearchResults />} />
        </Route>

        <Route path='*' element={<div>There's nothing here!</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
  </GlobalState>,
  document.getElementById('root')
);

