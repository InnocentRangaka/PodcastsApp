import { React, useState } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchPodcasts, fetchPodcast } from '../../api';
import ListPodcasts from '../components/ListPodcasts';
import {decodeTextWithCharacter} from './textUtils'

const [podcastsData, setPodcastsData] = useState([]);

const slicePodcasts = (object, from, to) => object.slice(from, to);
const podcastsNotEmpty = (object) => object || []; // Use empty array for default

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
    const sortBySeasons = (a, b) => new Date(a.updated) - new Date(b.updated);
    notEmptyObject.sort(sortBySeasons).reverse();

    const top15Podcasts = getPodcastListByLimit(notEmptyObject, 15);

    newPodcasts = ListPodcasts({ title: 'New', podcastsObject: top15Podcasts });
  }

  return newPodcasts;
};

export const getRecommendedPodcastsByDate = ({ podcasts }) => {
  const notEmptyObject = podcastsNotEmpty(podcasts);
  let newPodcasts = [];
  if (notEmptyObject) {
    const sortBySeasons = (a, b) => new Date(a.updated) - new Date(b.updated);
    notEmptyObject.sort(sortBySeasons).reverse();

    const top15Podcasts = slicePodcasts(notEmptyObject, 15, 30);

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

const getPosts = async () => {
  try {
    const data = await fetchPodcasts();

    if (data.length === 0) {
      throw {
        message: 'No available Podcasts yet',
        statusText: 'No Podcasts',
        status: 'Podcasts error!',
      };
    }

    setPodcastsData(data);
  } catch (fetchError) {
    // setError(fetchError);
  }
};


export const getCurrentShow = (path) => {
  const title = showNameFromPath(path) 
  getPosts()

  let podcast = podcastsData && podcastsData.filter(podcast => podcast.title.toLowerCase() === title.toLowerCase())

  if(!podcast){
    const localShowId = localStorage.getItem('previewShow') || undefined
    podcast = localShowId && podcastsData && podcastsData.filter(podcast => parseInt(podcast.id) === parseInt(localShowId))
  }

  return podcast?.id && {
    id: podcast.id,
    title: podcast.title
  }
}