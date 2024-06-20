import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';

const GenreLabel = ({ genre }) => {
  return (
    <Chip
      label={genre}
      variant="outlined"
      color="primary"
      style={{ margin: '5px' }}
    />
  );
};

GenreLabel.propTypes = {
  genre: PropTypes.string.isRequired,
};

export default GenreLabel;
