import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';

import './App.css';
import { darkTheme, lightTheme } from './Theme';
import Layout from './components/Layout';
import Podcast from './components/PodcastLayout';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="show" element={<Podcast />}>
            {/* <Route index element={<Home />} /> */}
            <Route path=":name" element={<Podcast />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
