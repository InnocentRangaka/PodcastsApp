import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';

import './App.css';
import { darkTheme, lightTheme } from './Theme';
import Layout from './components/Layout';
import Show from './components/PodcastLayout';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Podcast Routes */}
          <Route path="show" element={<Show />}>
            {/* <Route index element={<Home />} /> */}
            <Route path=":name" element={<Show />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
