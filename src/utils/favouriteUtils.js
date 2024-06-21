export const getTotalCounts = () => {
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
  
  let totalFavorites = 0;
  let totalShows = 0;
  let totalSeasons = 0;
  let totalEpisodes = 0;

  // Count favorites and iterate through shows
  Object.keys(storedFavorites).forEach(podcastId => {
    const podcast = storedFavorites[podcastId];
    if (podcast.favorite) totalFavorites++;

    totalShows++;

    // Count seasons and iterate through seasons
    Object.keys(podcast.seasons || {}).forEach(seasonId => {
      const season = podcast.seasons[seasonId];
      totalSeasons++;

      // Count episodes
      totalEpisodes += Object.keys(season.episodes || {}).length;
    });
  });

  return {
    totalFavorites,
    totalShows,
    totalSeasons,
    totalEpisodes
  };
};

export const getTotalCountsByShowId = (showId = null) => {
  if(showId == null || undefined) {return;}

  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};

  if (!storedFavorites[showId]) {
    return {
      totalFavorites: 0,
      totalSeasons: 0,
      totalEpisodes: 0
    };
  }

  const podcast = storedFavorites[showId];
  let totalFavorites = podcast.favorite ? 1 : 0;
  let totalSeasons = Object.keys(podcast.seasons || {}).length;
  let totalEpisodes = 0;

  // Count episodes for each season
  Object.keys(podcast.seasons || {}).forEach(seasonId => {
    const season = podcast.seasons[seasonId];
    totalEpisodes += Object.keys(season.episodes || {}).length;
  });

  return {
    totalFavorites,
    totalSeasons,
    totalEpisodes
  };
};

export const getTotalCountsByShowIdAndSeasonId = (showId, seasonId) => {
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};

  if (!storedFavorites[showId]) {
    return {
      totalFavorites: 0,
      totalEpisodes: 0
    };
  }

  const podcast = storedFavorites[showId];
  let totalFavorites = podcast.favorite ? 1 : 0;
  let totalEpisodes = 0;

  // Check if the seasonId exists and count episodes
  if (podcast.seasons && podcast.seasons[seasonId]) {
    const season = podcast.seasons[seasonId];
    totalEpisodes = Object.keys(season.episodes || {}).length;
  }

  return {
    totalFavorites,
    totalEpisodes
  };
};

// Example usage:
// const showId = '1865'; // Replace with the actual show ID you want to query
// const seasonId = '1'; // Replace with the actual season ID you want to query
// const { totalFavorites, totalEpisodes } = getTotalCountsByShowIdAndSeasonId(showId, seasonId);
// console.log('Total Number of Favorites for Show', showId, ':', totalFavorites);
// console.log('Total Number of Episodes for Season', seasonId, 'in Show', showId, ':', totalEpisodes);



