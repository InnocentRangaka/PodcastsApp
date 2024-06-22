import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchPodcastByTitle } from '../../api';
import ListPodcasts from '../components/Podcast/ListPodcasts';
import {decodeTextWithCharacter} from './textUtils'


const slicePodcasts = (object, from, to) => object.slice(from, to);
const podcastsNotEmpty = (object) => object || []; // Use empty array for default

const sortByTitle = (a, b) => {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();
  if (titleA < titleB) return -1;
  if (titleA > titleB) return 1;
  return 0;
};

const ensureIsArray = (object) => {
  let podcastArray = [];

  if (Array.isArray(object)) {
    podcastArray = object;
  } else if (typeof object === 'object' && object !== null) {
    podcastArray = Object.values(object);
  } else {
    console.error("Expected an array or object of podcasts, but received:", object);
    return podcastArray;
  }

  return podcastArray;
}

export const sortAlphabetically = (podcasts) => {
  return ensureIsArray(podcasts).sort((a, b) => a.title.localeCompare(b.title));
};

export const sortAlphabeticallyReversed = (podcasts) => {
  return ensureIsArray(podcasts).sort((a, b) => b.title.localeCompare(a.title));
};

export const sortByDate = (podcasts) => {
  return ensureIsArray(podcasts).sort((a, b) => new Date(a.updated) - new Date(b.updated));
};

export const sortByLatestRelease = (podcasts) => {
  return sortByDate(podcasts).reverse();
};

export const sortBySeasonsCount = (podcasts) => {
  return ensureIsArray(podcasts).sort((a, b) => a.seasons - b.seasons).reverse();
};

export const sortBySeasonsCountReversed = (podcasts) => {
  return ensureIsArray(podcasts).sort((a, b) => a.seasons - b.seasons);
};

export const handleSortChange = (sortBy, podcasts, setSortedPodcasts, setSortBy) => {
  podcasts = ensureIsArray(podcasts)

  let sortedShows = null;

  switch (sortBy) {
    case 'bySeasonsCount':
      sortedShows = sortBySeasonsCount(podcasts);
      setSortBy('bySeasonsCountReversed');
      break;
    case 'bySeasonsCountReversed':
      sortedShows = sortBySeasonsCountReversed(podcasts);
      setSortBy('bySeasonsCount');
      break;
    case 'alphabetically':
      sortedShows = sortAlphabetically(podcasts);
      setSortBy('reverseAlphabetically');
      break;
    case 'reverseAlphabetically':
      sortedShows = sortAlphabeticallyReversed(podcasts);
      setSortBy('alphabetically');
      break;
    case 'byDate':
      sortedShows = sortByDate(podcasts);
      setSortBy('latestRelease');
      break;
    case 'latestRelease':
      sortedShows = sortByLatestRelease(podcasts);
      setSortBy('newest');
      break;
    case 'newest':
      sortedShows = sortByLatestRelease(podcasts);
      setSortBy('latestRelease');
      break;
    default:
      sortedShows = sortAlphabetically(podcasts);
      setSortBy('reverseAlphabetically');
      break;
  }

  setSortedPodcasts(sortedShows);
  return sortedShows;
};



const getPodcastListByLimit = (allPodcasts, limit) => {
  const maxNumber = allPodcasts.length >= limit ? limit : allPodcasts.length;
  return slicePodcasts(allPodcasts, 0, maxNumber);
};

export const getPopularPodcasts = ({ podcasts }) => {
  const notEmptyObject = podcastsNotEmpty(podcasts);
  let popularPodcasts = [];
  if (notEmptyObject) {
    const sortBySeasons = (a, b) => a.seasons - b.seasons;
    notEmptyObject.sort(sortBySeasons).reverse();

    const top15Podcasts = getPodcastListByLimit(notEmptyObject, 15);

    popularPodcasts = ListPodcasts({ title: 'Popular', podcastsObject: top15Podcasts });
  }

  return popularPodcasts;
};

export const getNewPodcasts = ({ podcasts }) => {
  const notEmptyObject = podcastsNotEmpty(podcasts);
  let newPodcasts = [];
  if (notEmptyObject) {
    const sortedSeasons = sortByLatestRelease(notEmptyObject);

    const top15Podcasts = getPodcastListByLimit(sortedSeasons, 15);

    newPodcasts = ListPodcasts({ title: 'New', podcastsObject: top15Podcasts });
  }

  return newPodcasts;
};

export const getRecommendedPodcastsByDate = ({ podcasts }) => {
  const notEmptyObject = podcastsNotEmpty(podcasts);
  let newPodcasts = [];
  if (notEmptyObject) {
    const sortedSeasons = sortByLatestRelease(notEmptyObject);

    const top15Podcasts = slicePodcasts(sortedSeasons, 15, 30);

    newPodcasts = ListPodcasts({ title: 'Recommended', podcastsObject: top15Podcasts });
  }

  return newPodcasts;
};

export const getYear = (updated) => new Date(updated).getFullYear();

export const getTotalEpisodes = (seasons) => seasons.reduce((acc, season) => acc + season.episodes.length, 0);

export const showNameFromPath = (path) => {
  const startsWithShow = path.startsWith('/show/') ? path.replace('/show/', '') : path;
  return startsWithShow && decodeTextWithCharacter(startsWithShow, '_');
}

// Delete the following function
export const getEpisodeShow = async (path) => {

  try {
    
    const getName = showNameFromPath(path),
    splitedPath = getName.split("/"),
    title = splitedPath[0],
    seasonId = splitedPath[2],
    episodeId = splitedPath[4] 
    
    const data = await fetchPodcastByTitle({ title });

    if (data.length === 0) {
      throw {
        message: 'No available Podcasts yet',
        statusText: 'No Podcasts',
        status: 'Podcasts error!',
      };
    }

    const season = data?.seasons.find((seasons) => seasons.season == seasonId);
    const episode = season?.episodes.find((episodes) => episodes.episode == episodeId);

    return { 
      id: episode.id, 
      title: episode.title, 
      description: episode.description, 
      file: episode.file 
    };
  } catch (fetchError) {
    console.log(fetchError)
    // setError(fetchError);
  }
}