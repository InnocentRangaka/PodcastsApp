// import { useState, useEffects } from 'react';
  
export const makeNewPodcastData = ({podcast}) => {

  const calculateTotalEpisodes = (seasons) => seasons.reduce((acc, season) => acc + season.episodes.length, 0);

  const newPodcastData = {
    ...podcast,
    totalSeasons: podcast?.seasons?.length || 0,
    totalEpisodes: podcast?.seasons && calculateTotalEpisodes(podcast.seasons) || 0,
  };

  return newPodcastData;
}

export const makeNewSeasonData = ({season}) => {
  const newSeasonData = {
    ...season,
    totalEpisodes: season?.episodes && season.episodes.length || 0,
  };

  return newSeasonData;
}

export async function fetchPodcasts() {
  
  const response = await fetch('https://podcast-api.netlify.app/');
  if (!response.ok) {
    throw {
      message: 'Data fetching failed',
      statusText: response.status,
      status: 'HTTP error!',
    };
  }
  const data = await response.json();
  return data;
}

export async function fetchPodcast({ id }) {
  const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
  if (!response.ok) {
    throw {
      message: 'Data fetching failed',
      statusText: response.status,
      status: 'HTTP error!',
    };
  }
  const podcast = await response.json();

  const newPodcastData = makeNewPodcastData({podcast});

  return newPodcastData;
}

export async function fetchPodcastByTitle({ title }) {
  const data = await fetchPodcasts();

  const podcastData = data && data.find(podcast => podcast.title.toLowerCase() === title.toLowerCase()),
  podcast = podcastData && fetchPodcast({ id: podcastData.id });

  return podcast;
}

export async function fetchSeason(podcastId, seasonId) {
  const data = await fetchPodcast({ id:podcastId });

  const seasonData = data?.seasons && data.seasons.find(season => season.season == seasonId);
  
  return makeNewSeasonData({season: seasonData});
}

