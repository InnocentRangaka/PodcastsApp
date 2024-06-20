import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import EventIcon from '@mui/icons-material/Event';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ToggleButtonsGroup = ({ sortBy, handleSortChange }) => {
  const [formats, setFormats] = React.useState(() => ['bold', 'italic']);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <div className='toggle-buttons-group'>
      <span>Sort by:</span>
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="sort by"
        size="small"
        color="primary"
        exclusive
      >
        <ToggleButton 
          value="alphabetically" 
          aria-label="alphabetically" 
          onClick={() => handleSortChange('alphabetically')}
        >
          <Tooltip title="Sort Alphabetically">
            {sortBy === 'alphabetically' ? <SortByAlphaIcon /> : <SortByAlphaIcon className='descending' />}
          </Tooltip>
        </ToggleButton>

        <ToggleButton 
          value="byDate" 
          aria-label="byDate" 
          onClick={() => handleSortChange('byDate')}
        >
          <Tooltip title="Sort by Date">
            {sortBy === 'byDate' ? <EventIcon /> : <UnfoldMoreIcon />}
          </Tooltip>
        </ToggleButton>

        <ToggleButton 
          value="latestRelease" 
          aria-label="latestRelease" 
          onClick={() => handleSortChange('latestRelease')}
        >
          <Tooltip title="Latest Release">
            {sortBy === 'latestRelease' ? <NewReleasesIcon /> : <UnfoldMoreIcon />}
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default ToggleButtonsGroup;
