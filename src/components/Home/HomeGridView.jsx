// Home.jsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchPodcasts, getGenres } from '../../../api';
import {
  sortAlphabetically,
  sortAlphabeticallyReversed,
  sortByDate,
  sortByLatestRelease,
} from '../../utils/podcastUtils';
import SortLayout from '../Includes/SortLayout'; // Import the SortLayout
import ToggleViewLayout from '../Includes/ToggleViewLayout';

export default function HomeGridView() {
  const [podcasts, setPodcasts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortedPodcasts, setSortedPodcasts] = useState([]);
  const [sortBy, setSortBy] = useState('alphabetically'); // Default sort
  const [sortDirection, setSortDirection] = useState('asc'); // Default ascending

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
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
        setSortedPodcasts(sortAlphabetically(data)); // Default sorting
      } catch (fetchError) {
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSortChange = (criteria, direction) => {
    switch (criteria) {
      case 'alphabetically':
        setSortedPodcasts(direction === 'asc' ? sortAlphabetically(podcasts) : sortAlphabeticallyReversed(podcasts));
        break;
      case 'byDate':
        setSortedPodcasts(direction === 'asc' ? sortByDate(podcasts) : sortByLatestRelease(podcasts));
        break;
      case 'latestRelease':
        setSortedPodcasts(direction === 'asc' ? sortByLatestRelease(podcasts) : sortByDate(podcasts));
        break;
      default:
        break;
    }
    setSortBy(criteria);
    setSortDirection(direction);
  };

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <SortLayout onSortChange={handleSortChange} />
          <ToggleViewLayout podcasts={sortedPodcasts} />

          {/* Display sorted podcasts */}
          {sortedPodcasts.map(podcast => (
            <>
              <div key={podcast.id}>
                <h2>{podcast.title}</h2>
                <p>Duration: {podcast.duration} seconds</p>
                {/* Add more details as needed */}
              </div>
              <GenreList genres={podcast.genres} />
            </>
          ))}
        </>
      )}
    </>
  );
}
