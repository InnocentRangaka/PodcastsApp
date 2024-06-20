import React, { useEffect, useCallback } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

const ToggleViewLayout = ({ isGridView, setIsGridView }) => {
  // Load initial view state from localStorage on component mount
  useEffect(() => {
    const savedView = localStorage.getItem('viewMode');
    if (savedView) {
      setIsGridView(savedView === 'grid');
    }
  }, [setIsGridView]);

  // Save view state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('viewMode', isGridView ? 'grid' : 'list');
  }, [isGridView]);

  // Define toggleView function with useCallback
  const toggleView = useCallback(() => {
    setIsGridView(prev => !prev); // Toggle between true (gridView) and false (listView)
  }, [setIsGridView]);

  return (
    <Tooltip title={isGridView ? "Switch to List View" : "Switch to Grid View"}>
      <IconButton onClick={toggleView}>
        {isGridView ? <ViewModuleIcon /> : <ViewListIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default React.memo(ToggleViewLayout);
