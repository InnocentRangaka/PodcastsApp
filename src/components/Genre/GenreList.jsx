import React from 'react';
import GenreLabel from './GenreLabel';

const GenreList = ({ genres }) => {
  const genresLength = genres?.length
  console.log(genresLength)
  return (
    <div className="genre-list">
      {genresLength > 0 && <span>{genresLength > 1 ? 'Genres:' : 'Genre:'}</span>}
      {genres.map((genre, index) => (
        <GenreLabel key={index} genre={genre} />
      ))}
    </div>
  );
};

export default GenreList;
