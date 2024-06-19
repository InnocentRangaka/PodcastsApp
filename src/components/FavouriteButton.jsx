// src/FavoriteButton.jsx
import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FavouriteButton = ({ initialFavorite = false, onFavoriteChange }) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleToggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
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
