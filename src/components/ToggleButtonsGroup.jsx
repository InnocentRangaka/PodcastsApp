import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import EventIcon from '@mui/icons-material/Event';
import DateRangeIcon from '@mui/icons-material/DateRange';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ToggleButtonsGroup = ({ sortBy, handleSortChange }) => {
  const handleClick = (event, newSortBy) => {
    handleSortChange(newSortBy);
  };

  return (
    <div className='toggle-buttons-group'>
      <span>Sort by:</span>
      <ToggleButtonGroup
        value={sortBy} // Use sortBy state directly from props
        exclusive
        aria-label="sort by"
        size="small"
        color="primary"
      >
        <ToggleButton 
          value="alphabetically" 
          aria-label="alphabetically"
          onChange={(event) => handleClick(event, 'alphabetically')}
        >
          <Tooltip title="Sort Alphabetically">
            {sortBy === 'alphabetically' ? <SortByAlphaIcon /> : <SortByAlphaIcon className='descending' />}
          </Tooltip>
        </ToggleButton>

        <ToggleButton 
          value="bySeasonsCount" 
          aria-label="bySeasonsCount"
          onChange={(event) => handleClick(event, 'bySeasonsCount')}
        >
          <Tooltip title="Sort by Seasons">
            {sortBy === 'bySeasonsCount' ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
          </Tooltip>
        </ToggleButton>

        <ToggleButton 
          value="latestRelease" 
          aria-label="latestRelease" 
          onChange={(event) => handleClick(event, 'latestRelease')}
        >
          <Tooltip title="Latest Release">
            {sortBy === 'latestRelease' ? <EventIcon /> : <DateRangeIcon />}
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default ToggleButtonsGroup;
