import React, { useState, useEffect, useCallback  } from 'react';
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

import GridPodcasts from '../components/GridPodcasts';
import ListPodcasts from '../components/ListPodcasts';

export default function Home() {
  const location = useLocation();
  const [podcasts, setPodcasts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortedPodcasts, setSortedPodcasts] = useState([]);
  const [sortBy, setSortBy] = useState('alphabetically'); // Default sort

  const [isGridView, setIsGridView] = useState(true);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

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

        const savedView = localStorage.getItem('viewMode');
        if (savedView) {
          setIsGridView(savedView === 'grid');
        }

        setPodcasts(sorted);
      } catch (fetchError) {
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  // Load initial view state from localStorage on component mount
  useEffect(() => {
    const savedView = localStorage.getItem('viewMode');
    if (savedView) {
      setIsGridView(savedView === 'grid');
    }
  }, []);

  // Save view state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('viewMode', isGridView ? 'grid' : 'list');
  }, [isGridView]);

  // Define toggleView function with useCallback
  const toggleView = useCallback(() => {
    setIsGridView(prev => !prev); // Toggle between true (gridView) and false (listView)
  }, []);

  // Function to handle podcast selection
  const handlePodcastSelect = useCallback((podcast) => {
    setSelectedPodcast(podcast);
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
        <div className='sort-view-container'>
          <ToggleButtonsGroup sortBy={sortBy} handleSortChange={handleSortChange} />
          <ToggleViewLayout isGridView={isGridView} setIsGridView={setIsGridView} />
        </div>

          {/* <GenreList /> */}
          {isGridView ? <GridPodcasts title="Podcasts" podcastsObject={podcasts} /> 
          : 
            <>
              {/* <ListPodcasts title="Podcasts" podcastsObject={[podcasts]} /> */}
              {getPopularPodcasts({ podcasts })}
              {getNewPodcasts({ podcasts })}
              {getRecommendedPodcastsByDate({ podcasts })}
            </>
          }
        </>
      )}
    </>
  );
}
