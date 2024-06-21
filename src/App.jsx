import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';

import './App.css';
import { darkTheme, lightTheme } from './Theme';
import Layout from './components/Layout';
import Show from './components/PodcastLayout';
import Season from './components/SeasonLayout';
import Episode from './components/EpisodeLayout';
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
