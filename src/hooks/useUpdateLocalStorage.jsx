import { useEffect } from 'react';

const useUpdateLocalStorage = ({ storageItemType, type, podcastId, seasonId, episodeId, data }) => {
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };

  const updateLocalStorage = (newData = null) => {
    const storeData = JSON.parse(localStorage.getItem(storageItemType)) || {};
    const gotData = newData || data

    switch (type) {
      case 'episode':
        // Update episode
        const updatedEpisodeData = {
          ...storeData,
          [podcastId]: {
            ...storeData[podcastId],
            seasons: {
              ...storeData[podcastId]?.seasons,
              [seasonId]: {
                ...storeData[podcastId]?.seasons?.[seasonId],
                episodes: {
                  ...storeData[podcastId]?.seasons?.[seasonId]?.episodes,
                  [episodeId]: {
                    ...gotData,
                    lastUpdated: getCurrentDateTime()
                  }
                }
              }
            }
          }
        };
        localStorage.setItem(storageItemType, JSON.stringify(updatedEpisodeData));
        break;

      case 'season':
        // Update season and propagate to show
        const updatedSeasonData = {
          ...storeData,
          [podcastId]: {
            ...storeData[podcastId],
            favorite: gotData.favorite, // Update show favorite status
            seasons: {
              ...storeData[podcastId]?.seasons,
              [seasonId]: {
                ...storeData[podcastId]?.seasons?.[seasonId],
                ...gotData,
                lastUpdated: getCurrentDateTime()
              }
            }
          }
        };
        localStorage.setItem(storageItemType, JSON.stringify(updatedSeasonData));
        break;

      case 'show':
        // Update show and propagate to all seasons and episodes
        const updatedShowData = {
          ...storeData,
          [podcastId]: {
            ...storeData[podcastId],
            favorite: gotData.favorite, // Update show favorite status
            seasons: Object.keys(storeData[podcastId]?.seasons || {}).reduce((acc, sId) => {
              acc[sId] = {
                ...storeData[podcastId]?.seasons?.[sId],
                favorite: gotData.favorite, // Update all seasons favorite status
                episodes: Object.keys(storeData[podcastId]?.seasons?.[sId]?.episodes || {}).reduce((epAcc, eId) => {
                  epAcc[eId] = {
                    ...storeData[podcastId]?.seasons?.[sId]?.episodes?.[eId],
                    favorite: gotData.favorite, // Update all episodes favorite status
                    lastUpdated: getCurrentDateTime()
                  };
                  return epAcc;
                }, {})
              };
              return acc;
            }, {})
          }
        };
        localStorage.setItem(storageItemType, JSON.stringify(updatedShowData));
        break;

      default:
        console.warn(`Unknown type: ${type}`);
        break;
    }
  };
  
  return { updateLocalStorage };
};

export default useUpdateLocalStorage;
