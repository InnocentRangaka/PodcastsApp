import React from 'react';
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';

const GenreLabel = ({ genre }) => {
  return (
    <Link to={`/genre/${genre.toLowerCase()}`} style={{ textDecoration: 'none' }}>
      <Chip
        label={genre}
        variant="outlined"
        color="primary"
        className='genre-label'
      />
    </Link>
  );
};

GenreLabel.propTypes = {
  genre: PropTypes.string.isRequired,
};

export default GenreLabel;
