import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useUpdateLocalStorage from '../../hooks/useUpdateLocalStorage'
const FavouriteButton = ({
  initialFavorite = false,
  onFavoriteChange,
  type = null,
  podcastId = null,
  seasonId = null,
  episodeId = null
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  useEffect(() => {
    // Load initial favorite status from localStorage if available
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    const episodeData = storedFavorites[podcastId]?.seasons[seasonId]?.episodes[episodeId];

    if (type === 'show') {
      setIsFavorite(storedFavorites[podcastId]?.favorite || false);
    } else if (type === 'season') {
      setIsFavorite(storedFavorites[podcastId]?.seasons[seasonId]?.favorite || false);
    } else if (type === 'episode') {
      setIsFavorite(episodeData?.favorite || false);
    }
  }, [type, podcastId, seasonId, episodeId]);

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };
  
  const handleToggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    const newData = {
      favorite: newFavoriteStatus,
      addedAt: getCurrentDateTime()
    };

    useUpdateLocalStorage({ storageItemType: 'favorites', type, podcastId, seasonId, episodeId, data: newData })

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
