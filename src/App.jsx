import { createContext, useContext, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import { darkTheme, lightTheme } from './Theme';
import Layout from './components/Layout';
import { PodcastsProvider } from './components/PodcastsContext';

const Show = lazy(() => import('./pages/Show'));
const Season = lazy(() => import('./pages/Season'));
const Episode = lazy(() => import('./pages/Episode'));
const FavouriteList = lazy(() => import('./pages/Favourites'));
const Home = lazy(() => import('./pages/Home'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));


function App() {

  return (
    <PodcastsProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
              
              <Route path="show/:name">
                <Route index element={<Suspense fallback={<div>Loading...</div>}><Show /></Suspense>} />
                <Route path=":name/season">
                  <Route path=":id" element={<Suspense fallback={<div>Loading...</div>}><Season /></Suspense>} />
                  <Route path=":id/episode/:episodeId" element={<Suspense fallback={<div>Loading...</div>}><Episode /></Suspense>} />
                </Route>
              </Route>

              <Route path="favorites" element={<Suspense fallback={<div>Loading...</div>}><FavouriteList /></Suspense>} />

              <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </PodcastsProvider>
  );
}

export default App;
