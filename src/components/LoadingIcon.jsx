import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingIcon = ({ size = 40 }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <CircularProgress size={size} />
    </div>
  );
};

export default LoadingIcon;