import React, { useState, useEffect, useCallback  } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchPodcasts } from '../../api';
import { handleSortChange } from '../utils/podcastUtils';
import ToggleButtonsGroup from '../components/Includes/ToggleButtonsGroup';
import ToggleViewLayout from '../components/Includes/ToggleViewLayout'

import GridPodcasts from '../components/Podcast/GridPodcasts';
import HomeDefaultView from '../components/Home/HomeListView';

export default function Home() {
  const location = useLocation();
  const [podcasts, setPodcasts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortedPodcasts, setSortedPodcasts] = useState([]);
  const [sortBy, setSortBy] = useState(null); // Default sort

  const [isGridView, setIsGridView] = useState(true);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  // handleSortChange = (type, podcasts,setSortedPodcasts, setSortBy)

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

        const type = sortBy == null ? "alphabetically" : sortBy;

        const sorted = sortedPodcasts ? handleSortChange(type, data, setSortedPodcasts, setSortBy) : data;

        const savedView = localStorage.getItem('viewMode');
        
        if (savedView) {
          setIsGridView(savedView === 'grid');
        }

        setPodcasts(sorted);
        setSortBy(type)
      } catch (fetchError) {
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [handleSortChange]);

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
    setIsGridView(prev => !prev);
    handleSortChange(sortBy, podcasts, setSortedPodcasts, setSortBy) // Toggle between true (gridView) and false (listView)
  }, []);

  // Function to handle podcast selection
  const handlePodcastSelect = useCallback((podcast) => {
    setSelectedPodcast(podcast);
  }, []);
  
  return (
    <>
      {loading || !podcasts ? (
        <h2>Loading...</h2>
      ) : (
        <>
        <div className='sort-view-container'>
          <ToggleButtonsGroup sortBy={sortBy} handleSortChange={handleSortChange} podcastsObject={podcasts} setSortedPodcasts={setSortedPodcasts} setSortBy={setSortBy} />
          <ToggleViewLayout isGridView={isGridView} setIsGridView={setIsGridView} sortBy={sortBy} />
        </div>

          {/* <GenreList /> */}
          
          {isGridView && sortBy ? 
            <GridPodcasts title="Podcasts" podcastsObject={podcasts} sortBy={sortBy} setSortedPodcasts={setSortedPodcasts} setSortBy={setSortBy} /> 
          : 
            (isGridView && sortBy ? 
              <HomeDefaultView podcastsObject={podcasts} sortBy={sortBy} setSortedPodcasts={setSortedPodcasts} setSortBy={setSortBy} /> 
            : 
              ''
            ) 
          }
        </>
      )}
    </>
  );
}
