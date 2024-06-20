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

        <ToggleButton value="bold" aria-label="bold">
          <Tooltip title="Sort Alphabetically">
            <IconButton onClick={() => handleSortChange('alphabetically')}>
              {sortBy === 'alphabetically' ? <SortByAlphaIcon /> : <SortByAlphaIcon className='descending' />}
            </IconButton>
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="italic" aria-label="italic">
          <Tooltip title="Sort by Date">
            <IconButton onClick={() => handleSortChange('byDate')}>
              {sortBy === 'byDate' ? <EventIcon /> : <UnfoldMoreIcon />}
            </IconButton>
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="underlined" aria-label="underlined">
        <Tooltip title="Latest Release">
            <IconButton onClick={() => handleSortChange('latestRelease')}>
              {sortBy === 'latestRelease' ? <NewReleasesIcon /> : <UnfoldMoreIcon />}
            </IconButton>
          </Tooltip>
        </ToggleButton>
        
      </ToggleButtonGroup>
    </div>
  );
  };
  
  export default ToggleButtonsGroup;
