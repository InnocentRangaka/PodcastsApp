import React, { useEffect, useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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
    <div className='view-buttons-group'>
      <span>view by:</span>
      <ToggleButtonGroup
        value={isGridView} // Use sortBy state directly from props
        exclusive
        onChange={toggleView} // Directly pass the handleSortChange function
        aria-label="view by"
        size="small"
        color="primary"
      >

        <ToggleButton 
          value="alphabetically" 
          aria-label="alphabetically" 
        >
          <Tooltip title={isGridView ? "Switch to List View" : "Switch to Grid View"}>
            {isGridView ? <ViewModuleIcon /> : <ViewListIcon />}
          </Tooltip>
          
        </ToggleButton>

      </ToggleButtonGroup>
    </div>
  );
};

export default React.memo(ToggleViewLayout);
