import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FavouriteButton = ({ initialFavorite = false, onFavoriteChange, episodeId }) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  useEffect(() => {
    // Load initial favorite status from localStorage if available
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(storedFavorites.includes(episodeId));
  }, [episodeId]);

  const handleToggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    // Update localStorage
    let storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (newFavoriteStatus) {
      // Add episodeId to favorites
      storedFavorites = [...storedFavorites, episodeId];
    } else {
      // Remove episodeId from favorites
      storedFavorites = storedFavorites.filter(id => id !== episodeId);
    }
    localStorage.setItem('favorites', JSON.stringify(storedFavorites));

    if (onFavoriteChange) {
      onFavoriteChange(newFavoriteStatus);
    }
  };

  return (
    <Tooltip title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
      <IconButton onClick={handleToggleFavorite} color="secondary">
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default FavouriteButton;
