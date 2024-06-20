import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchPodcasts } from '../../api';
import { getPopularPodcasts, 
  getNewPodcasts, getRecommendedPodcastsByDate,
  sortAlphabetically, sortAlphabeticallyReversed,
  sortByDate, sortByLatestRelease
 } from '../utils/podcastUtils';
 import GenreList from '../components/Genres';
import ToggleButtonsGroup from '../components/ToggleButtonsGroup';
import ToggleViewLayout from '../components/ToggleViewLayout'

export default function Home() {
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

        const sorted = sortedPodcasts ? sortAlphabetically([...data]) : data;

        setPodcasts(sorted);
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
          <ToggleViewLayout podcasts={ podcasts} />
          {/* <GenreList /> */}
          {/* {getPopularPodcasts({ podcasts })}
          {getNewPodcasts({ podcasts })}
          {getRecommendedPodcastsByDate({ podcasts })} */}
        </>
      )}
    </>
  );
}
