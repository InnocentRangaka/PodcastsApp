import React from 'react';
import GenreLabel from './GenreLabel';

const GenreList = ({ genres }) => {
  return (
    <div>
      {genres.map((genre, index) => (
        <GenreLabel key={index} genre={genre} />
      ))}
    </div>
  );
};

export default GenreList;
