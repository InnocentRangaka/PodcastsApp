import React from 'react';
import { Grid, Typography } from '@mui/material';

const SearchResultsLayout = ({ searchResults }) => {
  return (
    <Grid container spacing={2} style={{ marginTop: '20px' }}>
      {searchResults.map(podcast => (
        <Grid item xs={12} key={podcast.id}>
          <Typography variant="h5">{podcast.title}</Typography>
          <Typography variant="body1">ID: {podcast.id}</Typography>
          <Typography variant="body2">Genre: {podcast.genre}</Typography>
          {/* Add more details as needed */}
        </Grid>
      ))}
    </Grid>
  );
};

export default SearchResultsLayout;
