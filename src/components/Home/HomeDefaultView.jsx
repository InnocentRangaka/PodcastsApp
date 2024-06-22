import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchPodcasts } from '../../../api';
import { getPopularPodcasts, 
  getNewPodcasts, getRecommendedPodcastsByDate,
  sortAlphabetically, sortAlphabeticallyReversed,
  sortByDate, sortByLatestRelease
 } from '../../utils/podcastUtils';
 import GenreList from '../Genre/Genres';

import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import { IconButton } from '@mui/material';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import EventIcon from '@mui/icons-material/Event';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import ToggleButtonsGroup from '../Includes/ToggleButtonsGroup';

export default function HomeDefaultView() {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const [podcasts, setPodcasts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortedPodcasts, setSortedPodcasts] = useState([]);
  const [sortBy, setSortBy] = useState('alphabetically'); // Default sort

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPodcasts();

        if (data.length === 0) {
          throw {
            message: 'No available Podcasts yet',
            statusText: 'No Podcasts',
            status: 'Podcasts error!',
          };
        }

        setPodcasts(data);
      } catch (fetchError) {
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  const handleSortChange = (type) => {
    switch (type) {
      case 'alphabetically':
        setSortedPodcasts(sortBy === 'alphabetically' ? [...podcasts].reverse() : sortAlphabetically([...podcasts]));
        setSortBy(sortBy === 'alphabetically' ? 'reverseAlphabetically' : 'alphabetically');
        break;
      case 'reverseAlphabetically':
        setSortedPodcasts(sortBy === 'reverseAlphabetically' ? [...podcasts].reverse() : sortAlphabeticallyReversed([...podcasts]));
        setSortBy(sortBy === 'reverseAlphabetically' ? 'alphabetically' : 'reverseAlphabetically');
        break;
      case 'byDate':
        setSortedPodcasts(sortBy === 'byDate' ? [...podcasts].reverse() : sortByDate([...podcasts]));
        setSortBy(sortBy === 'byDate' ? 'byDate' : 'byDate');
        break;
      case 'latestRelease':
        setSortedPodcasts(sortBy === 'latestRelease' ? [...podcasts].reverse() : sortByLatestRelease([...podcasts]));
        setSortBy(sortBy === 'latestRelease' ? 'latestRelease' : 'latestRelease');
        break;
      default:
        break;
    }
  };

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <ToggleButtonsGroup />
          <ToggleViewLayout podcasts={podcasts} />
          {/* <GenreList /> */}
          {getPopularPodcasts({ podcasts })}
          {getNewPodcasts({ podcasts })}
          {getRecommendedPodcastsByDate({ podcasts })}
        </>
      )}
    </>
  );
}
