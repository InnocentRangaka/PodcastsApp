import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SortByAlphaOutlinedIcon from '@mui/icons-material/SortByAlphaOutlined';

const SortLayout = () => {
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc'); // Default ascending

  const handleSortChange = (criteria) => {
    if (sortBy === criteria) {
      // Toggle sort direction if same criteria is clicked again
      setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to ascending order when changing criteria
      setSortBy(criteria);
      setSortDirection('asc');
    }
    // onSortChange(criteria, sortDirection);
  };

  return (
    <div>
      <span>Sort by</span>
      <IconButton onClick={handleSortChange('alphabetically')}>
          {sortBy === 'alphabetically' && sortDirection === 'asc' ? <SortByAlphaIcon /> : <SortByAlphaOutlinedIcon />}
      </IconButton>
      <button onClick={() => handleSortChange('alphabetically')}>
        {sortBy === 'alphabetically' && sortDirection === 'asc' ? 'A-Z' : 'Z-A'}
      </button>
      <button onClick={() => handleSortChange('byDate')}>
        {sortBy === 'byDate' && sortDirection === 'asc' ? 'By Date ↑' : 'By Date ↓'}
      </button>
      <button onClick={() => handleSortChange('latestRelease')}>
        {sortBy === 'latestRelease' && sortDirection === 'asc' ? 'Latest Release ↑' : 'Latest Release ↓'}
      </button>
    </div>
  );
};

export default SortLayout;