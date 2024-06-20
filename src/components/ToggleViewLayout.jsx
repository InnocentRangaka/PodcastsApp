import React, { useState, useEffect } from 'react';
import ListPodcasts from './ListPodcasts';
import { IconButton } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

const ToggleViewLayout = ({ podcasts }) => {
  const [isGridView, setIsGridView] = useState(true);

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

  const toggleView = () => {
    setIsGridView(prev => !prev); // Toggle between true (gridView) and false (listView)
  };

  return (
    <div>
      <IconButton onClick={toggleView}>
        {isGridView ? <ViewListIcon /> : <ViewModuleIcon />}
      </IconButton>

      <div className={isGridView ? 'grid-container' : 'list-container'}>
        {podcasts.map(podcast => (
          <div key={podcast.id} className={isGridView ? 'grid-item' : 'list-item'}>
            <ListPodcasts title="Podcasts" podcastsObject={[podcast]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToggleViewLayout;
