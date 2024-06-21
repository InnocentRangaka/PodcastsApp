import React from 'react';
import GenreLabel from './GenreLabel';

const GenreList = ({ genres }) => {
  console.log(genres)
  return (
    <div className="genre-list">
      {genres.map((genre, index) => (
        <GenreLabel key={index} genre={genre} />
      ))}
    </div>
  );
};

export default GenreList;
