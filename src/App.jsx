import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';

import './App.css';
import { darkTheme, lightTheme } from './Theme';
import Layout from './components/Layout';
import Show from './pages/Show';
import Season from './pages/Season';
import Episode from './pages/Episode';
import FavouriteList from './pages/Favourites';
import Home from './pages/Home';
// import Search from './pages/Search';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Podcast Routes */}
          <Route path="/show">
            <Route path=":name" element={<Show />} />
            <Route path=":name/season" >
              <Route path=":id" element={<Season />} />
              <Route path=":seasionId/episode/:id" element={<Episode />} />
            </Route>
            
          </Route>
          {/* <Route path="/search" element={<Search />} /> */}

          <Route path="/favorites" element={<FavouriteList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
