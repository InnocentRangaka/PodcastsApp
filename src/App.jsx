import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// routes
import {
  Home,
  Signup,
  SinglePodcast,
  Login,
  Favourites,
  PageNotFound,
} from './pages';
import supabase from './supabase/client';
// redux
import { useSelector, useDispatch } from 'react-redux';
import {
  setAllPodcasts,
  setIsLoading,
  setHomePageDisplayedPodcasts,
  setUserDataFromDB,
  setHasAccount,
  setFavourites,
} from './globalState/reducers/podcastsReducer';

import Layout from './components/Layout';
import Show from './components/PodcastLayout';
import Season from './components/SeasonLayout';
import Episode from './components/EpisodeLayout';

function App() {
  const { favourites, favouriteSwitch } = useSelector(
    (state) => state.podcastsReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    const getPodcasts = async () => {
      const response = await fetch('https://podcast-api.netlify.app/shows');
      const result = await response.json();

      if (result) {
        dispatch(setHomePageDisplayedPodcasts(result));
        dispatch(setAllPodcasts(result));

        dispatch(setIsLoading(false));
      } else {
        console.log('error');
      }
      return result;
    };
    getPodcasts();
  }, [dispatch]);

  const fetchLoginData = async () => {
    const { data, error } = await supabase.from('user_login_data').select();
    if (error) {
      console.log(error);
    }
    if (data.length !== 0) {
      dispatch(setUserDataFromDB(data));
      dispatch(setHasAccount(true));
    }
  };
  useEffect(() => {
    fetchLoginData();
  }, [dispatch]);

  const fetchFavouritesFromDB = async () => {
    const { data, error } = await supabase.from('userFavourites').select();
    if (data) {
      dispatch(setFavourites(data));
    }
  };
  useEffect(() => {
    fetchFavouritesFromDB();
  }, [favouriteSwitch, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/podcast/:id" element={<SinglePodcast />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="*" element={<PageNotFound />} />

          {/* Podcast Routes */}
          <Route path="/show/:name" element={<Show />} />
          <Route path="/show/:name/season/:id" element={<Season />} />
          <Route path="/show/:name/season/:seasonId/episode/:id" element={<Episode />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
