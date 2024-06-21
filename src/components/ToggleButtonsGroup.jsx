import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import EventIcon from '@mui/icons-material/Event';
import DateRangeIcon from '@mui/icons-material/DateRange';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ToggleButtonsGroup = ({ sortBy, handleSortChange, podcastsObject, setSortedPodcasts, setSortBy }) => {
  const [sortByBtn, setSortByBtn] = useState('alphabetically'); // Initial state, default to 'alphabetically'

  const handleClick = (event, newSortBy) => {
    let sortedShows;

    switch (sortBy) {
      case 'bySeasonsCount':
        sortedShows = 'bySeasonsCountReversed';
        break;
      case 'bySeasonsCountReversed':
        sortedShows = 'bySeasonsCount';
        break;
      case 'alphabetically':
        sortedShows = 'reverseAlphabetically';
        break;
      case 'reverseAlphabetically':
        sortedShows = 'alphabetically';
        break;
      case 'byDate':
        sortedShows = 'latestRelease';
        break;
      case 'latestRelease':
        sortedShows = 'newest';
        break;
      case 'newest':
        sortedShows = 'latestRelease';
        break;
      default:
        // sortedShows = 'reverseAlphabetically'
        break;
    }

    let elements;

    switch (true) {
      case event.target.nodeName.toLowerCase() =="button":
        elements = event.target;
        break;
      case event.target.parentElement.nodeName.toLowerCase() =="button":
        elements = event.target.parentElement;
        break;
      case event.target.parentElement.parentElement.nodeName.toLowerCase() =="button":
        elements = event.target.parentElement.parentElement;
      break;
      default:
        elements = Object?.values(document.querySelectorAll(`button`))?.find(button => button.value.toLowerCase() == sortByBtn);
        break;
    }

    if(elements) {
      elements.setAttribute("value", sortedShows);
      elements.setAttribute("aria-label",sortedShows);
    }

    setSortByBtn(newSortBy);
    handleSortChange(newSortBy, podcastsObject, setSortedPodcasts, setSortBy);
    
  };

  return (
    <div className='toggle-buttons-group'>
      <span>Sort by:</span>
      <ToggleButtonGroup
        key="sortingToggleBtnGroup"
        value={sortBy} // Use sortBy state directly from props
        exclusive
        aria-label="sort by"
        size="small"
        color="primary"
      >
        <ToggleButton
          key="alphabeticallyBtn"
          value="alphabetically"
          aria-label="alphabetically"
          onChange={(event) => handleClick(event, 'alphabetically')}
        >
          <Tooltip title="Sort Alphabetically">
            {sortBy === 'alphabetically' ? <SortByAlphaIcon /> : <SortByAlphaIcon className='descending' />}
          </Tooltip>
        </ToggleButton>

        <ToggleButton
          key="bySeasonsCountBtn"
          value="bySeasonsCount"
          aria-label="bySeasonsCount"
          onChange={(event) => handleClick(event, 'bySeasonsCount')}
        >
          <Tooltip title="Sort by Seasons">
            {sortBy === 'bySeasonsCount' ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
          </Tooltip>
        </ToggleButton>

        <ToggleButton
          key="latestReleaseBtn"
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
