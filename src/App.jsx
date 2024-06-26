import { createContext, useContext, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import { darkTheme, lightTheme } from './Theme';
import Layout from './components/Layout';

const Show = lazy(() => import('./pages/Show'));
const Season = lazy(() => import('./pages/Season'));
const Episode = lazy(() => import('./pages/Episode'));
const FavouriteList = lazy(() => import('./pages/Favourites'));
const Home = lazy(() => import('./pages/Home'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));


function App() {

  return (
    
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
              
              <Route path="show/:name">
                <Route index element={<Suspense fallback={<div>Loading...</div>}><Show /></Suspense>} />
                <Route path="season/:id">
                  <Route index element={<Suspense fallback={<div>Loading...</div>}><Season /></Suspense>} />
                  {/* <Route path="episode/:episodeId" element={<Suspense fallback={<div>Loading...</div>}><Episode /></Suspense>} /> */}
                </Route>
              </Route>

              <Route path="favorites" element={<Suspense fallback={<div>Loading...</div>}><FavouriteList /></Suspense>} />

              {/* <Route path="*" element={<PageNotFound />} /> */}
            </Route>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
