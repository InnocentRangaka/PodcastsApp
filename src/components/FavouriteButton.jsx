import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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

  const updateLocalStorage = (newData) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    
    if (type === 'episode') {
      // Update episode
      const updatedData = {
        ...storedFavorites,
        [podcastId]: {
          ...storedFavorites[podcastId],
          seasons: {
            ...storedFavorites[podcastId]?.seasons,
            [seasonId]: {
              ...storedFavorites[podcastId]?.seasons?.[seasonId],
              episodes: {
                ...storedFavorites[podcastId]?.seasons?.[seasonId]?.episodes,
                [episodeId]: {
                  ...newData,
                  lastUpdated: getCurrentDateTime()
                }
              }
            }
          }
        }
      };
      localStorage.setItem('favorites', JSON.stringify(updatedData));
    } else if (type === 'season') {
      // Update season and propagate to show
      const updatedData = {
        ...storedFavorites,
        [podcastId]: {
          ...storedFavorites[podcastId],
          favorite: newData.favorite, // Update show favorite status
          seasons: {
            ...storedFavorites[podcastId]?.seasons,
            [seasonId]: {
              ...storedFavorites[podcastId]?.seasons?.[seasonId],
              ...newData,
              lastUpdated: getCurrentDateTime()
            }
          }
        }
      };
      localStorage.setItem('favorites', JSON.stringify(updatedData));
    } else if (type === 'show') {
      // Update show and propagate to all seasons and episodes
      const updatedData = {
        ...storedFavorites,
        [podcastId]: {
          ...storedFavorites[podcastId],
          favorite: newData.favorite, // Update show favorite status
          seasons: Object.keys(storedFavorites[podcastId]?.seasons || {}).reduce((acc, sId) => {
            acc[sId] = {
              ...storedFavorites[podcastId]?.seasons?.[sId],
              favorite: newData.favorite, // Update all seasons favorite status
              episodes: Object.keys(storedFavorites[podcastId]?.seasons?.[sId]?.episodes || {}).reduce((epAcc, eId) => {
                epAcc[eId] = {
                  ...storedFavorites[podcastId]?.seasons?.[sId]?.episodes?.[eId],
                  favorite: newData.favorite, // Update all episodes favorite status
                  lastUpdated: getCurrentDateTime()
                };
                return epAcc;
              }, {})
            };
            return acc;
          }, {})
        }
      };
      localStorage.setItem('favorites', JSON.stringify(updatedData));
    }
  };

  const handleToggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    const newData = {
      favorite: newFavoriteStatus,
      addedAt: getCurrentDateTime()
    };

    updateLocalStorage(newData);

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
