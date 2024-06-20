import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

const InfoButton = ({ tooltipText, onClick, color = "secondary", size = "medium", dataKey }) => {
    const handleClick = () => {
        if (typeof onToggleDescription === 'function') {
          onToggleDescription(dataKey); // Pass episodeKey to onToggleDescription
        }
        if (typeof onClick === 'function') {
          onClick(dataKey); // Pass episodeKey to onClick
        }
      };
  return (
    <Tooltip title={tooltipText || 'More Info'}>
      <IconButton className="infoButton" onClick={handleClick} color={color} size={size} >
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
      </IconButton>
    </Tooltip>
  );
};

export default InfoButton;