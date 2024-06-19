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

  const podcastData = data && data.filter(podcast => podcast.title.toLowerCase() === title.toLowerCase()),
  podcast = podcastData[0] && fetchPodcast({ id: podcastData[0].id });

  return podcast;
}

export async function fetchSeason(podcastId, seasonId) {
  const data = await fetchPodcast({ id:podcastId });
  // console.log(...data.seasons)

  const podcastData = data?.seasons && data.seasons[seasonId - 1].filter(season => season.season);
  console.log(podcastData)
  // podcast = podcastData[0] && fetchPodcast({ id: podcastData[0].id });

  // return podcast;
}


